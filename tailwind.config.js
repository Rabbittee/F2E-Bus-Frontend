module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ["Ubuntu", "sans-serif"],
        "noto-sans": ["Noto Sans TC", "sans-serif"],
      },
      colors: {
        orange: "#DC771A",

        "dark-green": "#4B707D",
        blue: "#83C3C0",
        "light-blue": "#D8EEED",

        gray: {
          500: "#6B7280",
          400: "#9CA3AF",
          200: "#E5E7EB",
        },
      },
      zIndex: {
        "-1": "-1",
      },
    },
    backgroundImage: {
      "search-md": "url('/assets/background.png')",
      "search-wd": "url('/assets/web_search_bg.svg')",
      "other-wd": "url('/assets/web_other_bg.svg')",
    },
  },
  plugins: [require("@whiterussianstudio/tailwind-easing")],
};
