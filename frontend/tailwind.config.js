const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        background: "#242424",
        link: "#646cff",
        hoverLink: "#535bf2",
        button: "#1a1a1a",
        hoverButton: "#646cff",
        lightBackground: "#f9f9f9",
      },
    },
  },
  plugins: [],
};
