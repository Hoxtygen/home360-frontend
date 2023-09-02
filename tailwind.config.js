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
        "accent-background": "#82DF4E",
        "secondary-light-stone": "#D3BCA6",
        "primary-active": "#A41857",
        "primary-background": "#F5F5F5",
        "primary-disabled": "#D391AF",
      },
    },
  },
  plugins: [],
};
