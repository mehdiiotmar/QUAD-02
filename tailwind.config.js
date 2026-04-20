/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF5C00',
        hot: '#FF8A00',
        gold: '#FFB800',
        dark: '#0D0D0D',
        dark2: '#141414',
        card: '#181818',
        textLight: '#F0EDE8',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"Barlow"', 'sans-serif'],
        condensed: ['"Barlow Condensed"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
