import { orange } from '@mui/material/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        orange: 'var(--orange)',
        black: 'var(--black)',
        grey: 'var(--grey)',
        light_orange: 'var(--light-orange)',
        dark_green: 'var(--dark-green)',
        light_green: 'var(--light-green)',
        light_grey: 'var(--light-grey)',
      }
    },
  },
  plugins: [],
}