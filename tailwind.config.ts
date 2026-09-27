import type { Config } from "tailwindcss";
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: "var(--card)",
        muted: "var(--muted)",
        accent: "var(--accent)",
        border: "var(--border)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 28px color-mix(in srgb, var(--accent) 30%, transparent)",
      },
      borderRadius: { xl: "var(--radius)" },
    },
  },
  plugins: [],
} satisfies Config;
