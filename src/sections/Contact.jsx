import { useState } from "react";
import { Plug } from "@lucasmarkes/hairline/react";
import {
  AtSign,
  CircleAlert,
  LoaderCircle,
  Mail,
  MapPin,
  MessageSquareText,
  PenLine,
  Send,
  User,
} from "lucide-react";
import BrandIcon from "@/components/BrandIcon";
import IconField from "@/components/IconField";
import Reveal from "@/components/Reveal";
import SentModal from "@/components/SentModal";
import { EMAIL, LINKS } from "@/data/site";
import { SOCIAL_ICONS, socStyle } from "@/data/tech";

const SOCIALS = [
  ["GitHub", LINKS.github],
  ["LinkedIn", LINKS.linkedin],
  ["Facebook", LINKS.facebook],
  ["X", LINKS.x],
  ["Instagram", LINKS.instagram],
];

const WEB3FORMS_KEY =
  import.meta.env.VITE_WEB3FORMS_KEY || "fa7f8ec7-a4a8-424b-8efd-9b6387755682";
const EMPTY = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
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
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body,
      });
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
    "w-full bg-surface border border-line rounded-xl px-3 py-2.5 text-base placeholder:text-ink-ghost transition-[box-shadow,border-color,transform] duration-200 hover:border-ink-ghost focus:-translate-y-px focus:outline-none focus:shadow-focus focus:border-primary disabled:bg-tint";
  const label = "block text-sm font-medium text-ink-2 mb-1";

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal
          from="scale"
          className="glow rounded-[28px] bg-tint border border-line overflow-hidden grid lg:grid-cols-2 items-stretch shadow-card"
        >
          <div className="p-6 sm:p-12 lg:p-14 flex flex-col justify-center">
            <p className="eyebrow">Contact</p>
            <h2 className="mt-2 text-4xl md:text-5xl">
              Have a product to build? Plug me in.
            </h2>
            <p className="mt-4 text-lg text-ink-muted max-w-md leading-relaxed">
              Internships, freelance builds or research collaboration — I reply
              fast.
            </p>
            <p className="mt-6 flex items-center gap-2 text-ink-2">
              <MapPin size={16} /> Chattogram, Bangladesh
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-2 inline-flex items-center gap-2 text-link font-medium hover:underline break-all"
            >
              <Mail size={16} className="shrink-0" /> {EMAIL}
            </a>
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIALS.map(([n, h]) => (
                <li key={n}>
                  <a
                    href={h}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tag soc inline-flex items-center gap-2 !text-sm !px-3 !py-1.5 !border-ink-ghost/50"
                    style={socStyle(n)}
                  >
                    <BrandIcon def={SOCIAL_ICONS[n]} size={15} />
                    {n}{" "}
                    <span aria-hidden="true" className="text-ink-ghost">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-6 sm:p-12 lg:p-14 bg-surface border-t lg:border-t-0 lg:border-l border-line">
            <div className="fig mx-auto w-full max-w-[220px] -mt-2 mb-3">
              <Plug
                intensity={0.7}
                label="A plug on its cord. Move the pointer to draw it toward the socket."
              />
            </div>

            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className={label}>
                    Name
                  </label>
                  <IconField Icon={User}>
                    <input
                      id="c-name"
                      required
                      autoComplete="name"
                      className={`${field} pl-10`}
                      placeholder="Your name"
                      value={form.name}
                      onChange={set("name")}
                      disabled={state === "loading"}
                    />
                  </IconField>
                </div>
                <div>
                  <label htmlFor="c-email" className={label}>
                    Email
                  </label>
                  <IconField Icon={AtSign}>
                    <input
                      id="c-email"
                      type="email"
                      required
                      autoComplete="email"
                      className={`${field} pl-10`}
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={set("email")}
                      disabled={state === "loading"}
                    />
                  </IconField>
                </div>
              </div>
              <div>
                <label htmlFor="c-subject" className={label}>
                  Subject
                </label>
                <IconField Icon={PenLine}>
                  <input
                    id="c-subject"
                    className={`${field} pl-10`}
                    placeholder="What's it about?"
                    value={form.subject}
                    onChange={set("subject")}
                    disabled={state === "loading"}
                  />
                </IconField>
              </div>
              <div>
                <label htmlFor="c-msg" className={label}>
                  Message
                </label>
                <IconField Icon={MessageSquareText} top>
                  <textarea
                    id="c-msg"
                    required
                    rows={5}
                    className={`${field} pl-10 resize-none`}
                    placeholder="Tell me about your idea…"
                    value={form.message}
                    onChange={set("message")}
                    disabled={state === "loading"}
                  />
                </IconField>
              </div>
              <button
                type="submit"
                disabled={state === "loading"}
                className="btn-primary w-full !py-2.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {state === "loading" ? (
                  <>
                    <LoaderCircle size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send message
                  </>
                )}
              </button>
              {state === "error" && (
                <p
                  role="alert"
                  className="flex items-start gap-2 text-sm text-accent-red"
                >
                  <CircleAlert size={16} className="mt-0.5 shrink-0" />
                  Couldn&apos;t send right now. Please try again, or email me
                  directly at {EMAIL}.
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
            setTimeout(
              () =>
                document
                  .getElementById("c-name")
                  ?.focus({ preventScroll: false }),
              50,
            );
          }}
        />
      </div>
    </section>
  );
}
