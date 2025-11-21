/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        hcafc: { navy: "#2a52be", cream: "#fffdd0", offwhite: "#f0f0f0" },
      },
    },
  },
  plugins: [],
};
