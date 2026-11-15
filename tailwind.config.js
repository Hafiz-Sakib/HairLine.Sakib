/** Notion-inspired tokens (from the supplied design.md) */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: { DEFAULT: "#0075de", hover: "#097fe8", active: "#005bab" },
        tint: "#f9f9f8",
        ink: { DEFAULT: "#000000", 2: "#31302e", muted: "#615d59", ghost: "#a39e98" },
        sky: { light: "#e6f3fe", dark: "#005bab" },
        line: "#e5e5e5",
        hover: "#dfdcd9",
        accent: { orange: "#ffb110", red: "#f64932", yellow: "#ffc95e" },
      },
      fontFamily: {
        sans: ['NotionInter', 'Inter Variable', 'Inter', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', '"Apple Color Emoji"', 'Arial', 'sans-serif'],
        mono: ['SFMono-Regular', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      borderRadius: { sm: "4px", md: "8px", lg: "12px" },
      boxShadow: {
        card: "rgba(0,0,0,0.01) 0px 0.175px 1.041px 0px, rgba(0,0,0,0.02) 0px 0.8px 2.925px 0px, rgba(0,0,0,0.027) 0px 2.025px 7.847px 0px, rgba(0,0,0,0.04) 0px 4px 18px 0px",
        "card-hover":
          "rgba(0,0,0,0.008) 0px 0.667px 3.502px 0px, rgba(0,0,0,0.016) 0px 2.933px 7.252px 0px, rgba(0,0,0,0.02) 0px 7.2px 14.462px 0px, rgba(0,0,0,0.024) 0px 13.867px 28.348px 0px, rgba(0,0,0,0.03) 0px 23.333px 52.123px 0px, rgba(0,0,0,0.04) 0px 36px 89px 0px",
        focus: "rgba(35,131,226,0.57) 0px 0px 0px 1px inset, rgba(35,131,226,0.35) 0px 0px 0px 2px",
      },
      transitionTimingFunction: { notion: "cubic-bezier(.645,.045,.355,1)" },
      transitionDuration: { 250: "250ms" },
    },
  },
  plugins: [],
};
