/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  // content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  content: ["./app/**/*.{js,jsx,ts,tsx}"],

  presets: [require("nativewind/preset")],
  // theme: {
  //   extend: {
  //     fontFamily: {
  //       "glancyr-Light": ["Glancyr-Light", "sans-serif"],
  //       "glancyr-400": ["Glancyr-Regular", "sans-serif"],
  //       "glancyr-500": ["Glancyr-Medium", "sans-serif"],
  //       "glancyr-700": ["Glancyr-Bold", "sans-serif"],
  //       "glancyr-800": ["Glancyr-Black", "sans-serif"],
  //       "Roboto-Light": ["Roboto-Light", "sans-serif"],
  //       "Roboto-400": ["Roboto-Regular", "sans-serif"],
  //       "Roboto-500": ["Roboto-Medium", "sans-serif"],
  //       "Roboto-600": ["Roboto-SemiBold", "sans-serif"],
  //       "Roboto-700": ["Roboto-Bold", "sans-serif"],
  //       "Roboto-800": ["Roboto-ExtraBold", "sans-serif"],
  //       "SpaceMono-Regular": ["SpaceMono-Regular", "sans-serif"],
  //     },
  //     colors: {
  //       primary: "#690066",
  //       primary2: "#360237",
  //       searchbar: "#FAE9F3",
  //       textPrimary: "#360237",
  //     },
  //   },
  // },
  plugins: [],
};
