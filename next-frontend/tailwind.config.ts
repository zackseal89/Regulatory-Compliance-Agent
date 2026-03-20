import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#1B3A57", // Executive Navy
        "accent-silver": "#94A3B8",
        "background-dark": "#0F1117", // Deep Charcoal
        "surface": "#1E222D", // Solid Surface
        "border-subtle": "#2D3343", // Subtle Border
        // Keep existing ones for compatibility
        accent: "#94A3B8",
        background: "#0F1117",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "DEFAULT": "0px", // Sharp, clean lines
        "lg": "2px",
        "xl": "4px",
        "full": "9999px"
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
} satisfies Config;

