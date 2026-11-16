import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Design tokens LocalBoost.
 * Neutres et structure issus des thèmes Atlas (Origin UI / shadcn, MIT),
 * couleur primaire indigo LocalBoost (#4F46E5). Valeurs définies en HSL
 * dans src/app/globals.css (clair :root, sombre .dark).
 */
const token = (name: string) => `hsl(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: token("border"),
        input: token("input"),
        ring: token("ring"),
        background: token("background"),
        foreground: token("foreground"),
        brand: {
          50: "#EEF2FF",
          100: "#E0E7FF",
          200: "#C7D2FE",
          300: "#A5B4FC",
          400: "#818CF8",
          500: "#6366F1",
          600: "#4F46E5",
          700: "#4338CA",
          800: "#3730A3",
          900: "#312E81",
          DEFAULT: "#4F46E5",
        },
        surface: {
          bg: "#F7F8FA",
          card: "#FFFFFF",
          muted: "#F1F5F9",
        },
        primary: {
          DEFAULT: token("primary"),
          foreground: token("primary-foreground"),
          soft: token("primary-soft"),
        },
        secondary: {
          DEFAULT: token("secondary"),
          foreground: token("secondary-foreground"),
        },
        destructive: {
          DEFAULT: token("destructive"),
          foreground: token("destructive-foreground"),
          soft: token("destructive-soft"),
        },
        warning: {
          DEFAULT: token("warning"),
          foreground: token("warning-foreground"),
          soft: token("warning-soft"),
        },
        success: {
          DEFAULT: token("success"),
          foreground: token("success-foreground"),
          soft: token("success-soft"),
        },
        muted: {
          DEFAULT: token("muted"),
          foreground: token("muted-foreground"),
        },
        accent: {
          DEFAULT: token("accent"),
          foreground: token("accent-foreground"),
        },
        card: {
          DEFAULT: token("card"),
          foreground: token("card-foreground"),
        },
        popover: {
          DEFAULT: token("popover"),
          foreground: token("popover-foreground"),
        },
        sidebar: {
          DEFAULT: token("sidebar"),
          foreground: token("sidebar-foreground"),
          accent: token("sidebar-accent"),
          "accent-foreground": token("sidebar-accent-foreground"),
          border: token("sidebar-border"),
        },
        chart: {
          1: token("chart-1"),
          2: token("chart-2"),
          3: token("chart-3"),
          4: token("chart-4"),
          5: token("chart-5"),
        },
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Geist : la grotesque de Vercel, pour tout l'espace commerçant
        display: ["var(--font-geist)", "var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "2xs": ["0.6875rem", { lineHeight: "1rem" }],
        "13": ["0.8125rem", { lineHeight: "1.25rem" }],
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(15 15 20 / 0.05)",
        // Contrôles pressables : ombre portée courte + reflet supérieur.
        control: "0 1px 2px 0 rgb(15 15 30 / 0.07)",
        primary: "0 1px 2px 0 rgb(30 27 75 / 0.25), inset 0 1px 0 0 rgb(255 255 255 / 0.14)",
        raised: "0 1px 2px 0 rgb(15 15 20 / 0.06), 0 1px 1px -0.5px rgb(15 15 20 / 0.04)",
      },
      keyframes: {
        "fill-x": {
          from: { transform: "scaleX(0)" },
          to: { transform: "scaleX(1)" },
        },
        // Magic UI — Ripple
        ripple: {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)" },
          "50%": { transform: "translate(-50%, -50%) scale(0.9)" },
        },
        // Magic UI — Orbiting Circles
        orbit: {
          "0%": {
            transform:
              "rotate(calc(var(--angle) * 1deg)) translateY(calc(var(--radius) * 1px)) rotate(calc(var(--angle) * -1deg))",
          },
          "100%": {
            transform:
              "rotate(calc(var(--angle) * 1deg + 360deg)) translateY(calc(var(--radius) * 1px)) rotate(calc((var(--angle) * -1deg) - 360deg))",
          },
        },
      },
      animation: {
        "fill-x": "fill-x 900ms cubic-bezier(0.23, 1, 0.32, 1) both",
        ripple: "ripple 3.4s ease calc(var(--i, 0) * 0.2s) infinite",
        orbit: "orbit calc(var(--duration) * 1s) linear infinite",
      },
      transitionTimingFunction: {
        // atlas/easings-standard
        "out-quint": "cubic-bezier(0.23, 1, 0.32, 1)",
        "in-out-cubic": "cubic-bezier(0.65, 0, 0.35, 1)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
