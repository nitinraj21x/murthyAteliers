/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream:      "#faf8ed",   // Light Yellow — background base
        gold:       "#D3af37",   // Gold — accents, borders, highlights
        sage:       "#919d7b",   // Gray Green — secondary text, subtle elements
        forest:     "#3d4b2a",   // Dark Gray Green — primary text, headings
        crimson:    "#6a1413",   // Dark Red — CTAs, eyebrows, emphasis
        "gold-light": "#e8d06a",
        "gold-dark":  "#a88a1e",
        "cream-dark": "#f0ecda",
        "forest-light": "#5a6e3e",
      },
      fontFamily: {
        display:   ['"Cormorant Garamond"', "Georgia", "serif"],
        serif:     ['"Cormorant Garamond"', "Georgia", "serif"],
        sans:      ['"Jost"', "system-ui", "sans-serif"],
        script:    ['"Great Vibes"', "cursive"],
      },
      boxShadow: {
        luxury:  "0 32px 80px rgba(61, 75, 42, 0.14), 0 8px 24px rgba(61, 75, 42, 0.08)",
        gold:    "0 8px 32px rgba(211, 175, 55, 0.22)",
        card:    "0 4px 24px rgba(61, 75, 42, 0.08)",
        deep:    "0 40px 100px rgba(20, 20, 10, 0.22)",
      },
      backgroundImage: {
        "grain": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      letterSpacing: {
        widest2: "0.3em",
        widest3: "0.4em",
      },
      transitionTimingFunction: {
        luxury: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};
