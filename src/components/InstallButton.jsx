import { Download } from "lucide-react";
import { usePwaInstall } from "@/usePwaInstall.jsx";

export default function InstallButton({ className = "", onDone }) {
  const { status, install } = usePwaInstall();
  if (status === "none") return null;
  return (
    <button
      type="button"
      aria-label="Install app"
      className={`btn-secondary ${className}`}
      onClick={async () => {
        await install();
        onDone?.();
      }}
    >
      <Download size={16} />{" "}
      <span className="hidden sm:inline">Install app</span>
    </button>
  );
}
