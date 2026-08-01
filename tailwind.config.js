/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // CSS-variable-driven brand colors — auto-switch in dark mode
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        accent:  "rgb(var(--color-accent)  / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
      },
      boxShadow: {
        soft: "0 10px 30px rgba(2, 6, 23, 0.08)",
      },
      borderRadius: {
        xl2: "1rem",
      },
    },
  },
  plugins: [],
};
