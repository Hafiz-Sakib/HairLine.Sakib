import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { EASE } from "@/lib/motion";

/** Counts up to a number like "550+" the first time it scrolls into view. */
export default function CountUp({ value }) {
  const m = /^(\d+)(.*)$/.exec(value);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const target = m ? Number(m[1]) : 0;
  const [n, setN] = useState(reduce ? target : 0);
  useEffect(() => {
    if (!inView || !m || reduce) return;
    const c = animate(0, target, {
      duration: 1.8,
      ease: EASE,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => c.stop();
  }, [inView]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <span ref={ref}>{value}</span>;
  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {m[2]}
    </span>
  );
}
