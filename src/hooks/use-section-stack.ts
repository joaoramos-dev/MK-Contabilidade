import { useEffect, type RefObject } from "react";

/** Keep long panels readable before the next panel covers them. */
export function useSectionStack(scroller: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const container = scroller.current;
    if (!container) return;

    const sections = Array.from(
      container.querySelectorAll<HTMLElement>(".snap-section"),
    );
    const update = () => {
      for (const section of sections) {
        const top = Math.min(0, container.clientHeight - section.offsetHeight);
        section.style.setProperty("--stack-top", `${top}px`);
      }
    };
    const observer = new ResizeObserver(update);
    observer.observe(container);
    sections.forEach((section) => observer.observe(section));
    update();

    // Sticky positions aren't the panels' original anchor positions. Use their
    // natural flow heights so navigation also works when returning upward.
    const navigate = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const anchor = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const id = anchor?.getAttribute("href")?.slice(1);
      if (!id) return;
      const target = sections.find((section) => section.id === id);
      if (!target) return;
      event.preventDefault();
      let top = 0;
      for (const section of sections) {
        if (section === target) break;
        top += section.offsetHeight;
      }
      container.scrollTo({
        top,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
      window.history.replaceState(null, "", `#${id}`);
    };
    container.addEventListener("click", navigate);

    return () => {
      observer.disconnect();
      container.removeEventListener("click", navigate);
      sections.forEach((section) => section.style.removeProperty("--stack-top"));
    };
  }, [scroller]);
}