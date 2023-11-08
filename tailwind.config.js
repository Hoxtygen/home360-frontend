/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/features/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      "Open-Sans": ["Open Sans", "sans-serif"],
      "hanken-black": ["hanken-black", "sans-serif"],
      "hanken-regular": ["hanken-regular", "sans-serif"],
      "hanken-medium": ["hanken-medium", "sans-serif"],
      "hanken-light": ["hanken-light", "sans-serif"],
      "hanken-semibold": ["hanken-semibold", "sans-serif"],
    },
    fontSize: {
      7: "7px",
      9: "9px",
      10: "10px",
      12: "12px",
      13: "13px",
      14: "14px",
      16: "16px",
      17: "17px",
      18: "18px",
      20: "20px",
      22: "22px",
      24: "24px",
      32: "32px",
      48: "48px",
      64: "64px",
    },
    extend: {
      colors: {
        "accent-background": "#82DF4E",
        "secondary-light-stone": "#D3BCA6",
        "primary-active": "#A41857",
        "primary-background": "#F5F5F5",
        "primary-disabled": "#D391AF",
        "secondary-light-gray": "#747474",
      },
    },
  },
  plugins: [],
};
