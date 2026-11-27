import { useState } from "react";
import { flushSync } from "react-dom";

const THEME_KEY = "sakib-theme";
/* Day/night switch: night grows out of the button, day shrinks back into it (CSS in index.css) */
const SWITCH_MS = 1300;
const SWITCH_EASE = "cubic-bezier(.5,.05,.25,1)";

/** Day mode on every fresh visit. Dark only after the visitor switches it on (kept for this tab session). */
export function useTheme() {
  const [dark, setDark] = useState(() =>
    document.documentElement.classList.contains("dark"),
  );

  const apply = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
    document
      .getElementById("theme-color")
      ?.setAttribute("content", isDark ? "#0a0c14" : "#ffffff");
    setDark(isDark);
  };

  const toggle = (e) => {
    const next = !dark;
    try {
      sessionStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* ignore */
    }

    const root = document.documentElement;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const run = () => flushSync(() => apply(next));

    if (!reduce && typeof document.startViewTransition === "function") {
      // circular reveal growing from the toggle button
      const r = e?.currentTarget?.getBoundingClientRect();
      const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
      const y = r ? r.top + r.height / 2 : 0;
      const radius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y),
      );
      const st = root.style;
      st.setProperty("--vt-x", `${x}px`);
      st.setProperty("--vt-y", `${y}px`);
      st.setProperty("--vt-reach", `${radius}px`);
      st.setProperty("--vt-ms", `${SWITCH_MS}ms`);
      st.setProperty("--vt-ease", SWITCH_EASE);
      root.dataset.themeSwitch = next ? "to-dark" : "to-light";
      root.classList.add("theme-anim");
      const t = document.startViewTransition(run);
      // both directions are pure CSS animations (index.css): nothing is left on <html> afterwards, so a later switch never inherits a stale one
      t.ready.catch((err) =>
        console.warn("[theme] view transition skipped:", err),
      );
      t.finished.finally(() => {
        root.classList.remove("theme-anim");
        delete root.dataset.themeSwitch;
        ["--vt-x", "--vt-y", "--vt-reach", "--vt-ms", "--vt-ease"].forEach(
          (k) => st.removeProperty(k),
        );
      });
    } else if (!reduce) {
      // fallback: soft cross-fade
      root.classList.add("theme-fade");
      run();
      setTimeout(() => root.classList.remove("theme-fade"), 1100);
    } else {
      run();
    }
  };
  return [dark, toggle];
}
