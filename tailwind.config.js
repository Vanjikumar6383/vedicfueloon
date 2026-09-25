/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
    "./css/**/*.{css,scss}"
  ],
  theme: {
    extend: {
      colors: {
        vedic: {
          dark: '#07130D',
          card: '#091710',
          elevated: 'rgba(18, 40, 29, 0.75)',
          border: 'rgba(212, 160, 23, 0.25)',
          gold: '#D4A017',
          goldLight: '#E5B83A',
          cream: '#FAF6EE',
          creamMuted: '#C5BDB0',
          green: '#24553D',
          greenLight: '#2ECC71',
        },
      },
      screens: {
        'xs': '420px',
      },
    },
  },
  corePlugins: {
    preflight: false, // Prevents Tailwind base reset from overriding Bootstrap 5 and custom styles
  },
  plugins: [],
};
