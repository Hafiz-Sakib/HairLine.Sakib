import { Query } from "@lucasmarkes/hairline/react";
import { ArrowRight, House } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[100dvh] grid place-items-center px-4 py-12">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 md:gap-14 items-center">
        <div className="fig mx-auto w-full max-w-[360px] md:order-2 relative">
          <div className="absolute -inset-3 sm:-inset-6 -z-10 rounded-[28px] bg-gradient-to-br from-sky-light via-surface to-tint" />
          <Query
            intensity={0.7}
            play
            label="A question mark whose hook turns toward the pointer and a loose ball rolling after it."
          />
        </div>
        <div className="text-center md:text-left md:order-1">
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-2 text-5xl sm:text-6xl">
            This page took a wrong turn.
          </h1>
          <p className="mt-4 text-lg text-ink-muted leading-relaxed">
            The page{" "}
            <code className="font-mono text-base bg-tint border border-line rounded-sm px-1.5 py-0.5 break-all">
              {window.location.pathname}
            </code>{" "}
            doesn&apos;t exist — maybe the link is old, or the address has a
            typo.
          </p>
          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">
            <a href="/" className="btn-primary text-lg !px-5 !py-2.5">
              <House size={18} /> Back to home
            </a>
            <a href="/projects" className="btn-secondary text-lg !px-5 !py-2.5">
              View projects <ArrowRight size={18} />
            </a>
            <a href="/contact" className="btn-ghost !py-2.5">
              Contact
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
