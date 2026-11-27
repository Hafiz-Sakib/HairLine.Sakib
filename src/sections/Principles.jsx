import { Format, Loupe, Rebuild, Vault } from "@lucasmarkes/hairline/react";
import Reveal from "@/components/Reveal";
import SectionHead from "@/components/SectionHead";

const PRINCIPLES = [
  {
    Figure: Format,
    title: "Clean code",
    text: "Readable, consistent and formatted — every line snaps square to its indent.",
    label: "A file of crooked lines that snap square under the pointer",
  },
  {
    Figure: Loupe,
    title: "Eye for detail",
    text: "Edge cases, spacing, states — the small things users feel but never name.",
    label: "A loupe magnifying ruled lines",
  },
  {
    Figure: Rebuild,
    title: "Built to scale",
    text: "Modular pieces that rebuild cleanly when one dependency changes.",
    label: "A tree of packages that rise together",
  },
  {
    Figure: Vault,
    intensity: 0.15,
    title: "Secure by default",
    text: "JWT auth, role-based access and safe payments with Stripe.",
    label:
      "A vault door whose dial turns with the pointer until the bolts draw back",
  },
];

export default function Principles() {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead
          eyebrow="How I work"
          title="Principles behind every build."
        />
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PRINCIPLES.map(
            ({ Figure, intensity = 0.6, title, text, label }, i) => (
              <Reveal
                key={title}
                delay={(i % 4) * 70}
                className="card flex flex-col !p-5"
              >
                <div className="fig mx-auto w-full max-w-[240px]">
                  <Figure intensity={intensity} label={label} />
                </div>
                <h3 className="mt-3 text-xl">{title}</h3>
                <p className="mt-2 text-sm text-ink-muted leading-relaxed">
                  {text}
                </p>
              </Reveal>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
