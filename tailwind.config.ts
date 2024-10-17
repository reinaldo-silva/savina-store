import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        title: "var(--font-marcellus)",
        encode: "var(--font-encode-sans)",
      },
      colors: {
        primary: "#DD5A12",
      },
    },
  },
  plugins: [],
};
export default config;
