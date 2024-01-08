// > tailwind.config

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        primary: {
          500: "#9f7aea",
          400: "#c8bcf6",
          300: "#dad7eb",
        },
        secondary: {
          500: "#22252A",
        },
      },

      fontFamily: {
        openSans: ["Open Sans", "sans-serif"],
      },

      screens: {
        xs: "420px",
      },
    },
  },
};
