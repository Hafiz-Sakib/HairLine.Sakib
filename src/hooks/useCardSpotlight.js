import { useEffect } from "react";

/** Cards get a soft light that follows the pointer / finger (CSS reads --mx / --my). */
export function useCardSpotlight() {
  useEffect(() => {
    const on = (e) => {
      const c = e.target.closest?.(".card, .glow");
      if (!c) return;
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    document.addEventListener("pointermove", on, { passive: true });
    document.addEventListener("pointerdown", on, { passive: true });
    return () => {
      document.removeEventListener("pointermove", on);
      document.removeEventListener("pointerdown", on);
    };
  }, []);
}
