module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        inout: {
          "0%": {
            opacity: 0,
          },
          "10%": {
            opacity: 1,
          },
          "90%": {
            opacity: 1,
          },
          "100%": {
            opacity: 0,
            pointerEvents: "none",
          },
        },
      },
      animation: {
        inout: "inout 5s forwards",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
