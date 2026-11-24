/**
 * Mobile dock, same style as the Number System and motionBrew sites (motion-brew TabBar):
 * a docked bar where every tab keeps its label, one indicator (in the site's blue) glides between tabs,
 * a tap bounces the icon and sends a ripple. 62px tall, with the strip under it filled
 * with the page colour so content never shows through the gap.
 */
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useInView, useReducedMotion } from "framer-motion";

const cn = (...a) => a.filter(Boolean).join(" ");
const GLIDE = [0.22, 1, 0.36, 1];
const SPRING = { type: "spring", stiffness: 500, damping: 34 };
const SLIDE = { type: "spring", stiffness: 210, damping: 27, mass: 1 }; // soft glide of the ink indicator

/* Eased (ease-in-out) scroll to a section; the target is re-read every frame, so layout shifts on the way don't stop it short. */
function easedScrollTo(id, raf) {
  const el = document.getElementById(id);
  if (!el) return 0;
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const target = () => (id === "home" ? 0 : el.getBoundingClientRect().top + window.scrollY - pad);
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: target(), behavior: "instant" });
    return 0;
  }
  const from = window.scrollY;
  const dur = Math.min(1500, 550 + Math.abs(target() - from) * 0.12);
  const t0 = performance.now();
  cancelAnimationFrame(raf.current);
  const step = (now) => {
    const p = Math.min(1, (now - t0) / dur);
    const e = p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
    window.scrollTo({ top: from + (target() - from) * e, behavior: "instant" }); // "instant" beats CSS scroll-behavior: smooth
    if (p < 1) raf.current = requestAnimationFrame(step);
  };
  raf.current = requestAnimationFrame(step);
  return dur;
}

