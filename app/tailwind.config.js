/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        'sidebar':`300px  calc(100vw - 300px)`,
        'sidebar-collapsed':"100px  calc(100vw - 100px)"
      }},
  },
  plugins: [],
}

