import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

/**
 * PWA install state.
 *  - "ready"   : browser fired beforeinstallprompt, we can show the native prompt
 *  - "ios"     : iOS Safari (no prompt API) -> show manual "Add to Home Screen" steps
 *  - "none"    : already installed (standalone) or not installable -> hide the button
 */
const Ctx = createContext({ status: "none", install: async () => {}, iosHelp: false, setIosHelp: () => {} });

const isStandalone = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(display-mode: standalone)").matches ||
    window.matchMedia?.("(display-mode: window-controls-overlay)").matches ||
    window.navigator.standalone === true);

const isIos = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  const iPadOs = navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
  return /iPad|iPhone|iPod/.test(ua) || iPadOs;
};

export function PwaProvider({ children }) {
  const [deferred, setDeferred] = useState(null);
  const [installed, setInstalled] = useState(isStandalone());
  const [iosHelp, setIosHelp] = useState(false);

  useEffect(() => {
    const onPrompt = (e) => {
      e.preventDefault();
      setDeferred(e);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    const mq = window.matchMedia?.("(display-mode: standalone)");
    const onMode = () => setInstalled(isStandalone());
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    mq?.addEventListener?.("change", onMode);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
      mq?.removeEventListener?.("change", onMode);
    };
  }, []);

  const install = useCallback(async () => {
    if (deferred) {
      deferred.prompt();
      const { outcome } = await deferred.userChoice;
      if (outcome === "accepted") setInstalled(true);
      setDeferred(null);
    } else if (isIos()) {
      setIosHelp(true);
    }
  }, [deferred]);

  const status = installed ? "none" : deferred ? "ready" : isIos() ? "ios" : "none";
  const value = useMemo(() => ({ status, install, iosHelp, setIosHelp }), [status, install, iosHelp]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePwaInstall = () => useContext(Ctx);
