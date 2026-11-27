import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Riffle } from "@lucasmarkes/hairline/react";
import { ArrowUpRight, Globe } from "lucide-react";
import GithubIcon from "@/components/GithubIcon";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import TechTag from "@/components/TechTag";
import { TiltCarousel } from "@/components/tilt-carousel";
import { PROJECTS } from "@/data/projects";
import { LINKS } from "@/data/site";
import { useCardWidth } from "@/hooks/useCardWidth";
import { EASE } from "@/lib/motion";

const GALLERY = PROJECTS.map((p) => ({
  src: p.img,
  alt: `${p.title} screenshot`,
}));

export default function Projects() {
  const [i, setI] = useState(0);
  const cw = useCardWidth();
  const p = PROJECTS[i] || PROJECTS[0];
  const linkCls =
    "inline-flex items-center gap-2 text-ink underline underline-offset-4 decoration-ink/40 transition-colors duration-200 hover:text-link hover:decoration-link";
  return (
    <section id="projects" className="section bg-tint border-y border-line">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-center">
          <SectionHead
            eyebrow="Projects"
            title="Things I've built and shipped."
            sub="Education tools, utilities and full-stack platforms — most are live and open source."
          >
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              All repositories <ArrowUpRight size={16} />
            </a>
          </SectionHead>
          <Reveal className="fig fig-tint mx-auto w-full max-w-[340px]">
            <Riffle
              intensity={0.6}
              label="A tray of eight cards. The card under the pointer stands up."
            />
          </Reveal>
        </div>

        <Reveal from="scale" className="mt-10">
          <TiltCarousel
            items={GALLERY}
            cardWidth={cw}
            aspect={0.7}
            perspective={1100}
            delay={3}
            onActiveChange={setI}
            aria-label="Project gallery"
          />
          <p className="mt-1 text-center text-xs text-ink-ghost">
            Drag, flick or tap a side card
          </p>
        </Reveal>

        <div className="glow mx-auto mt-6 max-w-4xl rounded-[28px] border border-line bg-card p-6 sm:p-8 shadow-card min-h-[300px] md:min-h-[340px]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="grid md:grid-cols-[1.2fr_1fr] gap-x-10 gap-y-6"
            >
              <div>
                <p className="text-sm text-ink-muted">
                  {String(i + 1).padStart(2, "0")} /{" "}
                  {String(PROJECTS.length).padStart(2, "0")} · {p.kind}
                </p>
                <h3 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-base text-ink-muted leading-relaxed">
                  {p.desc}
                </p>
                <ul
                  className="mt-4 space-y-1.5 text-sm text-ink-2"
                  aria-label="Highlights"
                >
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-2 leading-snug">
                      <span aria-hidden="true" className="mt-px text-link">
                        ▸
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5 md:pt-8">
                <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                  {p.tags.map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium">
                  <a
                    href={p.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} live site`}
                    className={linkCls}
                  >
                    <Globe size={16} /> Live site
                  </a>
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${p.title} source code on GitHub`}
                    className={linkCls}
                  >
                    <GithubIcon width={16} height={16} /> Source code
                  </a>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
