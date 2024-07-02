const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fsizes: {
      10: "10px",
      12: "12px",
      14: "14px",
      16: "16px",
      18: "18px",
      24: "24px",
      32: "32px",
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme, addComponents }) {
      matchUtilities(
        {
          fontsize: (value) => ({
            fontSize: value,
          }),
        },
        { values: theme("fsizes") }
      );
      addComponents({
        ".pc-view-box": {
          minHeight: "var(--global-pc-view-height)",
          marginBottom: "8px",
        },
      });
    }),
  ],
};
