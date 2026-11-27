import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { goTo } from "@/lib/routing";

/** Round button that springs in once you've scrolled past the hero. */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 700);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          key="top"
          href="/"
          onClick={(e) => goTo(e, "home")}
          aria-label="Back to top"
          initial={{ opacity: 0, scale: 0.5, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 24 }}
          whileHover={{ y: -4, scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: "spring", stiffness: 380, damping: 26 }}
          className="fixed right-4 bottom-[calc(88px+env(safe-area-inset-bottom))] xl:bottom-8 xl:right-8 z-[105] grid place-items-center w-11 h-11 rounded-full bg-primary text-white shadow-[0_10px_30px_-8px_rgb(var(--primary)/0.7)]"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
