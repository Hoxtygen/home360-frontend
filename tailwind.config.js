/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "Open-Sans": ["Open Sans", "sans-serif"],
    },
    extend: {
      colors: {
        "primary-background": "#F5F5F5",
        "accent-background": "#82DF4E",
      },
    },
  },
  plugins: [],
};
