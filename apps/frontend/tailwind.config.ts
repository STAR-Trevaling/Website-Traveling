import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {50:"#effcfc",100:"#d6f7f6",200:"#b1efed",300:"#7de1df",400:"#42cac8",500:"#0098a2",600:"#087c86",700:"#0c626b",800:"#104f57",900:"#123f46"},
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
        popover: { DEFAULT: "hsl(var(--popover))", foreground: "hsl(var(--popover-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" }
      },
      fontFamily: {
        sans: ["Work Sans", "Arial", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        headline: ["Abril Fatface", "Georgia", "serif"],
        script: ["Grape Nuts", "cursive"],
        logo: ["Allison", "cursive"],
        alegreya: ["Alegreya Sans", "Arial", "sans-serif"]
      },
      boxShadow: { 
        template: "0 0 10px rgba(0,0,0,.25)",
        dashboard: "0px 10px 60px rgba(226, 236, 249, 0.50)"
      }
    }
  },
  plugins: []
} satisfies Config;
