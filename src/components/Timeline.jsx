import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";

export default function Timeline({ items, Icon }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });
  return (
    <div ref={ref} className="relative ml-3">
      <span
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-px bg-line"
      />
      <motion.span
        aria-hidden="true"
        style={{ scaleY }}
        className="absolute -left-px top-0 bottom-0 w-[3px] origin-top rounded-full bg-gradient-to-b from-primary to-link"
      />
      <ol className="space-y-8">
        {items.map(({ when, role, title, org, text }, i) => (
          <Reveal
            as="li"
            from="right"
            key={role || title}
            delay={i * 80}
            className="pl-8 relative"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, amount: 1 }}
              transition={{
                type: "spring",
                stiffness: 420,
                damping: 16,
                delay: 0.15 + i * 0.08,
              }}
              className="absolute -left-[13px] top-0.5 grid place-items-center w-[26px] h-[26px] rounded-full bg-sky-light text-sky-dark ring-4 ring-surface"
            >
              <Icon size={14} />
            </motion.span>
            <p className="text-sm text-ink-muted">{when}</p>
            <h3 className="text-xl mt-0.5">{role || title}</h3>
            <p className="text-base text-link font-medium">{org}</p>
            {text && (
              <p className="mt-2 text-base text-ink-muted leading-relaxed">
                {text}
              </p>
            )}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
