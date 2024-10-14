/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "san-serif"],
      },
      colors: {
        body: "#f0f2f5",
      },
    },
  },
  plugins: [],
};
