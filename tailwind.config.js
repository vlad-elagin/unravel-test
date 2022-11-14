const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.tsx', './components/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        _violet: '#7d59e6',
        _grey: '#f6f7f9',
        _navy: '#085385',
      },

      fontFamily: {
        sans: ['var(--font-nunito)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
