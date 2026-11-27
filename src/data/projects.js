import algoviz from "@/assets/algoviz.jpg";
import bagsq from "@/assets/bagsq.jpg";
import blood from "@/assets/blood.jpg";
import bpdb from "@/assets/bpdb.jpg";
import cp from "@/assets/cp.jpg";
import fifa from "@/assets/fifa.jpg";
import nikah from "@/assets/nikah.jpg";
import nova from "@/assets/nova.jpg";
import numbersystem from "@/assets/number-system.jpg";
import odyssey from "@/assets/odyssey.jpg";
import sababa from "@/assets/sababa.jpg";
import subcalc from "@/assets/subcalc.jpg";

export const PROJECTS = [
  {
    title: "Number System",
    kind: "Interactive learning app",
    img: numbersystem,
    desc: "An interactive HSC ICT study companion for number conversion, complements, Boolean algebra and logic gates, with step-by-step solutions and an offline PWA.",
    points: [
      "Number conversion and arithmetic across binary, octal, decimal and hexadecimal",
      "Boolean algebra tools: truth tables, De Morgan's laws and Quine–McCluskey",
    ],
    tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Three.js", "PWA"],
    demo: "https://ictlogic.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/Number-System",
  },
  {
    title: "Nikah Community Center",
    kind: "Booking platform",
    img: nikah,
    desc: "A full-stack booking system for a Chattogram wedding venue: live availability, advance payments, PDF invoices and an admin dashboard.",
    points: [
      "Live availability with database-level double-booking prevention",
      "Advance payments via bKash, Nagad, bank or card with PDF invoices",
    ],
    tags: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "Supabase",
    ],
    demo: "https://nikah-convention.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/Nikah-Community-Center",
  },
  {
    title: "CP Pathshala",
    kind: "Education PWA",
    img: cp,
    desc: "An offline-capable PWA teaching C++ competitive programming in simple Bangla, with compiler-verified code and visualisations.",
    points: [
      "144 lessons, 200 runnable C++ examples across 5 learning tracks, 100% Bangla",
      "Interactive widgets: Bit Playground, animated Sieve, BFS/DFS and binary counter",
    ],
    tags: ["React 18", "Vite", "Tailwind CSS", "PWA", "Python", "C++"],
    demo: "https://cp-pathshala.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/CP-Pathshala",
  },
  {
    title: "AlgoViz",
    kind: "Visualizer",
    img: algoviz,
    desc: "An algorithm visualizer with 60+ algorithms, step-by-step playback and a live C++ code panel.",
    points: [
      "60+ algorithms across 11 categories with frame-by-frame generator playback",
      "Live C++ STL code panel with syntax highlighting and active-line tracking",
    ],
    tags: [
      "React 19",
      "TypeScript",
      "Three.js",
      "Tailwind CSS v4",
      "Framer Motion",
      "shadcn/ui",
    ],
    demo: "https://algorithm-hunter.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/algorithm-visualizer",
  },
  {
    title: "NOVA MathPlot",
    kind: "Scientific tool",
    img: nova,
    desc: "A browser-based math platform for 2D/3D function plotting, parametric curves and a neural activation function explorer.",
    points: [
      "60+ 3D surface presets across Topology, Attractors, Fractals, Minimal Surfaces & more",
      "17 neural network activation functions with derivative overlay and coordinate tooltip",
    ],
    tags: [
      "React 18",
      "Three.js",
      "React Three Fiber",
      "Math.js",
      "Tailwind CSS",
      "Framer Motion",
    ],
    demo: "https://nova-mathplot.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/nova-mathplot",
  },
  {
    title: "SubCalc Pro",
    kind: "Networking tool",
    img: subcalc,
    desc: "An IPv4 subnetting and network planning toolkit with real-time calculations and visual breakdowns.",
    points: [
      "FLSM & VLSM subnetting with step-by-step breakdown",
      "Subnet overlap detection and CIDR expansion",
    ],
    tags: ["React", "Tailwind CSS", "IPv4", "FLSM", "VLSM", "Networking"],
    demo: "https://subcalc-pro.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/SubCalc-Pro",
  },
  {
    title: "FIFA World Cup 2026",
    kind: "Sports tracker",
    img: fifa,
    desc: "A responsive World Cup 2026 fixture tracker with match times in Bangladesh time, predictors, squads and a quiz.",
    points: [
      "Fixtures browser by team or date with animated countdown to tournament start",
      "Score predictor, winner predictor, and 20-question World Cup quiz",
    ],
    tags: ["React", "Tailwind CSS", "React Router", "FIFA", "Football", "BST"],
    demo: "https://fifa26bd.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/fifa-wc-2026",
  },
  {
    title: "BPDB Token Helper",
    kind: "Utility · Bengali UI",
    img: bpdb,
    desc: "A Bengali React app that helps prepaid meter users enter 20-digit BPDB tokens step by step, parsing the token SMS automatically.",
    points: [
      "Smart SMS parser extracts all 20-digit tokens automatically with digit grouping",
      "Step-by-step token entry with visual progress tracking and billing breakdown",
    ],
    tags: [
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "Bengali",
      "BPDB",
      "Bangladesh",
    ],
    demo: "https://bpdb-token-helper.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/BPDB-token-helper",
  },
  {
    title: "Sababa Tours",
    kind: "Travel platform",
    img: sababa,
    desc: "A luxury travel platform for curated Bangladesh journeys with real-time filtering, Firebase auth and a booking flow.",
    points: [
      "Interactive travel packages with dynamic search and filtering",
      "Luxury responsive UI with smooth animations and premium effects",
    ],
    tags: [
      "React",
      "Tailwind CSS",
      "Firebase",
      "React Router",
      "Travel Website",
      "Luxury UI",
    ],
    demo: "https://sababa-tours.vercel.app/",
    code: "https://github.com/Hafiz-Sakib/Sababa-Tours",
  },
  {
    title: "BagsQ",
    kind: "SaaS dashboard",
    img: bagsq,
    desc: "A workshop workflow system that streamlines customer intake and job tracking for repair and service businesses.",
    points: [
      "One-click customer management and job card creation",
      "Automated service reminders and status notifications",
    ],
    tags: [
      "Next.js",
      "Tailwind CSS",
      "MySQL",
      "Node.js",
      "Express.js",
      "Stripe",
    ],
    demo: "https://bagsq12.web.app/",
    code: "https://github.com/emonmorol/bagsq-client",
  },
  {
    title: "Odyssey Travel Agency",
    kind: "Full-stack web app",
    img: odyssey,
    desc: "A travel agency platform to browse global packages, customise flights and hotels, and pay securely.",
    points: [
      "Multi-country package browser with search & filters",
      "Stripe-integrated secure checkout with booking history",
    ],
    tags: [
      "Next.js",
      "Tailwind CSS",
      "MySQL",
      "Node.js",
      "Express.js",
      "Stripe",
    ],
    demo: "https://github.com/ArnabShikder24/odyssey-travel-client",
    code: "https://github.com/ArnabShikder24/odyssey-travel-client",
  },
  {
    title: "Blood Donation Management",
    kind: "Community platform",
    img: blood,
    desc: "A community platform connecting blood donors with recipients by group and location, secured with JWT auth.",
    points: [
      "Donor registration with blood group & location mapping",
      "Real-time request board with urgency tagging",
    ],
    tags: ["Next.js", "Tailwind CSS", "MySQL", "Node.js", "Express.js", "JWT"],
    demo: "https://blood-buddies-donation.web.app/",
    code: "https://github.com/emonmorol/blood_boddies",
  },
];
