import { useState } from "react";
import { motion } from "framer-motion";
import { EASE } from "@/lib/motion";

const MOTION_TAGS = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  section: motion.section,
};
const FROM = {
  up: { y: 34 },
  down: { y: -34 },
  left: { x: -56 },
  right: { x: 56 },
  scale: { scale: 0.92, y: 18 },
  fade: {},
};

/** Scroll-reveal wrapper. `from` picks the entrance direction; cards also lift on hover. */
export default function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  from = "up",
  lift,
  children,
  ...rest
}) {
  const M = MOTION_TAGS[Tag] || motion.div;
  const [settled, setSettled] = useState(false);
  const isCard = /(^|\s)card(\s|$)/.test(className);
  const liftY =
    lift ?? (className.includes("proj-card") ? -8 : isCard ? -5 : 0);
  return (
    <M
      className={className}
      initial={{ opacity: 0, ...FROM[from] }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.8,
          ease: EASE,
          delay: settled ? 0 : delay / 1000,
        },
      }}
      viewport={{ once: true, amount: 0.12, margin: "0px 0px -6% 0px" }}
      whileHover={
        liftY
          ? {
              y: liftY,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }
          : undefined
      }
      whileTap={
        liftY
          ? {
              y: liftY,
              transition: { type: "spring", stiffness: 320, damping: 22 },
            }
          : undefined
      }
      onAnimationComplete={() => setSettled(true)}
      {...rest}
    >
      {children}
    </M>
  );
}
