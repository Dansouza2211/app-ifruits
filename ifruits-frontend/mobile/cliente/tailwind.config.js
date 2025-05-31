/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#41B54A',
        secondary: '#27AB83',
        tertiary: '#8BBF9F',
        background: '#F8F9FA',
        card: '#FFFFFF',
        error: '#E12D39',
        text: {
          primary: '#212529',
          secondary: '#495057',
          tertiary: '#868E96',
        },
        border: '#E9ECEF',
      },
    },
  },
  plugins: [],
};

