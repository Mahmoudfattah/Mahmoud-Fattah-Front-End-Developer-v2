// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   darkMode: "class",
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // ✅ مهم جدًا
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF007A',
        'primary-light': '#FF3399',
        'primary-dark': '#CC0061',
      },
      height:{
        screen:'100dvh'
      }
    },
  },
  plugins: [],
}
