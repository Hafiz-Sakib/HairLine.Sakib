import { motion } from "framer-motion";
import { Brain, Briefcase, GraduationCap, MapPin } from "lucide-react";
import Reveal from "@/components/Reveal";
import profile from "@/assets/profile.jpg";

const FACTS = [
  ["Based in", "Chattogram, Bangladesh", MapPin],
  ["Graduated", "B.Sc. CSE, Premier University", GraduationCap],
  ["Working at", "Pathao Courier (Intern)", Briefcase],
  ["Researching", "Applied ML & NLP", Brain],
];

export default function About() {
  return (
    <section id="about" className="section bg-tint border-y border-line">
      <div className="wrap grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start lg:items-stretch">
        <Reveal
          from="left"
          className="mx-auto w-full max-w-[380px] lg:max-w-none"
        >
          <div className="lg:h-full grid place-items-center">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 1.04 }}
              className="relative w-full max-w-[340px] rounded-full p-1.5"
            >
              <span
                aria-hidden="true"
                className="spin-slow absolute inset-0 rounded-full"
                style={{
                  background:
                    "conic-gradient(from 0deg, rgb(var(--primary)), rgb(var(--link) / 0.12), rgb(var(--primary) / 0.9), rgb(var(--link) / 0.12), rgb(var(--primary)))",
                }}
              />
              <img
                src={profile}
                alt="Portrait of Mohammad Hafizur Rahman Sakib"
                width="720"
                height="720"
                loading="lazy"
                className="relative w-full aspect-square object-cover rounded-full border-4 border-tint"
              />
            </motion.div>
          </div>
        </Reveal>

        <div>
          <Reveal className="glow">
            <p className="eyebrow">About me</p>
            <h2 className="mt-2 text-4xl md:text-5xl">
              A developer who likes hard problems and simple interfaces.
            </h2>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed max-w-2xl">
              I&apos;m a Computer Science &amp; Engineering graduate of Premier
              University, Chattogram. I build modern, scalable web apps with
              React, Next.js, Node.js and Tailwind CSS, backed by a strong
              foundation in data structures and algorithms — 550+ problems
              solved on LeetCode and Codeforces.
            </p>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed max-w-2xl">
              Outside of code I teach, research NLP and ship tools for students
              and everyday users in Bangladesh.
            </p>
          </Reveal>
          <dl className="mt-8 grid sm:grid-cols-2 gap-4">
            {FACTS.map(([k, v, Icon], i) => (
              <Reveal key={k} delay={i * 60} className="card !p-5">
                <dt className="flex items-center gap-2.5 text-sm text-ink-muted">
                  <span className="grid place-items-center w-8 h-8 shrink-0 rounded-md bg-sky-light text-sky-dark ico-pop">
                    <Icon size={16} aria-hidden="true" />
                  </span>
                  {k}
                </dt>
                <dd className="mt-3 text-lg font-semibold">{v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
