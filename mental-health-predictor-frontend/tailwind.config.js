/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        mist: {
          50: "#F6F8F7",
          100: "#EEF2F0",
          200: "#DEE7E3",
        },
        pine: {
          50: "#EAF1F0",
          100: "#CFE0DD",
          300: "#8FB5AF",
          500: "#4C837D",
          600: "#3A6863",
          700: "#2F5D5A",
          800: "#1F3E3C",
          900: "#16302E",
        },
        clay: {
          200: "#EFDCCF",
          400: "#D9AD8E",
          500: "#C98A6C",
          600: "#B26F53",
        },
        ink: {
          400: "#5B6D69",
          600: "#33433F",
          800: "#1F2A28",
        },
      },
      fontFamily: {
        display: ["Fraunces", "ui-serif", "Georgia", "serif"],
        body: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 20px 60px -30px rgba(31, 46, 44, 0.35)",
        field: "0 1px 2px rgba(31, 46, 44, 0.06)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.06)", opacity: "1" },
        },
      },
      animation: {
        breathe: "breathe 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
