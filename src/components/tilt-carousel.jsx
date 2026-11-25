import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from "motion/react";

/**
 * TiltCarousel — a looping row of photo cards in a 3D stage.
 * One motion value (`pos`, in cards) places every card: the distance from the middle drives
 * x spread, rotateY, translateZ, scale, brightness and blur. Autoplays, drags/flicks,
 * click-to-step on side cards, arrow keys. No visible controls.
 *
 * NOTE: the default items are sample photos from Unsplash (placeholders for the demo only).
 */
const SAMPLE_ITEMS = [
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=700&q=70", alt: "Mountain ridge above the clouds" },
  { src: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=700&q=70", alt: "Sunlit valley and trees" },
  { src: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=700&q=70", alt: "Forest with light rays" },
  { src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=700&q=70", alt: "Foggy forest" },
  { src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=700&q=70", alt: "Lake at dusk" },
  { src: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=700&q=70", alt: "Green hills under a clear sky" },
];

const mod = (a, n) => ((a % n) + n) % n;
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
/** signed distance from the middle, wrapped to [-n/2, n/2) so the row loops */
const wrap = (v, n) => {
  let d = mod(v, n);
  if (d >= n / 2) d -= n;
  return d;
};

function Card({ item, index, n, pos, w, h, rotation, scaleMin, radius }) {
  const d = useTransform(pos, (p) => wrap(index - p, n));
  const x = useTransform(d, (v) => {
    const a = Math.abs(v);
    return Math.sign(v) * (Math.min(a, 1) * w * 0.86 + Math.max(a - 1, 0) * w * 0.5);
  });
  const rotateY = useTransform(d, (v) => -clamp(v, -1, 1) * rotation);
  const z = useTransform(d, (v) => -Math.min(Math.abs(v), 2) * 140);
  const scale = useTransform(d, (v) => 1 - (1 - scaleMin) * Math.min(Math.abs(v), 1.6));
  const filter = useTransform(d, (v) => {
    const a = Math.min(Math.abs(v), 2);
    return `brightness(${1 - a * 0.22}) blur(${(a * 1.6).toFixed(2)}px)`;
  });
  const opacity = useTransform(d, (v) => clamp(3 - Math.abs(v), 0, 1));
  const zIndex = useTransform(d, (v) => Math.round(100 - Math.abs(v) * 10));

  return (
    <motion.div
      data-idx={index}
      style={{
        position: "absolute", left: "50%", top: "50%", width: w, height: h, marginLeft: -w / 2, marginTop: -h / 2,
        x, z, rotateY, scale, filter, opacity, zIndex, borderRadius: radius, overflow: "hidden", willChange: "transform, filter",
        boxShadow: "0 24px 50px -22px rgba(0,0,0,.45), 0 0 0 1px rgba(127,127,127,.18)", background: "rgb(var(--tint))",
      }}
    >
      <img src={item.src} alt={item.alt || ""} draggable={false} loading="lazy" className="h-full w-full select-none object-cover object-top" />
    </motion.div>
  );
}

export function TiltCarousel({
  items = SAMPLE_ITEMS,
  cardWidth = 300,
  aspect = 1.25, // card height / width
  rotation = 40, // deg
  perspective = 900, // px
  inactiveScale = 0.86,
  speed = 1, // multiplies spring stiffness / throw
  autoplay = true,
  delay = 2, // seconds between automatic steps
  radius = 22,
  initial = 0,
  onActiveChange,
  className = "",
  "aria-label": ariaLabel = "Photo carousel",
}) {
  const n = items.length;
  const reduce = useReducedMotion();
  const stage = useRef(null);
  const inView = useInView(stage, { margin: "0px 0px -10% 0px" });
  const pos = useMotionValue(initial);
  const target = useRef(initial);
  const anim = useRef(null);
  const drag = useRef(null);
  const paused = useRef(false);
  const activeRef = useRef(mod(initial, n));
  const [active, setActive] = useState(activeRef.current);
  const h = Math.round(cardWidth * aspect);
  const unit = cardWidth * 0.86; // px of dragging per card

  useMotionValueEvent(pos, "change", (v) => {
    const i = mod(Math.round(v), n);
    if (i !== activeRef.current) {
      activeRef.current = i;
      setActive(i);
      onActiveChange?.(i);
    }
  });
  useEffect(() => { onActiveChange?.(activeRef.current); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const goTo = (t, velocity = 0) => {
    target.current = t;
    anim.current?.stop();
    anim.current = animate(
      pos, t,
      reduce ? { duration: 0.2, ease: "easeOut" } : { type: "spring", stiffness: 130 * speed, damping: 20, velocity },
    );
  };
  const step = (dir) => goTo(Math.round(target.current) + dir);

  // autoplay: off for reduced motion, while hovered/dragging, or when off-screen
  useEffect(() => {
    if (!autoplay || reduce || !inView || n < 2) return;
    const id = setInterval(() => {
      if (paused.current || drag.current || document.hidden) return;
      step(1);
    }, Math.max(0.4, delay) * 1000);
    return () => clearInterval(id);
  }, [autoplay, reduce, inView, delay, n]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    anim.current?.stop();
    drag.current = {
      id: e.pointerId, x0: e.clientX, p0: pos.get(), lx: e.clientX, lt: performance.now(), v: 0, moved: false,
      idx: e.target.closest?.("[data-idx]")?.dataset.idx,
    };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.x0;
    if (!d.moved && Math.abs(dx) > 6) {
      d.moved = true;
      stage.current?.setPointerCapture?.(e.pointerId);
    }
    if (!d.moved) return;
    pos.set(d.p0 - dx / unit);
    const now = performance.now();
    const dt = now - d.lt;
    if (dt > 0) d.v = d.v * 0.6 + (-(e.clientX - d.lx) / unit / (dt / 1000)) * 0.4;
    d.lx = e.clientX;
    d.lt = now;
  };
  const onPointerEnd = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    drag.current = null;
    if (d.moved) {
      const v = performance.now() - d.lt > 90 ? 0 : d.v; // pointer rested before release: no throw
      goTo(Math.round(pos.get() + clamp(v * 0.25 * speed, -2, 2)), v);
    } else if (e.type === "pointerup" && d.idx != null) {
      const rel = wrap(Number(d.idx) - pos.get(), n);
      if (rel < -0.5) step(-1);
      else if (rel > 0.5) step(1);
      else goTo(Math.round(pos.get()));
    } else goTo(Math.round(pos.get()));
  };
  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
  };

  return (
    <div
      ref={stage}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onPointerEnter={() => { paused.current = true; }}
      onPointerLeave={() => { paused.current = false; }}
      className={`relative w-full cursor-grab select-none outline-none active:cursor-grabbing focus-visible:ring-2 focus-visible:ring-link/60 rounded-[28px] ${className}`}
      style={{
        height: h + 90, perspective, touchAction: "pan-y", overflow: "hidden",
        WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
        maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
      }}
    >
      {items.map((item, i) => (
        <Card key={item.src + i} item={item} index={i} n={n} pos={pos} w={cardWidth} h={h} rotation={rotation} scaleMin={inactiveScale} radius={radius} />
      ))}
      <span className="sr-only" aria-live="polite">{items[active]?.alt}</span>
    </div>
  );
}

export default TiltCarousel;
