/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#41B54A',
        secondary: '#34A853',
        tertiary: '#F5F5F5',
        lightGray: '#F5F5F5',
        mediumGray: '#E0E0E0',
        darkGray: '#757575',
        danger: '#FF3B30',
        warning: '#FFCC00',
        success: '#34C759',
        info: '#5AC8FA',
      },
    },
  },
  plugins: [require("nativewind/tailwind/css")],
}; 