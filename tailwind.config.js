/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#4A90E2",
        secondary: "#F4A261",
        background: "#F8F9FA",
      },
      animation: {
        colorChange: "colorChange 3s infinite ease-in-out",
        colorChange2: "colorChange2 4s infinite ease-in-out",
      },
      keyframes: {
        colorChange: {
          "0%, 100%": { color: "#4A90E2" }, // Soft Blue
          "50%": { color: "#F4A261" }, // Warm Orange
        },
        colorChange2: {
          "0%, 100%": { color: "#4A90E2" }, // Soft Blue
          "50%": { color: "#F4A261" }, // Warm Orange
        },
      },
      screens: {
        'mobile': '360px', // Small mobile devices
        'tablet': '640px', // Tablets
        'laptop': '1024px', // Laptops
        'desktop': '1280px', // Desktops
        'wide': '1536px', // Large screens
      },
    },
  },
  plugins: [],
};
