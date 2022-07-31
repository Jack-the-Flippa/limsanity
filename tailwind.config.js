/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  ],
theme: {
  extend: {
    minHeight: {
      '24': '24px',
      '412': '412px',
    },
    maxWidth: {
      "40": '40px',
    },
    minWidth: {
      "200": '200px',
    }
  },
},
plugins: [],
}
