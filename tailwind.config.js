/** Notion-inspired tokens. Colours are CSS variables (see src/index.css) so light/dark swap automatically. */
const c = (name) => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        surface: c("surface"),
        card: c("card"),
        primary: { DEFAULT: c("primary"), hover: c("primary-hover"), active: c("primary-active") },
        link: c("link"),
        tint: c("tint"),
        ink: { DEFAULT: c("ink"), 2: c("ink-2"), muted: c("ink-muted"), ghost: c("ink-ghost") },
        sky: { light: c("sky-light"), dark: c("sky-dark"), hover: c("sky-hover"), active: c("sky-active") },
        line: c("line"),
        hover: c("hover"),
        accent: { orange: "#ffb110", red: c("accent-red"), yellow: "#ffc95e" },
      },
      fontFamily: {
        sans: ['NotionInter', 'Inter Variable', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', '"Apple Color Emoji"', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      borderRadius: { sm: "8px", md: "14px", lg: "22px" },
      boxShadow: {
        card: "var(--shadow-card)",
        "card-hover": "var(--shadow-card-hover)",
        focus: "rgba(35,131,226,0.57) 0px 0px 0px 1px inset, rgba(35,131,226,0.35) 0px 0px 0px 2px",
      },
      transitionTimingFunction: { notion: "cubic-bezier(.645,.045,.355,1)" },
      transitionDuration: { 250: "250ms" },
    },
  },
  plugins: [
    // touch devices: `.is-hover` (set by useTouchHover in App.jsx) behaves like :hover
    ({ addVariant }) => {
      addVariant("hover", ["&:hover", "&.is-hover"]);
      addVariant("group-hover", [":merge(.group):hover &", ":merge(.group).is-hover &"]);
    },
  ],
};
