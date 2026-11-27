import { useEffect, useState } from "react";

/** card width follows the screen: 300 on phones up to 460 on desktop */
export function useCardWidth() {
  const calc = () => {
    const w = typeof window === "undefined" ? 1280 : window.innerWidth;
    return w < 480
      ? Math.min(300, Math.round(w * 0.74))
      : w < 768
        ? 360
        : w < 1100
          ? 420
          : 480;
  };
  const [cw, setCw] = useState(calc);
  useEffect(() => {
    const on = () => setCw(calc());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return cw;
}
