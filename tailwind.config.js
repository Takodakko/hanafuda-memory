/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    maxWidth: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '9/10': '90%',
    },
    maxHeight: {
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      '9/10': '90%',
    },
  },
  plugins: [],
}

