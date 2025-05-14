/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb', // or any hex/RGB/HSL value you choose
        white:'#ffffff',
      },
    },
  },
  plugins: [],
}