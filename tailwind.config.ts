import type { Config } from "tailwindcss";

const config: Config = {
  // Paths to all of your template files
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",       // if you use pages/
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./styles/**/*.{css,scss}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  // Keep these custom classes from being purged
  safelist: [
    "lightsaber-container",
    "beam",
  ],
  plugins: [],
};

export default config;
