module.exports = {
  purge: [
    './index.html',
    './src/main.jsx',
    './src/preact/**/*.jsx',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui')
  ],
}
