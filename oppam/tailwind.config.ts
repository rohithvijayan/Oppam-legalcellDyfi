import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#cf0000",
          container: "#ff0000",
          fixed: "#ffdad8",
        },
        secondary: {
          DEFAULT: "#000000",
          container: "#f1f5f9",
        },
        tertiary: "#475569",
        surface: {
          DEFAULT: "#ffffff",
          container: {
            low: "#f8fafc",
            lowest: "#ffffff",
          },
        },
        "on-surface": {
          DEFAULT: "#000000",
          variant: "#334155",
        },
        "on-primary": "#ffffff",
        outline: {
          DEFAULT: "#000000",
          variant: "#e2e8f0",
        },
        background: "#ffffff",
        "on-background": "#000000",
      },
      fontFamily: {
        headline: ["Anek Malayalam", "sans-serif"],
        body: ["Anek Malayalam", "sans-serif"],
        label: ["Anek Malayalam", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "1rem",
        lg: "2rem",
        xl: "3rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
