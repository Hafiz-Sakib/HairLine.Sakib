import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Laptop } from "@lucasmarkes/hairline/react";
import { ArrowRight, Download } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import { LINKS } from "@/data/site";
import { EASE } from "@/lib/motion";
import { goTo } from "@/lib/routing";

const ROLES = [
  "Full-Stack Developer",
  "Competitive Programmer",
  "NLP Researcher",
  "ML Practitioner",
];

const HEADING = [
  "Hi,",
  "I'm",
  "Sakib.",
  "I",
  "build",
  "web",
  "apps",
  "that",
  "teach,",
  "track",
  "&",
  "ship.",
];

function AnimatedHeading() {
  return (
    <h1
      aria-label="Hi, I'm Sakib. I build web apps that teach, track & ship."
      className="mt-6 text-[44px] sm:text-6xl lg:text-[72px] leading-[1.08]"
    >
      {HEADING.map((w, i) => {
        const isName = w === "Sakib.";
        const isLast = w === "ship.";
        const pulse = { "teach,": 1, track: 2, "ship.": 3 }[w] || 0; // soft highlight sweep
        return (
          <span key={i} aria-hidden="true">
            <span
              className={`hw inline-block ${isName ? "hw-name" : ""} ${isLast ? "relative" : ""}`}
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              {pulse ? (
                <span
                  className="hw-pulse inline-block"
                  style={{ animationDelay: `${2400 + pulse * 450}ms` }}
                >
                  {w}
                </span>
              ) : (
                w
              )}
              {isLast && (
                <svg
                  className="hw-line absolute left-0 -bottom-1 w-full h-3 text-link"
                  viewBox="0 0 100 12"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <path
                    d="M2 8 C 20 2, 35 12, 52 6 S 82 2, 98 7"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    pathLength="1"
                  />
                </svg>
              )}
            </span>{" "}
          </span>
        );
      })}
    </h1>
  );
}

const roleList = {
  show: { transition: { staggerChildren: 0.07, delayChildren: 1.15 } },
};
const roleItem = {
  hidden: { opacity: 0, y: 14, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: EASE },
  },
};
const rise = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease: EASE, delay },
});

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const figY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -28]);
  const blobY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  return (
    <section
      ref={ref}
      id="home"
      className="section relative pt-12 md:pt-20 pb-10 md:pb-16 overflow-hidden"
    >
      {/* ambient glow that drifts and parallaxes */}
      <motion.div
        aria-hidden="true"
        style={{ y: blobY }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.span
          animate={{ x: [0, 36, 0], y: [0, -28, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-6 -right-24 h-[28rem] w-[30rem] rounded-full bg-link/15 blur-3xl"
        />
        <motion.span
          animate={{ x: [0, -30, 0], y: [0, 24, 0] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 -left-28 h-[24rem] w-[24rem] rounded-full bg-sky-hover/70 blur-3xl"
        />
      </motion.div>

      <div className="wrap relative grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center">
        <motion.div style={{ y: textY }}>
          <motion.p
            {...rise(0.05)}
            className="inline-flex max-w-full items-center gap-2 text-sm text-ink-2 bg-emerald-500/10 border border-emerald-600/45 dark:border-emerald-400/50 rounded-full pl-2 pr-3 py-1"
          >
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
            </span>
            Open to work · Chattogram, Bangladesh
          </motion.p>
          <AnimatedHeading />
          <motion.p
            {...rise(1.0)}
            className="mt-6 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed"
          >
            Mohammad Hafizur Rahman Sakib — CSE graduate, full-stack developer
            and problem solver turning complicated ideas into calm, fast
            software.
          </motion.p>
          <motion.ul
            variants={roleList}
            initial="hidden"
            animate="show"
            className="mt-6 flex flex-wrap gap-2"
            aria-label="Roles"
          >
            {ROLES.map((r) => (
              <motion.li
                key={r}
                variants={roleItem}
                whileHover={{ y: -3, scale: 1.05 }}
                whileTap={{ y: -3, scale: 1.05 }}
                className="tag tag-hover !text-sm !px-3 !py-1 cursor-default"
              >
                {r}
              </motion.li>
            ))}
          </motion.ul>
          <motion.div
            {...rise(1.35)}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="/projects"
              onClick={(e) => goTo(e, "projects")}
              className="btn-primary group text-lg !px-6 !py-2.5"
            >
              View projects{" "}
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href={LINKS.cv}
              download
              className="btn-secondary text-lg !px-6 !py-2.5"
            >
              <Download size={18} /> Download résumé
            </a>
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !py-2.5"
            >
              <GithubIcon /> GitHub
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          style={{ y: figY }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: EASE, delay: 0.35 }}
          className="fig relative mx-auto hidden md:block w-full max-w-[560px]"
        >
          <div className="absolute -inset-3 sm:-inset-6 -z-10 rounded-[36px] bg-gradient-to-br from-sky-light via-surface to-tint" />
          <Laptop
            play
            intensity={0.7}
            label="A laptop open on its hinge. Move the pointer up and down to lift the lid."
          />
          <p className="mt-2 text-center text-xs text-ink-ghost">
            Hover the figure — it answers the pointer.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
