import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F5F5F5",
        main: "#ff7900",
        second: "#f8d40a",
      },
      fontFamily: {
        sour_gummy: ["var(--font-sour-gummy)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
