/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#E6F2EF',
          100: '#CCE5DF',
          200: '#99CBBF',
          300: '#66B0A0',
          400: '#339680',
          500: '#0D7A5F', // Main primary color
          600: '#0A6249',
          700: '#084A37',
          800: '#053124',
          900: '#031912',
        },
        secondary: {
          50: '#F9F6F0',
          100: '#F3EDE1',
          200: '#E7DBC3',
          300: '#DBC9A5',
          400: '#D4C19C', // Main secondary color
          500: '#C7AE78',
          600: '#BF9B30',
          700: '#9F7E28',
          800: '#7F6420',
          900: '#5F4B18',
        },
        accent: {
          50: '#FDF7E8',
          100: '#FBEFD1',
          200: '#F7DFA3',
          300: '#F3CF75',
          400: '#EFBF47',
          500: '#BF9B30', // Main accent color
          600: '#997C26',
          700: '#735D1D',
          800: '#4C3E13',
          900: '#261F0A',
        },
        success: {
          500: '#10B981',
        },
        warning: {
          500: '#F59E0B',
        },
        error: {
          500: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Tajawal', 'sans-serif'],
        heading: ['Markazi Text', 'serif'],
      },
      boxShadow: {
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};