import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          850: "#0f172a",
          900: "#0b1120",
          950: "#060913",
        },
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          950: "#172554",
        },
        cyber: {
          cyan: "#06b6d4",
          emerald: "#10b981",
          violet: "#8b5cf6",
          amber: "#f59e0b",
          rose: "#f43f5e",
        },
        fit: {
          cyan: "#22d3ee",
          teal: "#2dd4bf",
          emerald: "#34d399",
          green: "#4ade80",
          lime: "#a3e635",
          surface: "#0d1322",
          glow: "#0e2233",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-mesh': 'radial-gradient(at 100% 0%, rgba(37, 99, 235, 0.15) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(16, 185, 129, 0.12) 0px, transparent 50%)',
        'card-glow': 'radial-gradient(circle at 50% 0%, rgba(59, 130, 246, 0.08), transparent 70%)',
        'fit-glow': 'radial-gradient(circle at 20% 0%, rgba(34, 211, 238, 0.12), transparent 55%), radial-gradient(circle at 85% 100%, rgba(163, 230, 53, 0.10), transparent 50%)',
        'fit-gradient': 'linear-gradient(135deg, #22d3ee 0%, #34d399 45%, #a3e635 100%)',
        'fit-soft': 'linear-gradient(135deg, rgba(34, 211, 238, 0.08), rgba(163, 230, 53, 0.08))',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};

export default config;
