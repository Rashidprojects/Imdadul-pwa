/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {
      colors: {
        primary: "#798645",
        secondary: "#626F47",
        light: "#FEFAE0",
        dark: "#F2EED7",
        success: "#2ecc71",
        table1: "#f2f1eb",
        table2: "#f0efed"
      }
    },
  },
  plugins: [],
}