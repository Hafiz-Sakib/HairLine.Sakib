import { useEffect, useRef, useState } from "react";
import {
  Laptop,
  Keyboard,
  Exploded,
  Terminal,
  Settle,
  Branches,
  Stack,
  Elevator,
  Drawer,
  Phone,
  Plug,
  Riffle,
  Format,
  Loupe,
  Rebuild,
  Padlock,
  Query,
} from "@lucasmarkes/hairline/react";
import {
  ArrowRight,
  ArrowUpRight,
  Brain,
  Briefcase,
  Cloud,
  Code,
  Database,
  Download,
  GraduationCap,
  LayoutDashboard,
  Mail,
  House,
  User,
  FolderOpen,
  CircleCheck,
  CircleAlert,
  LoaderCircle,
  MapPin,
  Send,
  Share,
  SquarePlus,
  Trophy,
  Workflow,
  Wrench,
  X,
} from "lucide-react";
import { PwaProvider, usePwaInstall } from "./usePwaInstall.jsx";

import profile from "./assets/profile.jpg";
import cp from "./assets/cp.jpg";
import algoviz from "./assets/algoviz.jpg";
import subcalc from "./assets/subcalc.jpg";
import nova from "./assets/nova.jpg";
import fifa from "./assets/fifa.jpg";
import bpdb from "./assets/bpdb.jpg";
import sababa from "./assets/sababa.jpg";
import bagsq from "./assets/bagsq.jpg";
import odyssey from "./assets/odyssey.jpg";
import blood from "./assets/blood.jpg";

/* ───────────────────────── data ───────────────────────── */

const EMAIL = "hafizsakib5@gmail.com";

const LINKS = {
  github: "https://github.com/Hafiz-Sakib",
  linkedin: "https://www.linkedin.com/in/hafiz-sakib-96b8b3229/",
  codeforces: "https://codeforces.com/profile/hafiz_sakib",
  leetcode: "https://leetcode.com/hafiz_Sakib/",
  facebook: "https://www.facebook.com/Sakib1056",
  x: "https://x.com/hafiz_sakib1",
  instagram: "https://www.instagram.com/___sakib.404/",
  cv: "/Hafiz-Sakib-CV.pdf",
};

const NAV = [
  ["Home", "#home"],
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Projects", "#projects"],
  ["Experience", "#experience"],
  ["Education", "#education"],
  ["Contact", "#contact"],
];

const ROLES = ["Full-Stack Developer", "Competitive Programmer", "NLP Researcher", "ML Practitioner"];

const FACTS = [
  ["Based in", "Chattogram, Bangladesh"],
  ["Studying", "B.Sc. CSE, Premier University"],
  ["Working at", "Pathao Courier (Intern)"],
  ["Researching", "Applied ML & NLP"],
];

const FOCUS = [
  {
    id: "web",
    eyebrow: "Full-stack engineering",
    title: "Products people actually open twice.",
    body: "From a Bangla-first offline PWA to a Stripe-powered travel platform, I build interfaces that stay fast on a low-end phone and tidy under the hood — React on the front, Node and SQL/NoSQL behind it.",
    points: ["React · Next.js · TypeScript", "REST APIs, JWT auth, Stripe", "PWA, responsive, accessible"],
    Figure: Exploded,
    label: "An app window pulled apart into four layers",
  },
  {
    id: "cp",
    eyebrow: "Competitive programming",
    title: "550+ problems solved the hard way.",
    body: "Daily practice on Codeforces and LeetCode shaped how I reason about edge cases, complexity and clean abstractions. It shows up in the code I ship — and in the tools I build to teach it.",
    points: ["Codeforces Pupil (1400+)", "LeetCode rating 1532", "Algorithm visualizers & C++ tutorials"],
    Figure: Terminal,
    label: "A terminal window with its history in rows",
  },
  {
    id: "nlp",
    eyebrow: "NLP & machine learning",
    title: "Making messy text make sense.",
    body: "My undergraduate research applies machine learning to real-world language data: scattered, crooked inputs in, a structured tree of categories out.",
    points: ["Applied ML & text classification", "Python data pipelines", "Bangla-language focus"],
    Figure: Settle,
    label: "Crooked tiles sliding into an ordered tree",
  },
  {
    id: "ship",
    eyebrow: "Shipping & DevOps",
    title: "Branch, review, merge, deploy.",
    body: "I care about the parts that keep a product alive: version-control hygiene, CI-friendly builds and one-command deployments.",
    points: ["Git workflows & code review", "Vercel / Firebase deploys", "Docker, Linux & CI/CD basics"],
    Figure: Branches,
    label: "A commit graph with a branch merging back",
  },
];

