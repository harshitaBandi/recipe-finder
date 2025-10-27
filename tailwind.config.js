/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef4e8',
          100: '#fde8d1',
          200: '#fbd1a3',
          300: '#f9ba75',
          400: '#f7a347',
          500: '#f58c19',
          600: '#c47014',
          700: '#93540f',
          800: '#62380a',
          900: '#311c05',
        },
      },
    },
  },
  plugins: [],
}
