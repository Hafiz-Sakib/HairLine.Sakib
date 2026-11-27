import { useEffect } from "react";
import {
  SECTION_PATHS,
  currentSection,
  pathOf,
  scrollToSection,
} from "@/lib/routing";

/* On first load (and back/forward) scroll to the section named by the URL. */
export function useSectionRouting() {
  useEffect(() => {
    // Old links like /#about are rewritten to /about.
    const legacy = window.location.hash.replace("#", "");
    if (legacy && SECTION_PATHS.includes(legacy)) {
      window.history.replaceState({ section: legacy }, "", pathOf(legacy));
    }
    const id = currentSection();
    let t;
    if (id !== "home") t = setTimeout(() => scrollToSection(id, false), 120);
    const onPop = () => scrollToSection(currentSection());
    window.addEventListener("popstate", onPop);
    return () => {
      clearTimeout(t);
      window.removeEventListener("popstate", onPop);
    };
  }, []);
}
