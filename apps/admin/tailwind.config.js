/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6f8fa",
          100: "#cceef3",
          500: "#0098a2",
          600: "#00838c",
          700: "#006d75",
        },
        admin: {
          primary: "#5932EA",
          "primary-hover": "#4a26d4",
          "primary-light": "#F3F0FF",
          bg: "#FAFBFF",
          sidebar: "#FFFFFF",
          muted: "#B5B7C0",
          card: "#FFFFFF",
          border: "#EEEEEE",
          text: "#292D32",
        },
        status: {
          active: "#008767",
          "active-bg": "rgba(22, 192, 152, 0.25)",
          inactive: "#DF0404",
          "inactive-bg": "#FFC5C5",
          pending: "#B54708",
          "pending-bg": "#FEF0C7",
          draft: "#475467",
          "draft-bg": "#F2F4F7",
        },
      },
      fontFamily: {
        sans: ["Poppins", "Inter", "system-ui", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        card: "0px 10px 60px rgba(226, 236, 249, 0.50)",
        panel: "0px 4px 20px rgba(0, 0, 0, 0.05)",
      },
      borderRadius: {
        "admin-card": "24px",
        "admin-pill": "30px",
      },
    },
  },
  plugins: [],
};
