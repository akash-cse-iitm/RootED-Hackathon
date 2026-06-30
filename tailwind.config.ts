import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--color-ink)",
        teal: "var(--color-teal)",
        "teal-dark": "var(--color-teal-dark)",
        gold: "var(--color-gold)",
        coral: "var(--color-coral)",
        tint: "var(--color-tint)",
        "tint-warm": "var(--color-tint-warm)",
        text: "var(--color-text)",
        muted: "var(--color-muted)",
        line: "var(--color-line)"
      },
      boxShadow: {
        card: "0 18px 48px rgba(15, 61, 62, 0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      backgroundImage: {
        "hero-glow":
          "radial-gradient(circle at top left, rgba(233, 162, 59, 0.22), transparent 35%), radial-gradient(circle at top right, rgba(42, 157, 143, 0.18), transparent 28%)"
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "sans-serif"],
        heading: ["Iowan Old Style", "Palatino", "Georgia", "serif"]
      }
    }
  },
  plugins: []
};

export default config;
