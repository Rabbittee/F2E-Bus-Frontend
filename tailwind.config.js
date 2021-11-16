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
          DEFAULT: "#DC771A",
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
      tab: "1px -3px 1px 0px #B0B0B0",
      tabInset: "inset 2px -2px 2px 0px #B0B0B0",
      DEFAULT: "0px 0px 5px 0px #C9C9C9",
    },
    backgroundImage: {
      "search-md": "url('/assets/background.png')",
      "search-wd": "url('/assets/bg-Search-wb.svg')",
    },
  },
  plugins: [],
};