/** tabs: [{ id, label, short?, Icon, href }]  (short = shorter text under the icon; label stays the accessible name) */
function TabBar({ tabs = [], value, onSelect, className }) {
  const still = !!useReducedMotion();
  const uid = useId();
  const root = useRef(null);
  const seen = useInView(root, { once: true, amount: 0.4 });
  const shown = seen || still;
  const [playing, setPlaying] = useState(null);
  const [taps, setTaps] = useState({});
  const timer = useRef(0);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = (e, id) => {
    setTaps((t) => ({ ...t, [id]: (t[id] ?? 0) + 1 }));
    setPlaying(id);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setPlaying(null), 900);
    navigator.vibrate?.(8);
    onSelect(e, id);
  };

  const onKeyDown = (e) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    const items = Array.from(root.current?.querySelectorAll("[data-tab]") ?? []);
    const at = items.indexOf(document.activeElement);
    if (at < 0) return;
    e.preventDefault();
    items[(at + (e.key === "ArrowRight" ? 1 : items.length - 1)) % items.length]?.focus();
  };

  return (
    <motion.nav
      ref={root}
      aria-label="Primary"
      onKeyDown={onKeyDown}
      initial={still ? false : { opacity: 0, y: 28, filter: "blur(6px)" }}
      animate={shown ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
      transition={{ duration: 0.6, ease: GLIDE }}
      className={cn("relative w-[420px] max-w-full rounded-[28px] bg-surface/90 p-1.5 text-ink shadow-[0_1px_2px_rgba(0,0,0,0.05),0_16px_40px_-16px_rgba(0,0,0,0.28)] ring-1 ring-link/15 backdrop-blur-xl", className)}
    >
      <LayoutGroup id={uid}>
        <ul className="flex items-stretch justify-between gap-0.5">
          {tabs.map(({ id, label, short, Icon, href }, i) => {
            const on = id === value;
            const ripple = taps[id] ?? 0;
            return (
              <li key={id} className="min-w-0 flex-1">
                <motion.a
                  href={href}
                  data-tab=""
                  aria-label={label}
                  aria-current={on ? "page" : undefined}
                  onClick={(e) => choose(e, id)}
                  initial={still ? false : { opacity: 0, y: 14 }}
                  animate={shown ? { opacity: 1, y: 0 } : undefined}
                  whileTap={still ? undefined : { scale: 0.92 }}
                  transition={{ ...SPRING, opacity: { duration: 0.4, delay: still ? 0 : 0.12 + i * 0.05 }, y: { ...SPRING, delay: still ? 0 : 0.12 + i * 0.05 } }}
                  className="group relative flex h-[50px] w-full cursor-pointer select-none flex-col items-center justify-center gap-1 rounded-2xl outline-none [-webkit-tap-highlight-color:transparent] focus-visible:ring-2 focus-visible:ring-link/40"
                >
                  <span className="relative grid h-[30px] w-full max-w-[3.5rem] place-items-center">
                    {on && <motion.span layoutId={`${uid}-indicator`} transition={still ? { duration: 0 } : SLIDE} className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-link shadow-[0_6px_16px_-6px_rgb(var(--primary)/0.75),inset_0_1px_0_rgb(255_255_255/0.3)]" />}
                    {!on && <span aria-hidden className="absolute inset-0 rounded-full bg-link/10 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />}
                    <AnimatePresence>
                      {!still && ripple > 0 && (
                        <motion.span key={ripple} aria-hidden initial={{ scale: 0.4, opacity: 0.4 }} animate={{ scale: 2, opacity: 0 }} exit={{ opacity: 0 }}
                          transition={{ duration: 0.6, ease: GLIDE }} className="absolute size-9 rounded-full bg-primary/25" />
                      )}
                    </AnimatePresence>
                    <span className={cn("relative grid transition-colors duration-300", on ? "text-white" : "text-ink/45 group-hover:text-link")}>
                      <motion.span
                        key={ripple}
                        className="grid"
                        initial={ripple > 0 && !still ? { scale: 0.7, rotate: -14 } : false}
                        animate={still ? { scale: on ? 1.05 : 1, rotate: 0 } : playing === id ? { scale: [1, 1.25, 1.05], rotate: [0, -10, 0] } : { scale: on ? 1.05 : 1, rotate: 0 }}
                        transition={playing === id && !still ? { duration: 0.5, ease: GLIDE } : { type: "spring", stiffness: 520, damping: 12 }}
                      >
                        <Icon size={22} strokeWidth={on ? 2.25 : 2} aria-hidden="true" />
                      </motion.span>
                    </span>
                  </span>
                  <motion.span
                    animate={still ? undefined : { y: on ? 0 : 1, opacity: on ? 1 : 0.62 }}
                    transition={{ duration: 0.3, ease: GLIDE }}
                    className={cn("relative w-full truncate px-0.5 text-center text-[10px] font-semibold leading-none transition-colors duration-300 min-[400px]:text-[11px]", on ? "text-link" : "text-ink/55 group-hover:text-link")}
                  >
                    {short ?? label}
                  </motion.span>
                </motion.a>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
    </motion.nav>
  );
}

/** Fixed dock for phones and tablets. items: [[label, "#id", Icon], ...], active: "#id" from the scroll spy. */
/* seven tabs leave little room per label, so the two longest names get a short form under the icon */
const SHORT = { Education: "Studies", Experience: "Work" };

export default function MobileDock({ items, active, pathOf, idOf }) {
  const tabs = items.map(([label, href, Icon]) => ({ id: idOf(href), label, short: SHORT[label], Icon, href: pathOf(idOf(href)) }));
  const [picked, setPicked] = useState(null); // the tab that was tapped stays highlighted until the visitor scrolls by hand
  const raf = useRef(0);
  const busy = useRef(0); // our own scroll animation is running until this time
  const value = picked ?? idOf(active);

  useEffect(() => {
    if (!picked) return undefined;
    /* hand scrolling, keys, back/forward, or any scroll that is not ours (logo link, in-page links) gives control back to the scroll spy */
    const evs = ["wheel", "touchmove", "keydown", "popstate", "scroll"];
    const release = (e) => {
      if (e.type === "scroll" && Date.now() < busy.current) return;
      cancelAnimationFrame(raf.current);
      setPicked(null);
    };
    evs.forEach((ev) => window.addEventListener(ev, release, { passive: true }));
    return () => evs.forEach((ev) => window.removeEventListener(ev, release));
  }, [picked]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  const select = (e, id) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    const path = pathOf(id);
    if (window.location.pathname !== path) window.history.pushState({ section: id }, "", path);
    setPicked(id);
    busy.current = Date.now() + easedScrollTo(id, raf) + 250;
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[110] flex justify-center px-3 pb-[max(12px,env(safe-area-inset-bottom))] xl:hidden">
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[max(12px,env(safe-area-inset-bottom))] bg-surface" />
      <TabBar tabs={tabs} value={value} onSelect={select} className="pointer-events-auto" />
    </div>
  );
}
