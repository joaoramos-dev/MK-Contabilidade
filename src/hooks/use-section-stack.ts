import { useEffect, useState, type RefObject } from "react";

const DURATION = 850;
// Approximates cubic-bezier(0.16, 1, 0.3, 1) (Apple-style decelerate).
const ease = (t: number) => 1 - Math.pow(1 - t, 4);

/**
 * Sticky section geometry + discrete paging: one wheel/swipe/key step moves
 * exactly one screen (up or down), locked until the eased transition ends.
 */
export function useSectionStack(scroller: RefObject<HTMLDivElement | null>) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const container = scroller.current;
    if (!container) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sections = Array.from(container.querySelectorAll<HTMLElement>(".snap-section"));

    // Natural (flow) top of each section, plus intermediate stops for tall panels.
    let starts: number[] = [];
    let stops: { top: number; index: number }[] = [];
    const update = () => {
      const vh = container.clientHeight;
      starts = [];
      stops = [];
      let acc = 0;
      sections.forEach((section, index) => {
        const h = section.offsetHeight;
        section.style.setProperty("--stack-top", `${Math.min(0, vh - h)}px`);
        starts.push(acc);
        stops.push({ top: acc, index });
        for (let y = acc + vh * 0.85; y < acc + h - vh; y += vh * 0.85) stops.push({ top: y, index });
        if (h > vh + 1) stops.push({ top: acc + h - vh, index });
        acc += h;
      });
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    sections.forEach((s) => observer.observe(s));
    update();

    let frame = 0;
    const paint = () => {
      frame = 0;
      const h = container.clientHeight;
      const base = container.getBoundingClientRect().top;
      sections.forEach((section, i) => {
        const next = sections[i + 1];
        const cover = next
          ? Math.min(1, Math.max(0, (h - (next.getBoundingClientRect().top - base)) / h))
          : 0;
        section.style.setProperty("--cover", cover.toFixed(3));
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(paint); };
    container.addEventListener("scroll", onScroll, { passive: true });
    paint();

    // --- Discrete paging ---
    let busy = false;
    let anim = 0;
    const current = () => {
      const y = container.scrollTop;
      let best = 0;
      stops.forEach((s, i) => { if (Math.abs(s.top - y) < Math.abs(stops[best]!.top - y)) best = i; });
      return best;
    };
    const animateTo = (top: number, index: number) => {
      const max = container.scrollHeight - container.clientHeight;
      const to = Math.max(0, Math.min(max, top));
      setActive(index);
      if (reduced) { container.scrollTop = to; return; }
      const from = container.scrollTop;
      if (Math.abs(to - from) < 1) return;
      busy = true;
      cancelAnimationFrame(anim);
      const t0 = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - t0) / DURATION);
        container.scrollTop = from + (to - from) * ease(t);
        if (t < 1) anim = requestAnimationFrame(step);
        else busy = false;
      };
      anim = requestAnimationFrame(step);
    };
    const go = (dir: 1 | -1) => {
      if (busy) return;
      const i = Math.max(0, Math.min(stops.length - 1, current() + dir));
      animateTo(stops[i]!.top, stops[i]!.index);
    };

    let lastWheel = 0;
    const onWheel = (e: WheelEvent) => {
      if (reduced || e.ctrlKey) return;
      e.preventDefault();
      const now = performance.now();
      const gap = now - lastWheel;
      lastWheel = now;
      // One gesture (incl. trackpad inertia) = one page; new gesture needs a pause.
      if (busy || gap < 180 || Math.abs(e.deltaY) < 4) return;
      go(e.deltaY > 0 ? 1 : -1);
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => { touchY = e.touches[0]?.clientY ?? null; };
    const onTouchMove = (e: TouchEvent) => { if (!reduced) e.preventDefault(); };
    const onTouchEnd = (e: TouchEvent) => {
      if (reduced || touchY === null) return;
      const dy = touchY - (e.changedTouches[0]?.clientY ?? touchY);
      touchY = null;
      if (Math.abs(dy) > 40) go(dy > 0 ? 1 : -1);
    };

    const onKey = (e: KeyboardEvent) => {
      if (reduced || e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const down = ["ArrowDown", "PageDown", " "].includes(e.key);
      const up = ["ArrowUp", "PageUp"].includes(e.key);
      if (!down && !up) return;
      e.preventDefault();
      go(down ? 1 : -1);
    };

    // Anchor links (header, dots, CTAs) use the same eased transition.
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1);
      if (!id) return;
      const index = sections.findIndex((s) => s.id === id);
      if (index < 0) return;
      event.preventDefault();
      busy = false;
      animateTo(starts[index] ?? 0, index);
    };

    const syncActive = () => { if (!busy && stops.length) setActive(stops[current()]!.index); };
    container.addEventListener("scroll", syncActive, { passive: true });
    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd);
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", navigate);

    return () => {
      observer.disconnect();
      container.removeEventListener("scroll", onScroll);
      container.removeEventListener("scroll", syncActive);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", navigate);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anim);
      sections.forEach((s) => { s.style.removeProperty("--stack-top"); s.style.removeProperty("--cover"); });
    };
  }, [scroller]);

  return active;
}
