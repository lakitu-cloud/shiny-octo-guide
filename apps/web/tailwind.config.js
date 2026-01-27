/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // You can add enterprise-friendly colors here later
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
