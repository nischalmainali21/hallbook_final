/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cprimary: {
          50: "#F8F9FA",
          100: "#E9ECEF",
          200: "#DEE2E6",
          300: "#CED4DA",
          400: "#ADB5BD",
          500: "#6C757D",
          600: "#495057",
          700: "#343A40",
          800: "#212529",
        },
        csecond: {
          100: "#14213D",
          200: "#FCA311",
          300: "#E5E5E5",
        },
      },
      keyframes: {
        bounceleft: {
          "0%": { transform: "translateX(0px)" },
          "37%": { transform: "translateX(5px)" },
          "55%": { transform: "translateX(-5px)" },
          "73%": { transform: "translateX(4px)" },
          "82%": { transform: "translateX(-4px)" },
          "91%": { transform: "translateX(2px)" },
          "96%": { transform: "translateX(-2px)" },
          "100%": { transform: "translateX(0px)" },
        },
        slideTop: {
          "0%": { transform: "translateY(0)" },
          "100%": { transform: "translateY(-100px)" },
        },
        "focus-in-expand": {
          "0%": {
            "letter-spacing": "-.5em",
            filter: "blur(12px)",
            opacity: "0",
          },
          to: {
            filter: "blur(0)",
            opacity: "1",
          },
        },
      },
      animation: {
        bounceleft: "bounceleft 0.25s ease-in-out .5s",
        slideTop: "slideTop 0.5s ease-in-out",
        "focus-in-expand":
          "focus-in-expand 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940)   both",
      },
    },
  },
  plugins: [],
};
