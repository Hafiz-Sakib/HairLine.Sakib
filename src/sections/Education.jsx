import { Cabinet } from "@lucasmarkes/hairline/react";
import {
  BookOpen,
  ExternalLink,
  FileText,
  GraduationCap,
  ListChecks,
  Mic,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";
import Timeline from "@/components/Timeline";

const EDU = [
  {
    when: "Graduated",
    title: "B.Sc. in Computer Science & Engineering",
    org: "Premier University, Chittagong",
    text: "Software engineering, algorithms and full-stack development, with an undergraduate thesis on Natural Language Processing (NLP) focused on the Bengali language.",
  },
  {
    when: "HSC",
    title: "Higher Secondary Certificate",
    org: "Govt. Hazi Mohammad Mohsin College",
    text: "",
  },
  {
    when: "SSC",
    title: "Secondary School Certificate",
    org: "Govt. Muslim High School",
    text: "",
  },
];

const CERTS = [
  {
    title: "Supervised Machine Learning: Regression and Classification",
    provider: "Coursera",
    year: "2025",
    url: "https://www.coursera.org/learn/machine-learning",
  },
  {
    title: "Complete Data Science, Machine Learning, DL, NLP Bootcamp",
    provider: "Udemy",
    year: "2024",
    url: "https://www.udemy.com/course/complete-machine-learning-nlp-bootcamp-mlops-deployment/",
  },
  {
    title: "Number Theory Fundamentals",
    provider: "Udemy",
    year: "2023",
    url: "https://www.udemy.com/course/number-theory-fundamentals/",
  },
  {
    title: "Problem Solving (Basic) Certificate",
    provider: "HackerRank",
    year: "2022",
    url: "https://www.hackerrank.com/certificates/96a1aa85c641",
  },
  {
    title: "Problem Solving (Intermediate) Certificate",
    provider: "HackerRank",
    year: "2022",
    url: "https://www.hackerrank.com/certificates/f293a98f33f8",
  },
  {
    title: "Python Complete Course For Python Beginners",
    provider: "Udemy",
    year: "2022",
    url: "https://www.udemy.com/course/python-complete-course-for-beginners/",
  },
  {
    title: "Full Stack Web Development (Batch 5)",
    provider: "Programming Hero",
    year: "2021 – 2022",
    url: "https://web.programming-hero.com/course-details",
  },
];

const PUBS = [
  {
    title:
      "AgentGuard: A Runtime Security Framework for Detecting and Mitigating Prompt Injection Attacks in Agentic AI Systems",
    venue:
      "29th International Conference on Computer and Information Technology (IEEE ICCIT 2026)",
    year: "2026",
    desc: "AgentGuard is runtime security middleware that detects and mitigates prompt injection across inputs, memory, tools and RAG in agentic AI systems. Tested on seven platforms and 6,708 cases, it reached 86.2% defense success rate, F1 0.891 and AUROC 0.924 at only 4.7% latency cost.",
    category: "Conference Paper",
    where: "Cox’s Bazar, Bangladesh · 18–20 Dec 2026 · Hybrid",
    about:
      "ICCIT is the longest-running IEEE-sponsored peer-reviewed conference in Bangladesh. The 29th edition is organized by the IEEE Bangladesh Section in Cox’s Bazar, 18–20 December 2026, in hybrid mode.",
    status: "Accepted",
    mode: "Oral presentation",
    paperId: "Paper ID 3214",
    url: "https://iccit.org.bd/",
  },
];

export default function Education() {
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
            <Cabinet
              intensity={0.6}
              label="A filing cabinet with drawers. The pointer's height picks a drawer."
            />
          </Reveal>
        </div>

        <div className="mt-12 grid lg:grid-cols-2 gap-6 lg:gap-8 items-stretch">
          <Reveal className="card !p-7 sm:!p-8 flex flex-col order-1">
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-md bg-sky-light text-sky-dark ico-pop">
                <GraduationCap size={20} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-2xl leading-tight">Academic path</h3>
                <p className="text-sm text-ink-muted">
                  Degrees &amp; schooling
                </p>
              </div>
            </div>
            <div className="mt-8">
              <Timeline items={EDU} Icon={GraduationCap} />
            </div>
          </Reveal>

          <Reveal
            delay={80}
            className="card !p-7 sm:!p-8 flex flex-col order-3 lg:order-2"
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-md bg-sky-light text-sky-dark ico-pop">
                <ListChecks size={20} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="text-2xl leading-tight">
                  Courses &amp; certificates
                </h3>
                <p className="text-sm text-ink-muted">
                  {CERTS.length} completed
                </p>
              </div>
            </div>
            <ul className="mt-5 flex-1 flex flex-col">
              {CERTS.map(({ title, provider, year, url }) => (
                <li
                  key={title}
                  className="border-b border-line last:border-b-0"
                >
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-4 -mx-3 px-3 py-3.5 rounded-md transition-colors hover:bg-sky-light/50"
                  >
                    <span className="flex items-center gap-2.5 min-w-0">
                      <BookOpen
                        size={16}
                        aria-hidden="true"
                        className="shrink-0 text-ink-ghost transition-colors group-hover:text-link"
                      />
                      <span className="text-base text-ink-2 leading-snug transition-colors group-hover:text-link">
                        {title}
                      </span>
                      <ExternalLink
                        size={13}
                        aria-hidden="true"
                        className="shrink-0 text-link opacity-0 transition-opacity group-hover:opacity-100"
                      />
                    </span>
                    <span className="flex items-center gap-2 pl-[26px] sm:pl-0 shrink-0 text-sm text-ink-muted">
                      <span className="italic">{provider}</span>
                      <span className="tag !text-xs !px-2.5 !py-0.5 whitespace-nowrap tabular-nums">
                        {year}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal
            delay={120}
            className="card !p-7 sm:!p-8 flex flex-col order-2 lg:order-3 lg:col-span-2"
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-10 h-10 rounded-md bg-sky-light text-sky-dark ico-pop">
                <FileText size={20} aria-hidden="true" />
              </span>
              <div className="flex-1">
                <h3 className="text-2xl leading-tight">
                  Research &amp; Publications
                </h3>
                <p className="text-sm text-ink-muted">{PUBS.length} accepted</p>
              </div>
            </div>
            <ul className="mt-5 flex flex-col">
              {PUBS.map(
                ({
                  title,
                  venue,
                  desc,
                  category,
                  where,
                  about,
                  year,
                  status,
                  mode,
                  paperId,
                  url,
                }) => (
                  <li
                    key={title}
                    className="border-b border-line last:border-b-0"
                  >
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-2 -mx-3 px-3 py-3.5 rounded-md transition-colors hover:bg-sky-light/50"
                    >
                      <span className="flex items-start gap-2.5 min-w-0">
                        <FileText
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 mt-1 text-ink-ghost transition-colors group-hover:text-link"
                        />
                        <span className="text-base text-ink-2 leading-snug transition-colors group-hover:text-link">
                          {title}
                        </span>
                        <ExternalLink
                          size={13}
                          aria-hidden="true"
                          className="shrink-0 mt-1.5 text-link opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </span>
                      <span className="pl-[26px] text-sm text-ink-muted italic">
                        {venue}
                      </span>
                      <span className="pl-[26px] text-base text-ink-muted leading-relaxed">
                        {desc}
                      </span>
                      <span className="pl-[26px] text-sm text-ink-muted leading-relaxed">
                        {about}
                      </span>
                      <span className="pl-[26px] text-sm text-link font-medium">
                        {where}
                      </span>
                      <span className="flex flex-wrap items-center gap-2 pl-[26px]">
                        <span className="tag !text-xs !px-2.5 !py-0.5 whitespace-nowrap">
                          {category}
                        </span>
                        <span className="tag !text-xs !px-2.5 !py-0.5 whitespace-nowrap">
                          {status}
                        </span>
                        <span className="tag !text-xs !px-2.5 !py-0.5 whitespace-nowrap inline-flex items-center gap-1">
                          <Mic size={11} aria-hidden="true" />
                          {mode}
                        </span>
                        <span className="tag !text-xs !px-2.5 !py-0.5 whitespace-nowrap">
                          {paperId}
                        </span>
                        <span className="tag !text-xs !px-2.5 !py-0.5 whitespace-nowrap tabular-nums">
                          {year}
                        </span>
                      </span>
                    </a>
                  </li>
                ),
              )}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
