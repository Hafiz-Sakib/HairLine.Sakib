import { useEffect, useState } from "react";
import { NAV } from "@/data/site";

export function useActiveSection() {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach(
          (e) => e.isIntersecting && setActive(`#${e.target.id}`),
        ),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach(([, h]) => {
      const el = document.querySelector(h);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}
