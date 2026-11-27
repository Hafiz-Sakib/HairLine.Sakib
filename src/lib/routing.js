/* ───────────── clean-URL section routing (/about instead of /#about) ───────────── */

export const SECTION_PATHS = [
  "home",
  "about",
  "skills",
  "projects",
  "education",
  "experience",
  "contact",
];
export const idOf = (href) => href.replace(/^\/?#?\/?/, "") || "home";
export const pathOf = (id) => (id === "home" ? "/" : `/${id}`);
export const currentSection = () => {
  const seg = window.location.pathname.replace(/^\/+|\/+$/g, "");
  return seg === "" || seg === "index.html" ? "home" : seg;
};

export function scrollToSection(id, smooth = true) {
  const el = document.getElementById(id);
  if (!el) return;
  if (id === "home")
    return window.scrollTo({ top: 0, behavior: smooth ? "smooth" : "auto" });
  el.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
}

/* Click handler for in-page nav links: keeps the URL clean, no hash. */
export function goTo(e, id) {
  if (
    e.defaultPrevented ||
    e.button !== 0 ||
    e.metaKey ||
    e.ctrlKey ||
    e.shiftKey ||
    e.altKey
  )
    return;
  e.preventDefault();
  const path = pathOf(id);
  if (window.location.pathname !== path)
    window.history.pushState({ section: id }, "", path);
  scrollToSection(id);
}
