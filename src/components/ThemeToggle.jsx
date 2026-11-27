import { Moon, Sun } from "lucide-react";

export default function ThemeToggle({ dark, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Light mode" : "Dark mode"}
      className="theme-btn relative grid place-items-center h-9 w-9 shrink-0 rounded-full border border-ink-ghost/60 bg-surface text-ink hover:bg-hover/60 hover:border-ink-ghost"
    >
      <Sun
        size={18}
        className={`ico absolute ${dark ? "opacity-0 scale-0 rotate-[120deg]" : "opacity-100 scale-100 rotate-0 text-amber-500"}`}
      />
      <Moon
        size={18}
        className={`ico absolute ${dark ? "opacity-100 scale-100 rotate-0 text-link" : "opacity-0 scale-0 -rotate-[120deg]"}`}
      />
    </button>
  );
}
