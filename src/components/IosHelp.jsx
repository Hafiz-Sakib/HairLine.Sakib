import { Download, Share, SquarePlus, X } from "lucide-react";
import { usePwaInstall } from "@/usePwaInstall.jsx";

export default function IosHelp() {
  const { iosHelp, setIosHelp } = usePwaInstall();
  if (!iosHelp) return null;
  return (
    <div
      className="fixed inset-0 z-[300] grid place-items-end sm:place-items-center bg-black/40 dark:bg-black/60 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Install on iPhone"
      onClick={() => setIosHelp(false)}
    >
      <div
        className="card w-full max-w-sm !p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <h3 className="text-xl">Install on your iPhone</h3>
          <button
            aria-label="Close"
            onClick={() => setIosHelp(false)}
            className="p-1 -m-1 rounded-sm hover:bg-hover/60"
          >
            <X size={18} />
          </button>
        </div>
        <ol className="mt-4 space-y-3 text-base text-ink-2">
          <li className="flex items-center gap-3">
            <Share size={18} className="text-link shrink-0" /> Tap the{" "}
            <strong>Share</strong> button in Safari.
          </li>
          <li className="flex items-center gap-3">
            <SquarePlus size={18} className="text-link shrink-0" /> Choose{" "}
            <strong>Add to Home Screen</strong>.
          </li>
          <li className="flex items-center gap-3">
            <Download size={18} className="text-link shrink-0" /> Tap{" "}
            <strong>Add</strong> — done.
          </li>
        </ol>
      </div>
    </div>
  );
}
