import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },

    colors: {
      // white: "#FFFAFF",
      whiteBg: "#FFFFFF",
      black: "#08090A",
      blue: "#3e8ba3",
      blueLight: "#97c9d8",
      green: "#c8f18b",
      greenDark: "#8dda1b",

    },
  },
  plugins: [
    require("daisyui"),
    require("@stripe/react-stripe-js"),
    require("@stripe/stripe-js"),
    require('@tailwindcss/forms'),
    require("tailwindcss/nesting"),
    require('autoprefixer'),
    require('tailwindcss'),
  ],

  daisyui: {
    darkTheme: "light", // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    prefix: "", // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: true, // Shows info about daisyUI version and used config in the console when building your CSS
    themeRoot: ":root", // The element that receives theme color CSS variables
    themes: false // false: only light + dark | true: all themes | array: specific themes like this ["light", "dark", "cupcake"]
  },
};

export default config;
