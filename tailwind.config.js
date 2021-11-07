module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        notoSans: ["Noto Sans TC", "sans-serif"],
      },
      colors: {
        cyan: {
          DEFAULT: "#83C3C0",
          dark: "#4B707D",
        },
        orange: {
          DEFAULT: "#EF8C69",
        },
      },
      keyframes: {
        upper: {
          "0%": {
            opacity: 0,
            transform: "translateY(150%)",
          },
          "100%": {
            opacity: 1,
            transform: "translateY(0%)",
          },
        },
      },
      animation: {
        upper: "upper 1s ease-in",
      },
      zIndex: {
        "-1": "-1",
      },
    },
    boxShadow: {
      bgShadow: "0px -5px 15px 5px #FFFFFF",
    },
  },
  plugins: [],
};
