/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  // You always need one of them, even if you're using custom widths
  // scrollbar scrollbar-thin scrollbar-none
  plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