const SKILLS = [
  { Icon: Code, title: "Languages", items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Dart"] },
  { Icon: LayoutDashboard, title: "Frontend", items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"] },
  { Icon: Database, title: "Backend & Database", items: ["Node.js", "Express.js", "Firebase", "MongoDB", "PostgreSQL", "REST APIs"] },
  { Icon: Trophy, title: "Competitive Programming", items: ["Codeforces", "CSES", "Problem Solving", "C++", "Algorithms"] },
  { Icon: Workflow, title: "DSA", items: ["Dynamic Programming", "Graph Theory", "Binary Search", "STL", "Number Theory"] },
  { Icon: Brain, title: "Machine Learning", items: ["Neural Networks", "LSTM", "NLP", "Pandas", "Jupyter"] },
  { Icon: Cloud, title: "Cloud & DevOps", items: ["AWS", "Docker", "Git", "Linux", "Vercel", "CI/CD"] },
  { Icon: Wrench, title: "Tools & Design", items: ["Figma", "VS Code", "GitHub", "Vite", "Redux", "LaTeX"] },
];

const PROJECTS = [
  { title: "CP Pathshala", kind: "Education PWA", img: cp, desc: "Offline-capable PWA teaching C++ competitive programming in simple Bangla — 144 lessons, 200 runnable examples, 5 learning tracks.", tags: ["React", "Vite", "PWA", "Python"], demo: "https://cp-pathshala.vercel.app/", code: "https://github.com/Hafiz-Sakib/CP-Pathshala" },
  { title: "AlgoViz", kind: "Visualizer", img: algoviz, desc: "60+ algorithms with step-by-step playback, a live C++ code panel with line highlighting and a Three.js hero scene.", tags: ["React 19", "TypeScript", "Three.js"], demo: "https://algorithm-hunter.vercel.app/", code: "https://github.com/Hafiz-Sakib/algorithm-visualizer" },
  { title: "NOVA MathPlot", kind: "Scientific tool", img: nova, desc: "Browser-only 2D/3D function plotting, 60+ surface presets, parametric curves and a neural activation explorer.", tags: ["React", "Three.js", "Math.js"], demo: "https://nova-mathplot.vercel.app/", code: "https://github.com/Hafiz-Sakib/nova-mathplot" },
  { title: "SubCalc Pro", kind: "Networking tool", img: subcalc, desc: "IPv4 subnetting toolkit with FLSM & VLSM breakdowns, overlap detection and an interactive subnet tree.", tags: ["React", "Tailwind", "VLSM"], demo: "https://subcalc-pro.vercel.app/", code: "https://github.com/Hafiz-Sakib/SubCalc-Pro" },
  { title: "FIFA World Cup 2026", kind: "Sports tracker", img: fifa, desc: "Fixtures in Bangladesh time with a countdown, score predictor, squads, quiz and PDF fixture download.", tags: ["React", "Router", "Tailwind"], demo: "https://fifa26bd.vercel.app/", code: "https://github.com/Hafiz-Sakib/fifa-wc-2026" },
  { title: "BPDB Token Helper", kind: "Utility · Bengali UI", img: bpdb, desc: "Parses prepaid-meter token SMS and walks users through entering 20-digit tokens step by step.", tags: ["React", "Framer Motion", "Bengali"], demo: "https://bpdb-token-helper.vercel.app/", code: "https://github.com/Hafiz-Sakib/BPDB-token-helper" },
  { title: "Sababa Tours", kind: "Travel platform", img: sababa, desc: "Luxury travel platform for curated Bangladesh journeys with live filtering, Firebase auth and a booking flow.", tags: ["React", "Firebase", "Tailwind"], demo: "https://sababa-tours.vercel.app/", code: "https://github.com/Hafiz-Sakib/Sababa-Tours" },
  { title: "BagsQ", kind: "SaaS dashboard", img: bagsq, desc: "Workshop workflow system: customer intake, job cards, automated reminders and technician productivity stats.", tags: ["Next.js", "MySQL", "Stripe"], demo: "https://bagsq12.web.app/", code: "https://github.com/emonmorol/bagsq-client" },
  { title: "Odyssey Travel Agency", kind: "Full-stack web app", img: odyssey, desc: "Browse global packages, customise flights and hotels, pay securely with Stripe; admin CRUD dashboard included.", tags: ["Next.js", "Express", "Stripe"], demo: "https://github.com/ArnabShikder24/odyssey-travel-client", code: "https://github.com/ArnabShikder24/odyssey-travel-client" },
  { title: "Blood Donation Management", kind: "Community platform", img: blood, desc: "Connects donors with recipients by blood group and location, with urgency tagging and JWT role-based access.", tags: ["Next.js", "MySQL", "JWT"], demo: "https://blood-buddies-donation.web.app/", code: "https://github.com/emonmorol/blood_boddies" },
];

const STATS = [
  ["550+", "problems solved", "LeetCode & Codeforces"],
  ["1532", "LeetCode rating", "Contest-tested"],
  ["1400+", "Codeforces", "Pupil"],
  ["10+", "shipped projects", "Live on the web"],
];

const JOBS = [
  { when: "2024 – Present", role: "Software Engineering Intern", org: "Pathao Courier", text: "Optimizing logistics algorithms and improving the efficiency of courier tracking systems." },
  { when: "2022 – 2023", role: "Junior Frontend Developer", org: "CodeStack", text: "Built and optimized responsive, interactive user interfaces." },
  { when: "2021 – 2022", role: "Course Instructor", org: "ICT School", text: "Taught programming basics with hands-on guidance and real-world examples." },
];

const EDU = [
  { when: "Ongoing", title: "B.Sc. in Computer Science & Engineering", org: "Premier University, Chittagong", text: "Software engineering, algorithms and full-stack development, plus an ongoing applied AI/ML thesis." },
  { when: "HSC", title: "Higher Secondary Certificate", org: "Govt. Haji Mohammad Mohsin College", text: "" },
  { when: "SSC", title: "Secondary School Certificate", org: "Govt. Muslim High School", text: "" },
];

const CERTS = [
  ["Supervised Machine Learning: Regression and Classification", "2025"],
  ["Data Science, ML, DL & NLP Bootcamp", "2024"],
  ["Number Theory Fundamentals", "2023"],
  ["Problem Solving (Basic & Intermediate)", "2022"],
  ["Python Complete Course for Beginners", "2022"],
  ["Full Stack Web Development (Batch 5)", "2021 – 22"],
];

const SOCIALS = [
  ["GitHub", LINKS.github],
  ["LinkedIn", LINKS.linkedin],
  ["Codeforces", LINKS.codeforces],
  ["LeetCode", LINKS.leetcode],
  ["Facebook", LINKS.facebook],
  ["X", LINKS.x],
  ["Instagram", LINKS.instagram],
];

/* ───────────────────────── helpers ───────────────────────── */

function Reveal({ as: Tag = "div", className = "", delay = 0, children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) return el.classList.add("in");
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("in");
          io.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }} {...rest}>
      {children}
    </Tag>
  );
}

