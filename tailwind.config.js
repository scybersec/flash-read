/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        PTsans: ["PTsans", "sans-serif"],
        robotoC: ["robotoC", "sans-serif"],
      }
    },
  },
  plugins: [],
}