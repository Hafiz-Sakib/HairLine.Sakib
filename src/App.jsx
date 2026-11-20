import { useEffect, useRef, useState } from "react";
import { flushSync, createPortal } from "react-dom";
import {
  Laptop,
  Keyboard,
  Terrain,
  Terminal,
  Settle,
  Branches,
  Stack,
  Elevator,
  Cabinet,
  Plug,
  Riffle,
  Format,
  Loupe,
  Rebuild,
  Vault,
  Query,
} from "@lucasmarkes/hairline/react";
import {
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  ExternalLink,
  BookOpen,
  X as CloseIcon,
  Brain,
  Briefcase,
  Cloud,
  Code,
  Database,
  Download,
  GraduationCap,
  LayoutDashboard,
  Activity,
  AtSign,
  Binary,
  Boxes,
  ListChecks,
  Mail,
  MessageSquareText,
  Moon,
  Network,
  PenLine,
  Puzzle,
  RefreshCw,
  Search,
  Share2,
  Sigma,
  Languages,
  Layers,
  Globe,
  Sun,
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
import {
  SiC, SiCplusplus, SiOpenjdk, SiPython, SiJavascript, SiTypescript, SiDart, SiReact, SiNextdotjs,
  SiTailwindcss, SiHtml5, SiCss, SiNodedotjs, SiExpress, SiFirebase, SiMongodb, SiPostgresql,
  SiCodeforces, SiDocker, SiGit, SiLinux, SiVercel, SiFigma, SiGithub, SiVite, SiRedux, SiLatex,
  SiPandas, SiJupyter, SiFacebook, SiX, SiInstagram, SiLeetcode,
  SiPwa, SiThreedotjs, SiReactrouter, SiFramer, SiMysql, SiStripe, SiJsonwebtokens,
} from "react-icons/si";
import { FaAws, FaLinkedin } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
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


/* ───────────── clean-URL section routing (/about instead of /#about) ───────────── */

const SECTION_PATHS = ["home", "about", "skills", "projects", "experience", "education", "contact"];
const idOf = (href) => href.replace(/^\/?#?\/?/, "") || "home";
const pathOf = (id) => (id === "home" ? "/" : `/${id}`);
const currentSection = () => {
  const seg = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return seg === "" || seg === "index.html" ? "home" : seg;
};

function scrollToSection(id, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return;
  if (id === "home") return window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

/* Click handler for in-page nav links: keeps the URL clean, no hash. */
function goTo(e, id) {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  e.preventDefault();
  const path = pathOf(id);
  if (window.location.pathname !== path) window.history.pushState({ section: id }, "", path);
  scrollToSection(id);
}

/* On first load (and back/forward) scroll to the section named by the URL. */
function useSectionRouting() {
  useEffect(() => {
    // Old links like /#about are rewritten to /about.
    const legacy = window.location.hash.replace("#", "");
    if (legacy && SECTION_PATHS.includes(legacy)) {
      window.history.replaceState({ section: legacy }, "", pathOf(legacy));
    }
    const id = currentSection();
    let t;
    if (id !== "home") t = setTimeout(() => scrollToSection(id, false), 120);
    const onPop = () => scrollToSection(currentSection());
    window.addEventListener("popstate", onPop);
    return () => {
      clearTimeout(t);
      window.removeEventListener("popstate", onPop);
    };
  }, []);
}

const ROLES = ["Full-Stack Developer", "Competitive Programmer", "NLP Researcher", "ML Practitioner"];

const FACTS = [
  ["Based in", "Chattogram, Bangladesh", MapPin],
  ["Graduated", "B.Sc. CSE, Premier University", GraduationCap],
  ["Working at", "Pathao Courier (Intern)", Briefcase],
  ["Researching", "Applied ML & NLP", Brain],
];

const FOCUS = [
  {
    id: "web",
    eyebrow: "Full-stack engineering",
    title: "Products people open twice.",
    body: "From a Bangla-first offline PWA to a Stripe-powered travel platform, I build interfaces that stay fast on a low-end phone and tidy under the hood — React on the front, Node and SQL/NoSQL behind it.",
    points: ["React · Next.js · TypeScript", "REST APIs, JWT auth, Stripe", "PWA, responsive, accessible"],
    Figure: Terrain,
    label: "Eighty-one pillars on a plinth that rise around the pointer",
  },
  {
    id: "cp",
    eyebrow: "Competitive programming",
    title: "550+ problems, solved the hard way.",
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
  { when: "Graduated", title: "B.Sc. in Computer Science & Engineering", org: "Premier University, Chittagong", text: "Software engineering, algorithms and full-stack development, with an undergraduate thesis on Natural Language Processing (NLP) focused on the Bengali language." },
  { when: "HSC", title: "Higher Secondary Certificate", org: "Govt. Hazi Mohammad Mohsin College", text: "" },
  { when: "SSC", title: "Secondary School Certificate", org: "Govt. Muslim High School", text: "" },
];

const CERTS = [
  { title: "Supervised Machine Learning: Regression and Classification", provider: "Coursera", year: "2025", url: "https://www.coursera.org/learn/machine-learning" },
  { title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp", provider: "Udemy", year: "2024", url: "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/" },
  { title: "Number Theory Fundamentals", provider: "Udemy", year: "2023", url: "https://www.udemy.com/course/number-theory-fundamentals/" },
  { title: "Problem Solving (Basic) Certificate", provider: "HackerRank", year: "2022", url: "https://www.hackerrank.com/certificates/96a1aa85c641" },
  { title: "Problem Solving (Intermediate) Certificate", provider: "HackerRank", year: "2022", url: "https://www.hackerrank.com/certificates/f293a98f33f8" },
  { title: "Python Complete Course For Python Beginners", provider: "Udemy", year: "2022", url: "https://www.udemy.com/course/python-complete-course-for-beginners/" },
  { title: "Full Stack Web Development (Batch 5)", provider: "Programming Hero", year: "2021 – 2022", url: "https://web.programming-hero.com/course-details" },
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

const INK = "rgb(var(--ink))";
const LINK = "rgb(var(--link))";

/** skill name -> [icon, colour in light mode, colour in dark mode (optional)] */
const TECH = {
  "C": [SiC, "#5b7fa6", "#a8b9cc"],
  "C++": [SiCplusplus, "#00599c", "#5aa7e8"],
  "Java": [SiOpenjdk, "#ed8b00"],
  "Python": [SiPython, "#3776ab", "#5b9bd0"],
  "JavaScript": [SiJavascript, "#c9a800", "#f7df1e"],
  "TypeScript": [SiTypescript, "#3178c6", "#5a9fe6"],
  "Dart": [SiDart, "#0175c2", "#40b0f0"],
  "React": [SiReact, "#0e9cc4", "#61dafb"],
  "Next.js": [SiNextdotjs, INK],
  "Tailwind CSS": [SiTailwindcss, "#06b6d4", "#38bdf8"],
  "HTML5": [SiHtml5, "#e34f26", "#ff7043"],
  "CSS3": [SiCss, "#663399", "#b388eb"],
  "Node.js": [SiNodedotjs, "#339933", "#5fb760"],
  "Express.js": [SiExpress, INK],
  "Firebase": [SiFirebase, "#f57c00", "#ffa000"],
  "MongoDB": [SiMongodb, "#47a248", "#5fc260"],
  "PostgreSQL": [SiPostgresql, "#4169e1", "#6f8ff0"],
  "REST APIs": [Network, LINK],
  "Codeforces": [SiCodeforces, "#1f8acb"],
  "CSES": [ListChecks, LINK],
  "Problem Solving": [Puzzle, LINK],
  "Algorithms": [Binary, LINK],
  "Dynamic Programming": [Layers, LINK],
  "Graph Theory": [Share2, LINK],
  "Binary Search": [Search, LINK],
  "STL": [Boxes, LINK],
  "Number Theory": [Sigma, LINK],
  "Neural Networks": [Network, LINK],
  "LSTM": [Activity, LINK],
  "NLP": [MessageSquareText, LINK],
  "Pandas": [SiPandas, "#150458", "#b9a8ff"],
  "Jupyter": [SiJupyter, "#f37626"],
  "AWS": [FaAws, "#e68a00", "#ff9900"],
  "Docker": [SiDocker, "#2496ed"],
  "Git": [SiGit, "#f05032"],
  "Linux": [SiLinux, INK],
  "Vercel": [SiVercel, INK],
  "CI/CD": [RefreshCw, LINK],
  "Figma": [SiFigma, "#f24e1e"],
  "VS Code": [VscVscode, "#007acc", "#3aa0f0"],
  "GitHub": [SiGithub, INK],
  "Vite": [SiVite, "#646cff", "#9aa0ff"],
  "Redux": [SiRedux, "#764abc", "#a77ee8"],
  "LaTeX": [SiLatex, "#008080", "#2dbdbd"],
  // project tags
  "React 19": [SiReact, "#0e9cc4", "#61dafb"],
  "PWA": [SiPwa, "#5a0fc8", "#a77ee8"],
  "Three.js": [SiThreedotjs, INK],
  "Math.js": [Sigma, LINK],
  "VLSM": [Network, LINK],
  "Router": [SiReactrouter, "#ca4245", "#ef6b6e"],
  "Framer Motion": [SiFramer, INK],
  "Bengali": [Languages, LINK],
  "MySQL": [SiMysql, "#4479a1", "#5ba6d4"],
  "Stripe": [SiStripe, "#635bff", "#8f89ff"],
  "Express": [SiExpress, INK],
  "JWT": [SiJsonwebtokens, "#d63aff", "#e07bff"],
};

const SOCIAL_ICONS = {
  GitHub: [SiGithub, INK],
  LinkedIn: [FaLinkedin, "#0a66c2", "#5aa9f0"],
  Codeforces: [SiCodeforces, "#1f8acb"],
  LeetCode: [SiLeetcode, "#ffa116"],
  Facebook: [SiFacebook, "#1877f2", "#5b9bff"],
  X: [SiX, INK],
  Instagram: [SiInstagram, "#e4405f", "#ff6f8c"],
};

function BrandIcon({ def, size = 14, className = "" }) {
  if (!def) return null;
  const [Icon, light, dark] = def;
  return <Icon size={size} aria-hidden="true" className={`ti shrink-0 ${className}`} style={{ "--ic": light, "--icd": dark || light }} />;
}

function TechTag({ name }) {
  return (
    <li className="tag inline-flex items-center gap-1.5 !py-1">
      <BrandIcon def={TECH[name]} size={14} />
      {name}
    </li>
  );
}

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
      aria-label="Install app"
      className={`btn-secondary ${className}`}
      onClick={async () => {
        await install();
        onDone?.();
      }}
    >
      <Download size={16} /> <span className="hidden sm:inline">Install app</span>
    </button>
  );
}

/* ───────────────────────── theme ───────────────────────── */

const THEME_KEY = "sakib-theme";
/* Day/night switch: night grows out of the button, day shrinks back into it (CSS in index.css) */
const SWITCH_MS = 1300;
const SWITCH_EASE = "cubic-bezier(.5,.05,.25,1)";

/** Light by default. Dark only after the visitor switches it on (remembered on this device). */
function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  const apply = (isDark) => {
    document.documentElement.classList.toggle("dark", isDark);
    document.getElementById("theme-color")?.setAttribute("content", isDark ? "#0a0c14" : "#ffffff");
    setDark(isDark);
  };

  const toggle = (e) => {
    const next = !dark;
    try { localStorage.setItem(THEME_KEY, next ? "dark" : "light"); } catch { /* ignore */ }

    const root = document.documentElement;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const run = () => flushSync(() => apply(next));

    if (!reduce && typeof document.startViewTransition === "function") {
      // circular reveal growing from the toggle button
      const r = e?.currentTarget?.getBoundingClientRect();
      const x = r ? r.left + r.width / 2 : window.innerWidth / 2;
      const y = r ? r.top + r.height / 2 : 0;
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
      const st = root.style;
      st.setProperty("--vt-x", `${x}px`); st.setProperty("--vt-y", `${y}px`);
      st.setProperty("--vt-reach", `${radius}px`); st.setProperty("--vt-ms", `${SWITCH_MS}ms`); st.setProperty("--vt-ease", SWITCH_EASE);
      root.dataset.themeSwitch = next ? "to-dark" : "to-light";
      root.classList.add("theme-anim");
      const t = document.startViewTransition(run);
      // both directions are pure CSS animations (index.css): nothing is left on <html> afterwards, so a later switch never inherits a stale one
      t.ready.catch((err) => console.warn("[theme] view transition skipped:", err));
      t.finished.finally(() => {
        root.classList.remove("theme-anim");
        delete root.dataset.themeSwitch;
        ["--vt-x", "--vt-y", "--vt-reach", "--vt-ms", "--vt-ease"].forEach((k) => st.removeProperty(k));
      });
    } else if (!reduce) {
      // fallback: soft cross-fade
      root.classList.add("theme-fade");
      run();
      setTimeout(() => root.classList.remove("theme-fade"), 1100);
    } else {
      run();
    }
  };
  return [dark, toggle];
}

function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
      className="theme-btn relative grid place-items-center h-9 w-9 shrink-0 rounded-full border border-ink-ghost/60 bg-surface text-ink hover:bg-hover/60 hover:border-ink-ghost"
    >
      <Sun
        size={18}
        className={`ico absolute ${dark ? "opacity-0 scale-0 rotate-[120deg]" : "opacity-100 scale-100 rotate-0 text-amber-500"}`}
      />
      <Moon
        size={18}
        className={`ico absolute ${dark ? "opacity-100 scale-100 rotate-0 text-link" : "opacity-0 scale-0 -rotate-[120deg]"}`}
      />
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
  const [dark, toggleTheme] = useTheme();

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
        className={`sticky top-0 z-[100] bg-surface/90 backdrop-blur pt-[env(safe-area-inset-top)] transition-shadow duration-250 ${
          scrolled ? "shadow-[0_1px_0_0_rgb(var(--line))]" : ""
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between gap-3 px-4 sm:px-10 xl:px-12 py-2.5 xl:py-3">
          <a href="/" onClick={(e) => goTo(e, "home")} aria-label="Sakib, home" className="flex items-center shrink-0 xl:justify-self-start">
            <img src="/logo-mark.png" alt="" width="35" height="38" className="h-[38px] w-auto dark:invert" />
          </a>

          <nav
            className="hidden xl:flex items-center h-11 rounded-full bg-sky-light/60 border border-link/40 ring-1 ring-link/10 px-1.5"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-1">
              {MOBILE_NAV.map(([l, h, Icon]) => {
                const on = active === h;
                return (
                  <li key={h}>
                    <a
                      href={pathOf(idOf(h))}
                      onClick={(e) => goTo(e, idOf(h))}
                      aria-current={on ? "page" : undefined}
                      className={`flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 rounded-full text-[15px] font-semibold whitespace-nowrap border transition-colors duration-150 ${
                        on
                          ? "bg-primary text-white border-sky-dark shadow-sm"
                          : "border-transparent text-ink-2 hover:text-link hover:bg-link/10"
                      }`}
                    >
                      <Icon size={16} strokeWidth={2} className="shrink-0" aria-hidden="true" />
                      {l}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 xl:justify-self-end">
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
            <InstallButton className="!px-3 !py-1.5 text-sm sm:text-base sm:!px-[15px] sm:!py-[6px]" />
          </div>
        </div>
      </header>

      {/* Mobile / tablet: floating pill tab bar */}
      <nav
        aria-label="Primary"
        className="xl:hidden fixed bottom-0 inset-x-0 z-[110] pointer-events-none px-3 pb-[max(12px,env(safe-area-inset-bottom))]"
      >
        <ul className="pointer-events-auto flex items-stretch justify-around gap-0.5 max-w-md mx-auto p-1.5 rounded-full bg-surface/90 backdrop-blur-md border border-link/40 ring-1 ring-link/10 shadow-[0_8px_30px_-8px_rgba(0,0,0,0.25)]">
          {MOBILE_NAV.map(([l, h, Icon, extra = "flex"]) => {
            const on = active === h;
            return (
              <li key={h} className={`flex-1 min-w-0 ${extra}`}>
                <a
                  href={pathOf(idOf(h))}
                  onClick={(e) => goTo(e, idOf(h))}
                  aria-current={on ? "page" : undefined}
                  className={`flex-1 min-w-0 flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-full border text-[10.5px] sm:text-[11px] font-semibold leading-tight transition-colors duration-150 ${
                    on ? "bg-primary text-white border-sky-dark shadow-sm" : "border-transparent text-ink-muted hover:text-link hover:bg-link/10"
                  }`}
                >
                  <Icon size={19} strokeWidth={on ? 2.25 : 1.9} aria-hidden="true" />
                  <span className="truncate max-w-full">{l}</span>
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
        const pulse = { "teach,": 1, track: 2, "ship.": 3 }[w] || 0; // soft highlight sweep
        return (
          <span key={i} aria-hidden="true">
            <span
              className={`hw inline-block ${isName ? "hw-name" : ""} ${isLast ? "relative" : ""}`}
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              {pulse ? (
                <span className="hw-pulse inline-block" style={{ animationDelay: `${2400 + pulse * 450}ms` }}>{w}</span>
              ) : (
                w
              )}
              {isLast && (
                <svg className="hw-line absolute left-0 -bottom-1 w-full h-3 text-link" viewBox="0 0 100 12" preserveAspectRatio="none" fill="none">
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
          <p className="inline-flex max-w-full items-center gap-2 text-sm text-ink-2 bg-emerald-500/10 border border-emerald-600/45 dark:border-emerald-400/50 rounded-full pl-2 pr-3 py-1">
            <span className="relative flex w-2 h-2">
              <span className="absolute inline-flex w-full h-full rounded-full bg-green-500 opacity-60 animate-ping" />
              <span className="relative inline-flex w-2 h-2 rounded-full bg-green-500" />
            </span>
            Open to work · Chattogram, Bangladesh
          </p>
          <AnimatedHeading />
          <p className="mt-6 max-w-xl text-lg sm:text-xl text-ink-muted leading-relaxed">
            Mohammad Hafizur Rahman Sakib — CSE graduate, full-stack developer and problem solver
            turning complicated ideas into calm, fast software.
          </p>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Roles">
            {ROLES.map((r) => (
              <li key={r} className="tag !text-sm !px-3 !py-1">{r}</li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="/projects" onClick={(e) => goTo(e, "projects")} className="btn-primary text-lg !px-5 !py-2.5">
              View projects <ArrowRight size={18} />
            </a>
            <a href={LINKS.cv} download className="btn-secondary text-lg !px-5 !py-2.5">
              <Download size={18} /> Download résumé
            </a>
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="btn-ghost !py-2.5">
              <GithubIcon /> GitHub
            </a>
          </div>
        </div>

        <div className="fig relative mx-auto w-full max-w-[560px]">
          <div className="absolute -inset-3 sm:-inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-sky-light via-surface to-tint" />
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
      <div className="wrap grid lg:grid-cols-[380px_1fr] gap-10 lg:gap-16 items-start lg:items-stretch">
        <Reveal className="mx-auto w-full max-w-[380px] lg:max-w-none">
          <div className="lg:h-full grid place-items-center">
            <div className="w-full max-w-[340px] rounded-full p-1 bg-gradient-to-br from-primary via-link/40 to-transparent">
              <img
                src={profile}
                alt="Portrait of Mohammad Hafizur Rahman Sakib"
                width="720"
                height="720"
                loading="lazy"
                className="w-full aspect-square object-cover rounded-full border-4 border-tint"
              />
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">About me</p>
            <h2 className="mt-2 text-4xl md:text-5xl">A developer who likes hard problems and simple interfaces.</h2>
            <p className="mt-5 text-lg text-ink-muted leading-relaxed max-w-2xl">
              I&apos;m a Computer Science &amp; Engineering graduate of Premier University, Chattogram. I build
              modern, scalable web apps with React, Next.js, Node.js and Tailwind CSS, backed by a strong
              foundation in data structures and algorithms — 550+ problems solved on LeetCode and Codeforces.
            </p>
            <p className="mt-4 text-lg text-ink-muted leading-relaxed max-w-2xl">
              Outside of code I teach, research NLP and ship tools for students and everyday users in Bangladesh.
            </p>
          </Reveal>
          <dl className="mt-8 grid sm:grid-cols-2 gap-4">
            {FACTS.map(([k, v, Icon], i) => (
              <Reveal key={k} delay={i * 60} className="card !p-5">
                <dt className="flex items-center gap-2.5 text-sm text-ink-muted">
                  <span className="grid place-items-center w-8 h-8 shrink-0 rounded-md bg-sky-light text-sky-dark">
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

function Focus() {
  return (
    <section className="section md:!py-16 lg:!py-20">
      <div className="wrap">
        {/* One clear section heading; the four items below use a quieter, numbered style */}
        <Reveal className="max-w-2xl">
          <p className="eyebrow">What I do</p>
          <h2 className="mt-2 text-4xl md:text-5xl">Four ways I put code to work.</h2>
          <p className="mt-4 text-lg text-ink-muted leading-relaxed">
            Shipping full-stack products, sharpening problem-solving, researching language data and
            deploying with care — here is where I can help most.
          </p>
        </Reveal>

        <div className="mt-12 md:mt-14 divide-y divide-line border-y border-line">
          {FOCUS.map(({ id, eyebrow, title, body, points, Figure, label }, i) => {
            const flip = i % 2 === 1;
            return (
              <div key={id} className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch py-12 md:py-14 lg:py-16">
                <Reveal className={`flex flex-col justify-center ${flip ? "lg:order-2" : ""}`}>
                  <div className="flex items-center gap-3">
                    <span className="grid place-items-center w-9 h-9 rounded-full bg-sky-light text-sky-dark text-sm font-bold tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="eyebrow">{eyebrow}</p>
                  </div>
                  <h3 className="mt-4 text-2xl md:text-3xl">{title}</h3>
                  <p className="mt-3 text-lg text-ink-muted leading-relaxed">{body}</p>
                  <ul className="mt-5 space-y-2.5">
                    {points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-base text-ink-2">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Reveal>
                {/* Figure box fills the text column's height (5:4 figure scales to it) */}
                <Reveal delay={100} className={`fig flex items-center justify-center ${flip ? "lg:order-1" : ""}`}>
                  <div className="w-full max-w-[500px] lg:max-w-full lg:w-auto lg:h-full lg:max-h-[420px] lg:min-h-[300px] aspect-[5/4]">
                    <Figure label={label} intensity={0.6} />
                  </div>
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
                  <TechTag key={s} name={s} />
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
            <Reveal key={p.title} delay={(i % 3) * 80} as="article" className="card proj-card !p-0 overflow-hidden flex flex-col group">
              <div className="proj-media relative aspect-[16/10] overflow-hidden bg-tint border-b border-line">
                <img
                  src={p.img}
                  alt={`${p.title} screenshot`}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 ease-notion group-hover:scale-[1.08]"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <p className="text-xs font-medium text-link">{p.kind}</p>
                <h3 className="mt-1 text-2xl transition-colors duration-300 group-hover:text-link">{p.title}</h3>
                <p className="mt-3 text-sm text-ink-muted leading-relaxed flex-1">{p.desc}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Tech stack">
                  {p.tags.map((t) => (
                    <TechTag key={t} name={t} />
                  ))}
                </ul>
                <div className="mt-5 flex items-center gap-4 text-sm font-medium">
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-link hover:underline inline-flex items-center gap-1.5">
                    <Globe size={15} /> Live demo <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </a>
                  <a href={p.code} target="_blank" rel="noopener noreferrer" className="text-ink hover:underline inline-flex items-center gap-1.5">
                    <GithubIcon width={15} height={15} /> Source
                  </a>
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
                <div className="text-4xl md:text-5xl font-bold tracking-tight text-link">{n}</div>
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
          <span className="absolute -left-[13px] top-0.5 grid place-items-center w-[26px] h-[26px] rounded-full bg-sky-light text-sky-dark ring-4 ring-surface">
            <Icon size={14} />
          </span>
          <p className="text-sm text-ink-muted">{when}</p>
          <h3 className="text-xl mt-0.5">{role || title}</h3>
          <p className="text-base text-link font-medium">{org}</p>
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
        <div className="grid lg:grid-cols-[1fr_320px] gap-8 lg:gap-12 items-center">
          <SectionHead
            eyebrow="Education"
            title="Learning, formally and otherwise."
            sub="A CSE degree at the core, extended by courses and bootcamps along the way."
          />
          <Reveal className="fig mx-auto w-full max-w-[280px] lg:max-w-[320px]">
            <Cabinet intensity={0.6} label="A filing cabinet with drawers. The pointer's height picks a drawer." />
          </Reveal>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <Reveal className="card !p-7 sm:!p-8 flex flex-col">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-md bg-sky-light text-sky-dark">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl leading-tight">Academic path</h3>
                <p className="text-sm text-ink-muted">Degrees &amp; schooling</p>
              </div>
            </div>
            <div className="mt-8">
              <Timeline items={EDU} Icon={GraduationCap} />
            </div>
          </Reveal>

          <Reveal delay={80} className="card !p-7 sm:!p-8 flex flex-col">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-md bg-sky-light text-sky-dark">
                <ListChecks size={20} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="text-2xl leading-tight">Courses &amp; certificates</h3>
                <p className="text-sm text-ink-muted">{CERTS.length} completed</p>
              </div>
            </div>
            <ul className="mt-5 flex-1 flex flex-col">
              {CERTS.map(({ title, provider, year, url }) => (
                <li key={title} className="border-b border-line last:border-b-0">
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 -mx-3 px-3 py-3.5 rounded-md transition-colors hover:bg-sky-light/50"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <BookOpen size={16} aria-hidden="true" className="shrink-0 text-ink-ghost transition-colors group-hover:text-link" />
                      <span className="text-base text-ink-2 leading-snug transition-colors group-hover:text-link">{title}</span>
                      <ExternalLink size={13} aria-hidden="true" className="shrink-0 text-link opacity-0 transition-opacity group-hover:opacity-100" />
                    </span>
                    <span className="flex items-center gap-2 pl-[26px] sm:pl-0 shrink-0 text-sm text-ink-muted">
                      <span className="italic">{provider}</span>
                      <span className="tag !text-xs !px-2.5 !py-0.5 whitespace-nowrap tabular-nums">{year}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || "fa7f8ec7-a4a8-424b-8efd-9b6387755682";
const EMPTY = { name: "", email: "", subject: "", message: "" };

/** Form field with a leading icon that lights up on focus. */
function IconField({ Icon, top = false, children }) {
  return (
    <div className="group relative">
      <Icon
        size={16}
        aria-hidden="true"
        className={`pointer-events-none absolute left-3 text-ink-ghost transition-colors duration-150 group-focus-within:text-link ${
          top ? "top-3.5" : "top-1/2 -translate-y-1/2"
        }`}
      />
      {children}
    </div>
  );
}

/** Centered, blurred-backdrop confirmation shown after a message is sent. */
function SentModal({ open, onClose, onAnother }) {
  const btnRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    btnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div
      className="sent-backdrop fixed inset-0 z-[200] grid place-items-center p-4 bg-ink/30 backdrop-blur-md"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sent-title"
        className="sent-card relative w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-surface px-7 pt-10 pb-7 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
      >
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-link/25 blur-3xl" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 grid place-items-center w-8 h-8 rounded-full text-ink-muted hover:text-ink hover:bg-tint transition-colors"
        >
          <CloseIcon size={17} />
        </button>

        <div className="relative mx-auto grid place-items-center w-20 h-20">
          <span aria-hidden="true" className="sent-ring absolute inset-0 rounded-full bg-link/20" />
          <span className="sent-pop relative grid place-items-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-link text-white shadow-[0_10px_30px_-8px_rgb(var(--primary)/0.7)]">
            <svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path className="sent-tick" d="M5 12.5l4.5 4.5L19 7.5" pathLength="1" />
            </svg>
          </span>
        </div>

        <h3 id="sent-title" className="relative mt-6 text-3xl">Message sent!</h3>
        <p className="relative mt-2 text-ink-muted leading-relaxed">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>

        <div className="relative mt-7 flex flex-col gap-2.5">
          <button
            ref={btnRef}
            type="button"
            onClick={onAnother}
            className="btn-primary !rounded-full !py-3 text-base w-full justify-center transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <PenLine size={17} aria-hidden="true" /> Send another
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full py-2.5 text-sm font-medium text-ink-muted hover:text-ink hover:bg-tint transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

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
    "w-full bg-surface border border-line rounded-sm px-3 py-2.5 text-base placeholder:text-ink-ghost transition-shadow duration-150 focus:outline-none focus:shadow-focus focus:border-primary disabled:bg-tint";
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
            <a href={`mailto:${EMAIL}`} className="mt-2 inline-flex items-center gap-2 text-link font-medium hover:underline break-all">
              <Mail size={16} className="shrink-0" /> {EMAIL}
            </a>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map(([n, h]) => (
                <li key={n}>
                  <a
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tag inline-flex items-center gap-2 !text-sm !px-3 !py-1.5 !border-ink-ghost/50 hover:!border-link hover:bg-hover/60 transition-colors"
                  >
                    <BrandIcon def={SOCIAL_ICONS[n]} size={15} />
                    {n} <span aria-hidden="true" className="text-ink-ghost">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-12 lg:p-14 bg-surface border-t lg:border-t-0 lg:border-l border-line">
            <div className="fig mx-auto w-full max-w-[220px] -mt-2 mb-3">
              <Plug intensity={0.7} label="A plug on its cord. Move the pointer to draw it toward the socket." />
            </div>

              <form onSubmit={submit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="c-name" className={label}>Name</label>
                    <IconField Icon={User}>
                      <input id="c-name" required autoComplete="name" className={`${field} pl-10`} placeholder="Your name" value={form.name} onChange={set("name")} disabled={state === "loading"} />
                    </IconField>
                  </div>
                  <div>
                    <label htmlFor="c-email" className={label}>Email</label>
                    <IconField Icon={AtSign}>
                      <input id="c-email" type="email" required autoComplete="email" className={`${field} pl-10`} placeholder="you@example.com" value={form.email} onChange={set("email")} disabled={state === "loading"} />
                    </IconField>
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className={label}>Subject</label>
                  <IconField Icon={PenLine}>
                    <input id="c-subject" className={`${field} pl-10`} placeholder="What's it about?" value={form.subject} onChange={set("subject")} disabled={state === "loading"} />
                  </IconField>
                </div>
                <div>
                  <label htmlFor="c-msg" className={label}>Message</label>
                  <IconField Icon={MessageSquareText} top>
                    <textarea id="c-msg" required rows={5} className={`${field} pl-10 resize-none`} placeholder="Tell me about your idea…" value={form.message} onChange={set("message")} disabled={state === "loading"} />
                  </IconField>
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
          </div>
        </Reveal>
        <SentModal
          open={state === "success"}
          onClose={() => setState("idle")}
          onAnother={() => {
            setState("idle");
            setTimeout(() => document.getElementById("c-name")?.focus({ preventScroll: false }), 50);
          }}
        />
      </div>
    </section>
  );
}

function Footer() {
  const pill =
    "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-line bg-surface/70 text-sm font-medium text-ink-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-link hover:border-link/50 hover:bg-sky-light/60";
  return (
    <footer className="relative border-t border-line bg-tint px-4 sm:px-10 pt-6 pb-[calc(96px+env(safe-area-inset-bottom))] xl:py-6">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-link/60 to-transparent"
      />
      <div className="wrap flex flex-col xl:flex-row items-center justify-between gap-4 text-sm text-ink-muted">
        <p className="flex flex-wrap items-center justify-center gap-x-1.5 text-center">
          <span>© {new Date().getFullYear()}</span>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            title="Open Sakib's GitHub"
            className="font-semibold text-ink underline decoration-link/0 decoration-2 underline-offset-4 transition-colors duration-200 hover:text-link hover:decoration-link"
          >
            Mohammad Hafizur Rahman Sakib
          </a>
          <span className="inline-flex items-center gap-1.5">
            <span aria-hidden="true" className="w-1 h-1 rounded-full bg-link/70" />
            Chattogram, Bangladesh
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className={pill}>
            <GithubIcon width={16} height={16} /> GitHub
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
            <FaLinkedin size={16} aria-hidden="true" /> LinkedIn
          </a>
          <a href="/" onClick={(e) => goTo(e, "home")} className={pill}>
            Back to top <ArrowUp size={15} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

const PRINCIPLES = [
  { Figure: Format, title: "Clean code", text: "Readable, consistent and formatted — every line snaps square to its indent.", label: "A file of crooked lines that snap square under the pointer" },
  { Figure: Loupe, title: "Eye for detail", text: "Edge cases, spacing, states — the small things users feel but never name.", label: "A loupe magnifying ruled lines" },
  { Figure: Rebuild, title: "Built to scale", text: "Modular pieces that rebuild cleanly when one dependency changes.", label: "A tree of packages that rise together" },
  { Figure: Vault, intensity: 0.15, title: "Secure by default", text: "JWT auth, role-based access and safe payments with Stripe.", label: "A vault door whose dial turns with the pointer until the bolts draw back" },
];

function Principles() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow="How I work" title="Principles behind every build." />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRINCIPLES.map(({ Figure, intensity = 0.6, title, text, label }, i) => (
            <Reveal key={title} delay={(i % 4) * 70} className="card flex flex-col !p-5">
              <div className="fig mx-auto w-full max-w-[240px]">
                <Figure intensity={intensity} label={label} />
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
          <div className="absolute -inset-3 sm:-inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-sky-light via-surface to-tint" />
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
            <a href="/projects" className="btn-secondary text-lg !px-5 !py-2.5">View projects <ArrowRight size={18} /></a>
            <a href="/contact" className="btn-ghost !py-2.5">Contact</a>
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
    <div className="fixed inset-0 z-[300] grid place-items-end sm:place-items-center bg-black/40 dark:bg-black/60 p-4" role="dialog" aria-modal="true" aria-label="Install on iPhone" onClick={() => setIosHelp(false)}>
      <div className="card w-full max-w-sm !p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between">
          <h3 className="text-xl">Install on your iPhone</h3>
          <button aria-label="Close" onClick={() => setIosHelp(false)} className="p-1 -m-1 rounded-sm hover:bg-hover/60"><X size={18} /></button>
        </div>
        <ol className="mt-4 space-y-3 text-base text-ink-2">
          <li className="flex items-center gap-3"><Share size={18} className="text-link shrink-0" /> Tap the <strong>Share</strong> button in Safari.</li>
          <li className="flex items-center gap-3"><SquarePlus size={18} className="text-link shrink-0" /> Choose <strong>Add to Home Screen</strong>.</li>
          <li className="flex items-center gap-3"><Download size={18} className="text-link shrink-0" /> Tap <strong>Add</strong> — done.</li>
        </ol>
      </div>
    </div>
  );
}

const KNOWN_PATHS = ["/", "/index.html", ...SECTION_PATHS.filter((x) => x !== "home").map((x) => `/${x}`)];

export default function App() {
  const known = KNOWN_PATHS.includes(window.location.pathname.replace(/(.)\/+$/, "$1"));
  useSectionRouting();
  if (!known) return <NotFound />;
  return (
    <PwaProvider>
      <Nav />
      <main className="xl:pb-0">
        <Hero />
        <About />
        <Focus />
        <Skills />
        <Principles />
        <Projects />
        <Numbers />
        <Experience />
        <Education />
        <Contact />
      </main>
      <Footer />
      <IosHelp />
    </PwaProvider>
  );
}
