import { Stack } from "@lucasmarkes/hairline/react";
import { ArrowUpRight, Trophy } from "lucide-react";
import CountUp from "@/components/CountUp";
import Reveal from "@/components/Reveal";
import { LINKS } from "@/data/site";

const STATS = [
  ["550+", "problems solved", "LeetCode & Codeforces"],
  ["1532", "LeetCode rating", "Contest-tested"],
  ["1400+", "Codeforces", "Pupil"],
  ["10+", "shipped projects", "Live on the web"],
];

export default function Numbers() {
  return (
    <section className="section">
      <div className="wrap grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
        <Reveal className="fig mx-auto w-full max-w-[460px] order-2 lg:order-1">
          <Stack
            intensity={0.6}
            label="A call stack of five frames. The pointer's height picks one."
          />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">Competitive programming</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Practice compounds.</h2>
            <p className="mt-4 text-lg text-ink-muted max-w-xl leading-relaxed">
              Years of daily problem-solving and contests — the stack gets
              deeper every week.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {STATS.map(([n, l, s], i) => (
              <Reveal key={l} delay={i * 70} className="card !p-5">
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-link">
                  <CountUp value={n} />
                </div>
                <div className="mt-2 text-base font-medium">{l}</div>
                <div className="text-sm text-ink-muted">{s}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <a
              href={LINKS.codeforces}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Trophy size={16} /> Codeforces
            </a>
            <a
              href={LINKS.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              LeetCode <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
