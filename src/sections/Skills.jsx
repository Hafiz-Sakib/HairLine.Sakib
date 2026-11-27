import { Keyboard } from "@lucasmarkes/hairline/react";
import {
  Brain,
  Cloud,
  Code,
  Database,
  LayoutDashboard,
  Trophy,
  Workflow,
  Wrench,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import TechTag from "@/components/TechTag";

const SKILLS = [
  {
    Icon: Code,
    title: "Languages",
    items: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "Dart"],
  },
  {
    Icon: LayoutDashboard,
    title: "Frontend",
    items: ["React", "Next.js", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    Icon: Database,
    title: "Backend & Database",
    items: [
      "Node.js",
      "Express.js",
      "Firebase",
      "Supabase",
      "MongoDB",
      "PostgreSQL",
      "REST APIs",
    ],
  },
  {
    Icon: Trophy,
    title: "Competitive Programming",
    items: ["Codeforces", "CSES", "Problem Solving", "C++", "Algorithms"],
  },
  {
    Icon: Workflow,
    title: "DSA",
    items: [
      "Dynamic Programming",
      "Graph Theory",
      "Binary Search",
      "STL",
      "Number Theory",
    ],
  },
  {
    Icon: Brain,
    title: "Machine Learning",
    items: ["Neural Networks", "LSTM", "NLP", "Pandas", "Jupyter"],
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "Git", "Linux", "Vercel", "CI/CD"],
  },
  {
    Icon: Wrench,
    title: "Tools & Design",
    items: ["Figma", "VS Code", "GitHub", "Vite", "Redux", "LaTeX"],
  },
];

export default function Skills() {
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
            <Keyboard
              intensity={0.6}
              label="A sixty-key keyboard. The key under the pointer sinks."
            />
          </Reveal>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SKILLS.map(({ Icon, title, items }, i) => (
            <Reveal
              key={title}
              delay={(i % 4) * 70}
              className="card flex flex-col"
            >
              <span className="grid place-items-center w-10 h-10 rounded-md bg-sky-light text-sky-dark ico-pop">
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
