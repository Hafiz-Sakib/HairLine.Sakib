import {
  Branches,
  Settle,
  Terminal,
  Terrain,
} from "@lucasmarkes/hairline/react";
import Reveal from "@/components/Reveal";

const FOCUS = [
  {
    id: "web",
    eyebrow: "Full-stack engineering",
    title: "Products people open twice.",
    body: "From a Bangla-first offline PWA to a Stripe-powered travel platform, I build interfaces that stay fast on a low-end phone and tidy under the hood — React on the front, Node and SQL/NoSQL behind it.",
    points: [
      "React · Next.js · TypeScript",
      "REST APIs, JWT auth, Stripe",
      "PWA, responsive, accessible",
    ],
    Figure: Terrain,
    label: "Eighty-one pillars on a plinth that rise around the pointer",
  },
  {
    id: "cp",
    eyebrow: "Competitive programming",
    title: "550+ problems, solved the hard way.",
    body: "Daily practice on Codeforces and LeetCode shaped how I reason about edge cases, complexity and clean abstractions. It shows up in the code I ship — and in the tools I build to teach it.",
    points: [
      "Codeforces Pupil (1400+)",
      "LeetCode rating 1532",
      "Algorithm visualizers & C++ tutorials",
    ],
    Figure: Terminal,
    label: "A terminal window with its history in rows",
  },
  {
    id: "nlp",
    eyebrow: "NLP & machine learning",
    title: "Making messy text make sense.",
    body: "My thesis research applies machine learning to real-world language data: scattered, crooked inputs in, a structured tree of categories out.",
    points: [
      "Applied ML & text classification",
      "Python data pipelines",
      "Bangla-language focus",
    ],
    Figure: Settle,
    label: "Crooked tiles sliding into an ordered tree",
  },
  {
    id: "ship",
    eyebrow: "Shipping & DevOps",
    title: "Branch, review, merge, deploy.",
    body: "I care about the parts that keep a product alive: version-control hygiene, CI-friendly builds and one-command deployments.",
    points: [
      "Git workflows & code review",
      "Vercel / Firebase deploys",
      "Docker, Linux & CI/CD basics",
    ],
    Figure: Branches,
    label: "A commit graph with a branch merging back",
  },
];

export default function Focus() {
  return (
    <section className="section md:!py-16 lg:!py-20">
      <div className="wrap">
        {/* One clear section heading; the four items below use a quieter, numbered style */}
        <Reveal className="glow max-w-2xl">
          <p className="eyebrow">What I do</p>
          <h2 className="mt-2 text-4xl md:text-5xl">
            Four ways I put code to work.
          </h2>
          <p className="mt-4 text-lg text-ink-muted leading-relaxed">
            Shipping full-stack products, sharpening problem-solving,
            researching language data and deploying with care — here is where I
            can help most.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-14 divide-y divide-line border-y border-line">
          {FOCUS.map(
            ({ id, eyebrow, title, body, points, Figure, label }, i) => {
              const flip = i % 2 === 1;
              return (
                <div
                  key={id}
                  className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch py-12 md:py-14 lg:py-16"
                >
                  <Reveal
                    from={flip ? "right" : "left"}
                    className={`glow flex flex-col justify-center ${flip ? "lg:order-2" : ""}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center w-9 h-9 rounded-full bg-sky-light text-sky-dark text-sm font-bold tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="eyebrow">{eyebrow}</p>
                    </div>
                    <h3 className="mt-4 text-2xl md:text-3xl">{title}</h3>
                    <p className="mt-3 text-lg text-ink-muted leading-relaxed">
                      {body}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {points.map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-3 text-base text-ink-2"
                        >
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                  {/* Figure box fills the text column's height (5:4 figure scales to it) */}
                  <Reveal
                    from={flip ? "left" : "right"}
                    delay={100}
                    className={`fig flex items-center justify-center ${flip ? "lg:order-1" : ""}`}
                  >
                    <div className="w-full max-w-[500px] lg:max-w-full lg:w-auto lg:h-full lg:max-h-[420px] lg:min-h-[300px] aspect-[5/4]">
                      <Figure label={label} intensity={0.6} />
                    </div>
                  </Reveal>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
}
