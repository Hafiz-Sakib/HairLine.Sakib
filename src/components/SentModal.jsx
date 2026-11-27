import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { PenLine, X as CloseIcon } from "lucide-react";

/** Centered, blurred-backdrop confirmation shown after a message is sent. */
export default function SentModal({ open, onClose, onAnother }) {
  const btnRef = useRef(null);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    btnRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;
  return createPortal(
    <div
      className="sent-backdrop fixed inset-0 z-[200] grid place-items-center p-4 bg-ink/30 backdrop-blur-md"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="sent-title"
        className="sent-card relative w-full max-w-sm overflow-hidden rounded-3xl border border-line bg-surface px-7 pt-10 pb-7 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.45)]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 -top-24 mx-auto h-48 w-48 rounded-full bg-link/25 blur-3xl"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 grid place-items-center w-8 h-8 rounded-full text-ink-muted hover:text-ink hover:bg-tint transition-colors"
        >
          <CloseIcon size={17} />
        </button>

        <div className="relative mx-auto grid place-items-center w-20 h-20">
          <span
            aria-hidden="true"
            className="sent-ring absolute inset-0 rounded-full bg-link/20"
          />
          <span className="sent-pop relative grid place-items-center w-20 h-20 rounded-full bg-gradient-to-br from-primary to-link text-white shadow-[0_10px_30px_-8px_rgb(var(--primary)/0.7)]">
            <svg
              viewBox="0 0 24 24"
              width="38"
              height="38"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path
                className="sent-tick"
                d="M5 12.5l4.5 4.5L19 7.5"
                pathLength="1"
              />
            </svg>
          </span>
        </div>

        <h3 id="sent-title" className="relative mt-6 text-3xl">
          Message sent!
        </h3>
        <p className="relative mt-2 text-ink-muted leading-relaxed">
          Thanks for reaching out — I&apos;ll get back to you soon.
        </p>

        <div className="relative mt-7 flex flex-col gap-2.5">
          <button
            ref={btnRef}
            type="button"
            onClick={onAnother}
            className="btn-primary !rounded-full !py-3 text-base w-full justify-center transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            <PenLine size={17} aria-hidden="true" /> Send another
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full py-2.5 text-sm font-medium text-ink-muted hover:text-ink hover:bg-tint transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
