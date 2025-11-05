/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './components/**/*.{js,ts,tsx}', './screens/**/*.{js,ts,tsx}', './src/**/*.{js,ts,tsx}'],
  darkMode: 'class',
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#00C6A1',
        'background-light': '#FFFFFF',
        'background-dark': '#052639',
        'app-teal': '#00C6A1',
        'app-navy': '#052639',
        'app-light-grey': '#F7F8FA',
        'header-text': '#052639',
        'body-text': '#333333',
        'text-light': '#F7F8FA',
        'text-dark': '#333333',
        'inactive-dot': '#E0E0E0',
        navy: '#052639',
        'dark-grey': '#333333',
        'light-grey': '#F0F0F0',
        accent: '#00C6A1',
        'surface-dark': '#0B3047',
        'card-dark': '#0A2F47',
        'chip-dark': '#0F3E5E',
        'navy-header': '#052639',
        'grey-text': '#333333',
        'text-primary-light': '#052639',
        'text-secondary-light': '#333333',
        'text-primary-dark': '#F7F8FA',
        'text-secondary-dark': '#E0E0E0',
        'icon-background-light': '#F0F5F1',
        'icon-background-dark': 'rgba(255, 255, 255, 0.1)',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '1rem',
        xl: '1.5rem',
        btn: '0.75rem',
        full: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 1.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
