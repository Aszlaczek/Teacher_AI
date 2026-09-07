import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F7F2E6",
        paperLine: "#D8CFB8",
        margin: "#B5533C",
        ink: "#212B24",
        chalk: "#3B5D50",
        chalkDark: "#2B4438",
        pen: "#B5533C",
        penLight: "#E7CBBF",
        highlight: "#E8B84B",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-worksans)", "sans-serif"],
      },
      backgroundImage: {
        ruled:
          "repeating-linear-gradient(to bottom, transparent, transparent 35px, #D8CFB8 36px)",
      },
    },
  },
  plugins: [],
};

export default config;
