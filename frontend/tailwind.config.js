/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,誠,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f5ff',
          100: '#e0ebff',
          200: '#c7d8fe',
          300: '#a5beff',
          400: '#7f9cff',
          500: '#6366f1', // Indigo Accent
          600: '#4f46e5',
          700: '#3730a3',
          800: '#1e1b4b',
          900: '#0f0e26',
        },
        dark: {
          bg: '#080710',
          card: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      },
      backdropBlur: {
        glass: '16px',
      }
    },
  },
  plugins: [],
}