const GithubIcon = (p) => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 .5A11.5 11.5 0 0 0 .5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12 11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);

function SectionHead({ eyebrow, title, sub, children }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-4xl md:text-5xl">{title}</h2>
        {sub && <p className="mt-4 text-lg text-ink-muted leading-relaxed">{sub}</p>}
      </div>
      {children}
    </Reveal>
  );
}

function InstallButton({ className = "", onDone }) {
  const { status, install } = usePwaInstall();
  if (status === "none") return null;
  return (
    <button
      type="button"
      className={`btn-secondary ${className}`}
      onClick={async () => {
        await install();
        onDone?.();
      }}
    >
      <Download size={16} /> Install app
    </button>
  );
}

/* ───────────────────────── sections ───────────────────────── */

const MOBILE_NAV = [
  ["Home", "#home", House],
  ["About", "#about", User],
  ["Skills", "#skills", Wrench],
  ["Projects", "#projects", FolderOpen],
  ["Experience", "#experience", Briefcase, "hidden sm:flex"],
  ["Education", "#education", GraduationCap, "hidden sm:flex"],
  ["Contact", "#contact", Mail],
];

function useActiveSection() {
  const [active, setActive] = useState("#home");
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(`#${e.target.id}`)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    NAV.forEach(([, h]) => {
      const el = document.querySelector(h);
      el && io.observe(el);
    });
    return () => io.disconnect();
  }, []);
  return active;
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* Top bar: brand + actions (full links on desktop) */}
      <header
        className={`sticky top-0 z-[100] bg-white/90 backdrop-blur pt-[env(safe-area-inset-top)] transition-shadow duration-250 ${
          scrolled ? "shadow-[0_1px_0_0_#e5e5e5]" : ""
        }`}
      >
        <div className="wrap flex items-center justify-between gap-3 px-4 sm:px-10 py-2.5 lg:py-3">
          <a href="#home" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
            <img src="/icon-192.png" alt="" width="28" height="28" className="rounded-md" />
            Sakib
          </a>

          <nav className="hidden lg:flex items-center gap-0.5" aria-label="Primary">
            {NAV.map(([l, h]) => (
              <a
                key={h}
                href={h}
                aria-current={active === h ? "page" : undefined}
                className={`px-3 py-2 rounded-sm text-[15px] transition-colors duration-150 hover:bg-hover/60 ${
                  active === h ? "text-primary font-medium" : "text-ink"
                }`}
              >
                {l}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <InstallButton className="!px-3 !py-1.5 text-sm sm:text-base sm:!px-[15px] sm:!py-[6px]" />
            <a href={LINKS.cv} download className="btn-primary !px-3 !py-1.5 text-sm sm:text-base sm:!px-[15px] sm:!py-[6px]" aria-label="Download résumé">
              <Download size={16} /> <span className="hidden min-[400px]:inline">Résumé</span>
            </a>
          </div>
        </div>
      </header>

      {/* Mobile / tablet: bottom tab bar */}
      <nav
        aria-label="Primary"
        className="lg:hidden fixed bottom-0 inset-x-0 z-[110] bg-white/95 backdrop-blur border-t border-line pb-[env(safe-area-inset-bottom)]"
      >
        <ul className="flex items-stretch justify-around max-w-xl mx-auto px-1">
          {MOBILE_NAV.map(([l, h, Icon, extra = "flex"]) => {
            const on = active === h;
            return (
              <li key={h} className={`flex-1 ${extra}`}>
                <a
                  href={h}
                  aria-current={on ? "page" : undefined}
                  className={`flex-1 flex flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors duration-150 ${
                    on ? "text-primary" : "text-ink-muted"
                  }`}
                >
                  <span className={`grid place-items-center h-7 w-12 rounded-full transition-colors duration-250 ${on ? "bg-sky-light" : ""}`}>
                    <Icon size={20} strokeWidth={on ? 2.25 : 1.75} />
                  </span>
                  {l}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

const HEADING = [
  "Hi,", "I'm", "Sakib.", "I", "build", "web", "apps", "that", "teach,", "track", "&", "ship.",
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
        return (
          <span key={i} aria-hidden="true">
            <span
              className={`hw inline-block ${isName ? "hw-name" : ""} ${isLast ? "relative" : ""}`}
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              {w}
              {isLast && (
                <svg className="hw-line absolute left-0 -bottom-1 w-full h-3 text-primary" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
                  <path d="M2 8 C 20 2, 35 12, 52 6 S 82 2, 98 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" vectorEffect="non-scaling-stroke" pathLength="1" />
                </svg>
              )}
            </span>{" "}
          </span>
        );
      })}
    </h1>
  );
}

function Hero() {
  return (
    <section id="home" className="section pt-12 md:pt-20 pb-10 md:pb-16 overflow-hidden">
      <div className="wrap grid lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-6 items-center">
        <div>
          <p className="inline-flex items-center gap-2 text-sm text-ink-muted bg-tint border border-line rounded-full pl-2 pr-3 py-1">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
            </span>
            Open to work · Chattogram, Bangladesh
          </p>
          <AnimatedHeading />
          <p className="mt-6 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed">
            Mohammad Hafizur Rahman Sakib — CSE student, full-stack developer and problem solver
            turning complicated ideas into calm, fast software.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
            {ROLES.map((r) => (
              <li key={r} className="tag !text-sm !px-3 !py-1">{r}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary text-lg !px-5 !py-2.5">
              View projects <ArrowRight size={18} />
            </a>
            <a href="#contact" className="btn-secondary text-lg !px-5 !py-2.5">
              <Mail size={18} /> Contact me
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>

        <div className="fig relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-3 sm:-inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-sky-light via-white to-tint" />
          <Laptop play intensity={0.7} label="A laptop open on its hinge. Move the pointer up and down to lift the lid." />
          <p className="mt-2 text-center text-xs text-ink-ghost">Hover the figure — it answers the pointer.</p>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="section bg-tint border-y border-line">
      <div className="wrap grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start">
        <Reveal className="mx-auto w-full max-w-[380px]">
          <div className="card !p-3">
            <img
              src={profile}
              alt="Portrait of Hafiz Sakib"
              width="720"
              height="720"
              loading="lazy"
              className="w-full aspect-square object-cover rounded-md"
            />
            <div className="px-2 pt-4 pb-2">
              <p className="font-bold text-lg">Mohammad Hafizur Rahman Sakib</p>
              <p className="text-sm text-ink-muted">Full-Stack Developer · Competitive Programmer</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">About me</p>
            <h2 className="mt-2 text-4xl md:text-5xl">A developer who likes hard problems and simple interfaces.</h2>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed max-w-2xl">
              I&apos;m a Computer Science &amp; Engineering student at Premier University, Chattogram. I build
              modern, scalable web apps with React, Next.js, Node.js and Tailwind CSS, backed by a strong
              foundation in data structures and algorithms — 550+ problems solved on LeetCode and Codeforces.
            </p>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed max-w-2xl">
              Outside of code I teach, research NLP and ship tools for students and everyday users in Bangladesh.
            </p>
          </Reveal>
          <dl className="mt-8 grid sm:grid-cols-2 gap-4">
            {FACTS.map(([k, v], i) => (
              <Reveal key={k} delay={i * 60} className="card !p-5">
                <dt className="text-sm text-ink-muted">{k}</dt>
                <dd className="mt-1 text-lg font-semibold">{v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Focus() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow="What I do" title="One developer, four ways to be useful." />
        <div className="mt-14 md:mt-20 space-y-20 md:space-y-28">
          {FOCUS.map(({ id, eyebrow, title, body, points, Figure, label }, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={id} className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <Reveal className={flip ? "md:order-2" : ""}>
                  <p className="eyebrow">{eyebrow}</p>
                  <h3 className="mt-2 text-3xl md:text-4xl">{title}</h3>
                  <p className="mt-4 text-lg text-ink-muted leading-relaxed">{body}</p>
                  <ul className="mt-6 space-y-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-base text-ink-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                <Reveal delay={100} className={`fig mx-auto w-full max-w-[500px] ${flip ? "md:order-1" : ""}`}>
                  <Figure label={label} intensity={0.6} />
                </Reveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="section bg-tint border-y border-line">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_420px] gap-10 items-center">
          <SectionHead
            eyebrow="Skills"
            title="The toolbox, sorted."
            sub="Languages, frameworks and practices I use day to day — from competitive C++ to production React."
          />
          <Reveal className="fig fig-tint mx-auto w-full max-w-[420px]">
            <Keyboard intensity={0.6} label="A sixty-key keyboard. The key under the pointer sinks." />
          </Reveal>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map(({ Icon, title, items }, i) => (
            <Reveal key={title} delay={(i % 4) * 70} className="card flex flex-col">
              <span className="grid place-items-center w-10 h-10 rounded-md bg-sky-light text-sky-dark">
                <Icon size={20} />
              </span>
              <h3 className="mt-4 text-xl">{title}</h3>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {items.map((s) => (
                  <li key={s} className="tag">{s}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [all, setAll] = useState(false);
  const list = all ? PROJECTS : PROJECTS.slice(0, 6);
  return (
    <section id="projects" className="section bg-tint border-y border-line">
      <div className="wrap">
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-center">
          <SectionHead eyebrow="Projects" title="Things I've built and shipped." sub="Education tools, utilities and full-stack platforms — most are live and open source.">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              All repositories <ArrowUpRight size={16} />
            </a>
          </SectionHead>
          <Reveal className="fig fig-tint mx-auto w-full max-w-[340px]">
            <Riffle intensity={0.6} label="A tray of eight cards. The card under the pointer stands up." />
          </Reveal>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((p, i) => (
            <Reveal key={p.title} delay={(i % 3) * 80} as="article" className="card !p-0 overflow-hidden flex flex-col group">
              <div className="relative aspect-[16/10] overflow-hidden bg-tint border-b border-line">
                <img
                  src={p.img}
                  alt={`${p.title} screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-notion group-hover:scale-[1.03]"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-medium text-primary">{p.kind}</p>
                <h3 className="mt-1 text-2xl">{p.title}</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">{p.desc}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4 text-sm font-medium">
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center gap-1">
                    Live demo <ArrowUpRight size={14} />
                  </a>
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline">Source</a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button type="button" className="btn-ghost" onClick={() => setAll((a) => !a)}>
            {all ? "Show fewer" : `Show all ${PROJECTS.length} projects`}
          </button>
        </div>
      </div>
    </section>
  );
}

function Numbers() {
  return (
    <section className="section">
      <div className="wrap grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
        <Reveal className="fig mx-auto w-full max-w-[460px] order-2 lg:order-1">
          <Stack intensity={0.6} label="A call stack of five frames. The pointer's height picks one." />
        </Reveal>
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow">Competitive programming</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Practice compounds.</h2>
            <p className="mt-4 text-lg text-ink-muted max-w-xl leading-relaxed">
              Years of daily problem-solving and contests — the stack gets deeper every week.
            </p>
          </Reveal>
          <div className="mt-10 grid grid-cols-2 gap-4">
            {STATS.map(([n, l, s], i) => (
              <Reveal key={l} delay={i * 70} className="card !p-5">
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-primary">{n}</div>
                <div className="mt-2 text-base font-medium">{l}</div>
                <div className="text-sm text-ink-muted">{s}</div>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 flex flex-wrap gap-3">
            <a href={LINKS.codeforces} target="_blank" rel="noopener noreferrer" className="btn-primary">
              <Trophy size={16} /> Codeforces
            </a>
            <a href={LINKS.leetcode} target="_blank" rel="noopener noreferrer" className="btn-ghost">
              LeetCode <ArrowUpRight size={16} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Timeline({ items, Icon }) {
  return (
    <ol className="relative border-l border-line ml-3 space-y-8">
      {items.map(({ when, role, title, org, text }, i) => (
        <Reveal as="li" key={role || title} delay={i * 60} className="pl-8 relative">
          <span className="absolute -left-[13px] top-0.5 grid place-items-center w-[26px] h-[26px] rounded-full bg-sky-light text-sky-dark ring-4 ring-white">
            <Icon size={14} />
          </span>
          <p className="text-sm text-ink-muted">{when}</p>
          <h3 className="text-xl mt-0.5">{role || title}</h3>
          <p className="text-base text-primary font-medium">{org}</p>
          {text && <p className="mt-2 text-base text-ink-muted leading-relaxed">{text}</p>}
        </Reveal>
      ))}
    </ol>
  );
}

function Experience() {
  return (
    <section id="experience" className="section bg-tint border-y border-line">
      <div className="wrap grid lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <SectionHead eyebrow="Experience" title="Where I've worked." sub="Climbing one floor at a time." />
          <div className="mt-10">
            <Timeline items={JOBS} Icon={Briefcase} />
          </div>
        </div>
        <Reveal className="fig fig-tint mx-auto w-full max-w-[460px]">
          <Elevator intensity={0.6} label="Four floors beside an open shaft. The pointer's height picks a floor." />
        </Reveal>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="section">
      <div className="wrap">
        <SectionHead eyebrow="Education" title="Learning, formally and otherwise." />
        <div className="mt-12 grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <Timeline items={EDU} Icon={GraduationCap} />
          <div>
            <Reveal className="fig mx-auto w-full max-w-[340px]">
              <Drawer intensity={0.6} label="A cabinet of three drawers. The pointer's height picks one." />
            </Reveal>
            <Reveal className="card mt-6 !p-8">
              <h3 className="text-2xl">Courses &amp; certificates</h3>
              <ul className="mt-5 divide-y divide-line">
                {CERTS.map(([t, y]) => (
                  <li key={t} className="py-3 flex items-start justify-between gap-4">
                    <span className="text-base text-ink-2">{t}</span>
                    <span className="text-sm text-ink-muted whitespace-nowrap">{y}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function InstallCard() {
  const { status, install, setIosHelp } = usePwaInstall();
  if (status === "none") return null;
  return (
    <section className="section pb-0">
      <div className="wrap">
        <Reveal className="rounded-lg bg-sky-light/60 border border-sky-light overflow-hidden grid md:grid-cols-[1.2fr_1fr] items-center">
          <div className="p-8 sm:p-12">
            <p className="eyebrow">Install</p>
            <h2 className="mt-2 text-3xl md:text-4xl">Keep this portfolio on your home screen.</h2>
            <p className="mt-4 text-lg text-ink-muted max-w-md leading-relaxed">
              Works offline, opens instantly and feels like a native app — no app store needed.
            </p>
            <button type="button" className="btn-primary mt-7 text-lg !px-5 !py-2.5" onClick={() => (status === "ios" ? setIosHelp(true) : install())}>
              <Download size={18} /> {status === "ios" ? "How to install" : "Install app"}
            </button>
          </div>
          <div className="fig mx-auto w-full max-w-[300px] p-6 md:p-8">
            <Phone intensity={0.7} label="A phone in layers: glass, board, battery, shell." />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "fa7f8ec7-a4a8-424b-8efd-9b6387755682";
const EMPTY = { name: "", email: "", subject: "", message: "" };

function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (state === "loading") return;
    setState("loading");
    const body = new FormData();
    body.append("access_key", WEB3FORMS_KEY);
    body.append("name", form.name);
    body.append("email", form.email);
    body.append("subject", form.subject || "New Contact Form Submission");
    body.append("message", form.message);
    body.append("from_name", "Sakib Portfolio");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success !== false) {
        setState("success");
        setForm(EMPTY);
      } else setState("error");
    } catch {
      setState("error");
    }
  };

  const field =
    "w-full bg-white border border-line rounded-sm px-3 py-2.5 text-base placeholder:text-ink-ghost transition-shadow duration-150 focus:outline-none focus:shadow-focus focus:border-primary disabled:bg-tint";
  const label = "block text-sm font-medium text-ink-2 mb-1";

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal className="rounded-lg bg-tint border border-line overflow-hidden grid lg:grid-cols-2 items-stretch">
          <div className="p-6 sm:p-12 lg:p-14 flex flex-col justify-center">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-2 text-4xl md:text-5xl">Have a product to build? Plug me in.</h2>
            <p className="mt-4 text-lg text-ink-muted max-w-md leading-relaxed">
              Internships, freelance builds or research collaboration — I reply fast.
            </p>
            <p className="mt-6 flex items-center gap-2 text-ink-2"><MapPin size={16} /> Chattogram, Bangladesh</p>
            <a href={`mailto:${EMAIL}`} className="mt-2 inline-flex items-center gap-2 text-primary font-medium hover:underline break-all">
              <Mail size={16} className="shrink-0" /> {EMAIL}
            </a>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map(([n, h]) => (
                <li key={n}>
                  <a href={h} target="_blank" rel="noopener noreferrer" className="tag !text-sm !px-3 !py-1 hover:bg-hover/60 transition-colors">
                    {n} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-12 lg:p-14 bg-white border-t lg:border-t-0 lg:border-l border-line">
            <div className="fig mx-auto w-full max-w-[220px] -mt-2 mb-3">
              <Plug intensity={0.7} label="A plug on its cord. Move the pointer to draw it toward the socket." />
            </div>

            {state === "success" ? (
              <div role="status" className="text-center py-8">
                <span className="mx-auto grid place-items-center w-12 h-12 rounded-full bg-sky-light text-sky-dark">
                  <CircleCheck size={26} />
                </span>
                <h3 className="mt-4 text-2xl">Message sent!</h3>
                <p className="mt-2 text-ink-muted">Thanks for reaching out — I&apos;ll get back to you soon.</p>
                <button type="button" className="btn-ghost mt-6" onClick={() => setState("idle")}>Send another</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="c-name" className={label}>Name</label>
                    <input id="c-name" required autoComplete="name" className={field} placeholder="Your name" value={form.name} onChange={set("name")} disabled={state === "loading"} />
                  </div>
                  <div>
                    <label htmlFor="c-email" className={label}>Email</label>
                    <input id="c-email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" value={form.email} onChange={set("email")} disabled={state === "loading"} />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className={label}>Subject</label>
                  <input id="c-subject" className={field} placeholder="What's it about?" value={form.subject} onChange={set("subject")} disabled={state === "loading"} />
                </div>
                <div>
                  <label htmlFor="c-msg" className={label}>Message</label>
                  <textarea id="c-msg" required rows={4} className={field} placeholder="Tell me about your idea…" value={form.message} onChange={set("message")} disabled={state === "loading"} />
                </div>
                <button type="submit" disabled={state === "loading"} className="btn-primary w-full !py-2.5 disabled:opacity-70 disabled:cursor-not-allowed">
                  {state === "loading" ? (<><LoaderCircle size={16} className="animate-spin" /> Sending…</>) : (<><Send size={16} /> Send message</>)}
                </button>
                {state === "error" && (
                  <p role="alert" className="flex items-start gap-2 text-sm text-accent-red">
                    <CircleAlert size={16} className="mt-0.5 shrink-0" />
                    Couldn&apos;t send right now. Please try again, or email me directly at {EMAIL}.
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-line px-4 sm:px-10 py-8">
      <div className="wrap flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <p>© {new Date().getFullYear()} Mohammad Hafizur Rahman Sakib · Chattogram, Bangladesh</p>
        <div className="flex items-center gap-4">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="hover:text-ink inline-flex items-center gap-1.5">
            <GithubIcon width={16} height={16} /> GitHub
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-ink">LinkedIn</a>
          <a href="#home" className="hover:text-ink">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}

const PRINCIPLES = [
  { Figure: Format, title: "Clean code", text: "Readable, consistent and formatted — every line snaps square to its indent.", label: "A file of crooked lines that snap square under the pointer" },
  { Figure: Loupe, title: "Eye for detail", text: "Edge cases, spacing, states — the small things users feel but never name.", label: "A loupe magnifying ruled lines" },
  { Figure: Rebuild, title: "Built to scale", text: "Modular pieces that rebuild cleanly when one dependency changes.", label: "A tree of packages that rise together" },
  { Figure: Padlock, title: "Secure by default", text: "JWT auth, role-based access and safe payments with Stripe.", label: "A padlock whose shackle lifts as the pointer nears" },
];

function Principles() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow="How I work" title="Principles behind every build." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRINCIPLES.map(({ Figure, title, text, label }, i) => (
            <Reveal key={title} delay={(i % 4) * 70} className="card flex flex-col !p-5">
              <div className="fig mx-auto w-full max-w-[240px]">
                <Figure intensity={0.6} label={label} />
              </div>
              <h3 className="mt-3 text-xl">{title}</h3>
              <p className="mt-2 text-sm text-ink-muted leading-relaxed">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NotFound() {
  return (
    <main className="min-h-[100dvh] grid place-items-center px-4 py-12">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-14 items-center">
        <div className="fig mx-auto w-full max-w-[360px] md:order-2 relative">
          <div className="absolute -inset-3 sm:-inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-sky-light via-white to-tint" />
          <Query intensity={0.7} play label="A question mark whose hook turns toward the pointer and a loose ball rolling after it." />
        </div>
        <div className="text-center md:text-left md:order-1">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">This page took a wrong turn.</h1>
          <p className="mt-4 text-lg text-ink-muted leading-relaxed">
            The page <code className="font-mono text-base bg-tint border border-line rounded-sm px-1.5 py-0.5 break-all">{window.location.pathname}</code>{" "}
            doesn&apos;t exist — maybe the link is old, or the address has a typo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
            <a href="/" className="btn-primary text-lg !px-5 !py-2.5"><House size={18} /> Back to home</a>
            <a href="/#projects" className="btn-secondary text-lg !px-5 !py-2.5">View projects <ArrowRight size={18} /></a>
            <a href="/#contact" className="btn-ghost !py-2.5">Contact</a>
          </div>
        </div>
      </div>
    </main>
  );
}

function IosHelp() {
  const { iosHelp, setIosHelp } = usePwaInstall();
  if (!iosHelp) return null;
  return (
    <div className="fixed inset-0 z-[300] grid place-items-end sm:place-items-center bg-black/30 p-4" role="dialog" aria-modal="true" aria-label="Install on iPhone" onClick={() => setIosHelp(false)}>
      <div className="card w-full max-w-sm !p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h3 className="text-xl">Install on your iPhone</h3>
          <button aria-label="Close" onClick={() => setIosHelp(false)} className="p-1 -m-1 rounded-sm hover:bg-hover/60"><X size={18} /></button>
        </div>
        <ol className="mt-4 space-y-3 text-base text-ink-2">
          <li className="flex items-center gap-3"><Share size={18} className="text-primary shrink-0" /> Tap the <strong>Share</strong> button in Safari.</li>
          <li className="flex items-center gap-3"><SquarePlus size={18} className="text-primary shrink-0" /> Choose <strong>Add to Home Screen</strong>.</li>
          <li className="flex items-center gap-3"><Download size={18} className="text-primary shrink-0" /> Tap <strong>Add</strong> — done.</li>
        </ol>
      </div>
    </div>
  );
}

const KNOWN_PATHS = ["/", "/index.html"];

export default function App() {
  if (!KNOWN_PATHS.includes(window.location.pathname)) return <NotFound />;
  return (
    <PwaProvider>
      <Nav />
      <main className="pb-[calc(64px+env(safe-area-inset-bottom))] lg:pb-0">
        <Hero />
        <About />
        <Focus />
        <Skills />
        <Principles />
        <Projects />
        <Numbers />
        <Experience />
        <Education />
        <InstallCard />
        <Contact />
      </main>
      <Footer />
      <IosHelp />
    </PwaProvider>
  );
}
