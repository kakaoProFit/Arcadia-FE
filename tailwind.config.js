import flowbite from 'flowbite-react/tailwind'

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // or 'media' or 'class'
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    '.node_modules/flowbite-react/lib/**/*.{js,jsx,ts,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Tenada'],
        tenada: ['Tenada'],
      },
    },
  },
  plugins: [require('flowbite/plugin'), flowbite.plugin()],
}
