import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  CodeXml,
  GraduationCap,
  House,
  Mail,
  Rocket,
  UserRound,
} from "lucide-react";
import MobileDock from "@/TabBar.jsx";
import InstallButton from "@/components/InstallButton";
import ThemeToggle from "@/components/ThemeToggle";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useTheme } from "@/hooks/useTheme";
import { EASE } from "@/lib/motion";
import { goTo, idOf, pathOf } from "@/lib/routing";

const MOBILE_NAV = [
  ["Home", "#home", House],
  ["About", "#about", UserRound],
  ["Skills", "#skills", CodeXml],
  ["Projects", "#projects", Rocket],
  ["Education", "#education", GraduationCap],
  ["Experience", "#experience", Briefcase],
  ["Contact", "#contact", Mail],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const active = useActiveSection();
  const [dark, toggleTheme] = useTheme();

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <>
      {/* Top bar: brand + actions (full links on desktop) */}
      <motion.header
        initial={{ y: -70, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE }}
        className={`sticky top-0 z-[100] bg-surface/90 backdrop-blur pt-[env(safe-area-inset-top)] transition-shadow duration-250 ${
          scrolled
            ? "shadow-[0_8px_24px_-14px_rgb(var(--ink)/0.25),0_1px_0_0_rgb(var(--line))]"
            : ""
        }`}
      >
        <div className="w-full max-w-[1920px] mx-auto flex xl:grid xl:grid-cols-[1fr_auto_1fr] items-center justify-between gap-3 px-4 sm:px-10 xl:px-12 py-2.5 xl:py-3">
          <motion.a
            href="/"
            onClick={(e) => goTo(e, "home")}
            aria-label="Sakib, home"
            whileHover={{ scale: 1.1, rotate: -5 }}
            whileTap={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 400, damping: 16 }}
            className="flex items-center shrink-0 xl:justify-self-start"
          >
            <img
              src="/logo-mark.png"
              alt=""
              width="33"
              height="36"
              className="h-[36px] w-auto dark:invert"
            />
          </motion.a>

          <nav
            className="hidden xl:flex items-center h-11 rounded-full bg-sky-light/60 border border-link/40 ring-1 ring-link/10 px-1.5"
            aria-label="Primary"
          >
            <ul className="flex items-center gap-1">
              {MOBILE_NAV.map(([l, h, Icon]) => {
                const on = active === h;
                return (
                  <li key={h}>
                    <a
                      href={pathOf(idOf(h))}
                      onClick={(e) => goTo(e, idOf(h))}
                      aria-current={on ? "page" : undefined}
                      className={`group relative flex items-center gap-1.5 px-3 xl:px-3.5 py-1.5 rounded-full text-[15px] font-semibold whitespace-nowrap transition-colors duration-200 ${
                        on
                          ? "text-white"
                          : "text-ink-2 hover:text-link hover:bg-link/10"
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="nav-pill"
                          aria-hidden="true"
                          className="absolute inset-0 rounded-full border border-sky-dark bg-primary shadow-sm"
                          transition={{
                            type: "spring",
                            stiffness: 420,
                            damping: 34,
                          }}
                        />
                      )}
                      <Icon
                        size={16}
                        strokeWidth={2}
                        className="relative shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110"
                        aria-hidden="true"
                      />
                      <span className="relative">{l}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2 xl:justify-self-end">
            <ThemeToggle dark={dark} onToggle={toggleTheme} />
            <InstallButton className="!px-3 !py-1.5 text-sm sm:text-base sm:!px-[15px] sm:!py-[6px]" />
          </div>
        </div>
      </motion.header>

      {/* Mobile / tablet: docked tab bar (same style as the Number System and motionBrew sites) */}
      <MobileDock
        items={MOBILE_NAV}
        active={active}
        pathOf={pathOf}
        idOf={idOf}
      />
    </>
  );
}
