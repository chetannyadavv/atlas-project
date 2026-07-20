import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral interface with a single strong accent, per 05_Visual_Design.md
        background: "#0a0a0b",
        foreground: "#f5f5f5",
        surface: "#161618",
        border: "#2a2a2d",
        accent: {
          DEFAULT: "#3ddc97",
          hover: "#2fc985",
        },
        muted: "#8a8a8f",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      transitionTimingFunction: {
        atlas: "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
