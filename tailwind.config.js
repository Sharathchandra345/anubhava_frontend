module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // THEME COLORS
        // "primary-color": "#0F6F7B", // Can be changed DEFAULT
        // "primary-light": "#17bec3", // Hover Color DEFAULT
        // "primary-dark": "#042f2e", // Can be changed DEFAULT
        // "primary-lighter": "#8BDEE1", // Can be changed DEFAULT
        "light-color": "#f1f5f9", // DO NOT CHANGE
        "dark-color": "#072033", //  DO NOT CHANGE
        "warning-color": "#FEE21E", // DO NOT CHANGE

        // "primary-color": "#2b2d42", // Can be changed   1
        // "primary-light": "#778DA9", // Hover Color      1
        // "primary-dark": "#0D1B2A", // Can be changed    1
        // "primary-lighter": "#E0E1DD", // Can be changed 1 // BLACK

        "primary-color": "#36528b", // Can be changed   1
        "primary-light": "#9db7ed", // Hover Color      1
        "primary-dark": "#0F2550", // Can be changed    1
        "primary-lighter": "#E0E1DD", // Can be changed 1
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
/**
 *
 *  WHEN CHANGING COLORS MAKE SURE TO CHANGE
 * \src\components\PageBanner.jsx,
 * \src\components\HomeComponents\HomeTimeline.jsx,
 * \src\pages\Company.jsx,
 * \src\pages\Companies.jsx
 * primary-color wherever you find MySwal in the code
 */
