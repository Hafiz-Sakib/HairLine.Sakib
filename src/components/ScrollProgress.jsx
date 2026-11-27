import { motion, useScroll, useSpring } from "framer-motion";

/** Thin gradient bar across the top that fills as you scroll. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28,
    mass: 0.3,
  });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed top-0 inset-x-0 z-[130] h-[3px] origin-left bg-gradient-to-r from-primary via-link to-[color:var(--name-c)]"
    />
  );
}
