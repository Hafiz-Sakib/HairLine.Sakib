import { useEffect } from "react";

/**
 * Touch screens have no hover. On touch / pen press, tag the pressed element and its
 * hoverable ancestors with `.is-hover` (CSS + Tailwind `hover:` / `group-hover:` treat it
 * like :hover). It stays a moment after release so the animation can finish, and is
 * dropped straight away if the gesture turns into a scroll.
 */
export function useTouchHover() {
  useEffect(() => {
    const SEL = ".card, .tag, .btn, .soc, .group, a, button, [data-hover]";
    let held = [];
    let timer = 0;
    const clear = () => {
      clearTimeout(timer);
      held.forEach((n) => n.classList.remove("is-hover"));
      held = [];
    };
    const down = (e) => {
      if (e.pointerType === "mouse") return;
      clear();
      for (let n = e.target; n && n !== document.body; n = n.parentElement) {
        if (n.matches?.(SEL)) {
          n.classList.add("is-hover");
          held.push(n);
        }
      }
    };
    const up = (e) => {
      if (e.pointerType === "mouse") return;
      clearTimeout(timer);
      timer = setTimeout(clear, 900);
    };
    const cancel = () => clear();
    document.addEventListener("pointerdown", down, { passive: true });
    document.addEventListener("pointerup", up, { passive: true });
    document.addEventListener("pointercancel", cancel, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", cancel);
      clear();
    };
  }, []);
}
