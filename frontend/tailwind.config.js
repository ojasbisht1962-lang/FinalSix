/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: {
          600: "#2563eb",
          700: "#1d4ed8",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          400: "#9ca3af",
          600: "#4b5563",
          800: "#1f2937",
          900: "#111827",
        },
      },
    },
  },
  plugins: [],
};
