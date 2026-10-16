import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ocean: {50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#da251d",600:"#c92018",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d"},
        vnred: {50:"#fff1f2",100:"#ffe4e6",200:"#fecdd3",300:"#fda4af",400:"#fb7185",500:"#da251d",600:"#c92018",700:"#b91c1c",800:"#991b1b",900:"#7f1d1d"},
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
        headline: ["Abril Fatface", "Georgia", "serif"],
        script: ["Grape Nuts", "cursive"],
        logo: ["Allison", "cursive"],
        alegreya: ["Alegreya Sans", "Arial", "sans-serif"]
      },
      boxShadow: { template: "0 0 10px rgba(0,0,0,.25)" }
    }
  },
  plugins: []
} satisfies Config;
