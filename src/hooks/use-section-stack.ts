import { useEffect, useState, type RefObject } from "react";

const DURATION = 850;
const TOUCH_DURATION = 560;
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
    const duration = window.matchMedia("(pointer: coarse)").matches ? TOUCH_DURATION : DURATION;
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
    let queuedTouchDirection: 1 | -1 | 0 = 0;
    let touchStart: { id: number; x: number; y: number; time: number } | null = null;
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
        const t = Math.min(1, (now - t0) / duration);
        container.scrollTop = from + (to - from) * ease(t);
        if (t < 1) anim = requestAnimationFrame(step);
        else {
          busy = false;
          if (queuedTouchDirection) {
            const direction = queuedTouchDirection;
            queuedTouchDirection = 0;
            go(direction);
          }
        }
      };
      anim = requestAnimationFrame(step);
    };
    const go = (dir: 1 | -1, queueIfBusy = false) => {
      if (busy) {
        if (queueIfBusy && !queuedTouchDirection) queuedTouchDirection = dir;
        return;
      }
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

    const onTouchStart = (e: TouchEvent) => {
      if (
        e.touches.length !== 1 ||
        (e.target instanceof Element && e.target.closest("#mobile-navigation"))
      ) {
        touchStart = null;
        return;
      }
      const touch = e.touches[0];
      if (!touch) return;
      touchStart = {
        id: touch.identifier,
        x: touch.clientX,
        y: touch.clientY,
        time: performance.now(),
      };
    };
    const onTouchMove = (e: TouchEvent) => {
      if (reduced || !touchStart) return;
      const touch = Array.from(e.touches).find((item) => item.identifier === touchStart?.id);
      if (!touch) return;
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      if (Math.abs(dy) >= Math.abs(dx)) e.preventDefault();
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!touchStart) return;
      const start = touchStart;
      touchStart = null;
      if (reduced) return;
      const touch = Array.from(e.changedTouches).find((item) => item.identifier === start.id);
      if (!touch) return;
      const dx = touch.clientX - start.x;
      const dy = start.y - touch.clientY;
      const distance = Math.abs(dy);
      const elapsed = performance.now() - start.time;
      const quickFlick = distance >= 18 && elapsed <= 220 && distance / elapsed >= 0.45;
      if ((distance >= 36 || quickFlick) && distance > Math.abs(dx) * 1.15) {
        go(dy > 0 ? 1 : -1, true);
      }
    };
    const onTouchCancel = () => {
      touchStart = null;
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
    container.addEventListener("touchcancel", onTouchCancel);
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
      container.removeEventListener("touchcancel", onTouchCancel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", navigate);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(anim);
      sections.forEach((s) => { s.style.removeProperty("--stack-top"); s.style.removeProperty("--cover"); });
    };
  }, [scroller]);

  return active;
}
