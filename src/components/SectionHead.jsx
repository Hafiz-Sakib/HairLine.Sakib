import Reveal from "@/components/Reveal";

export default function SectionHead({ eyebrow, title, sub, children }) {
  return (
    <Reveal className="flex flex-wrap items-end justify-between gap-6">
      <div className="max-w-2xl">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-2 text-4xl md:text-5xl">{title}</h2>
        {sub && (
          <p className="mt-4 text-lg text-ink-muted leading-relaxed">{sub}</p>
        )}
      </div>
      {children}
    </Reveal>
  );
}
