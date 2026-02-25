/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      },
      colors: {
        ink: "#081326",
        panel: "#0d1d38",
        accent: "#1fb6ff",
        signal: "#21e6c1",
        warm: "#ffcc66"
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(31,182,255,0.2), 0 16px 48px rgba(31,182,255,0.22)"
      }
    }
  },
  plugins: []
};
