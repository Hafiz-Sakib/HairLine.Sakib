import { ArrowUp } from "lucide-react";
import { FaLinkedin } from "react-icons/fa";
import GithubIcon from "@/components/GithubIcon";
import { LINKS } from "@/data/site";
import { socStyle } from "@/data/tech";
import { goTo } from "@/lib/routing";

export default function Footer() {
  const pill =
    "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-line bg-surface/70 text-sm font-medium text-ink-2 transition-all duration-200 hover:-translate-y-0.5 hover:text-link hover:border-link/50 hover:bg-sky-light/60";
  const brand =
    "inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full border border-line bg-surface/70 text-sm font-medium text-ink-2 soc";
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
            <span
              aria-hidden="true"
              className="w-1 h-1 rounded-full bg-link/70"
            />
            Chattogram, Bangladesh
          </span>
        </p>
        <div className="flex flex-wrap items-center justify-center gap-2">
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={brand}
            style={socStyle("GitHub")}
          >
            <GithubIcon width={16} height={16} /> GitHub
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={brand}
            style={socStyle("LinkedIn")}
          >
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
