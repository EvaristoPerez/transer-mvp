import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/**/*.{js,ts,jsx,tsx,mdx}", // if you have a shared UI lib
  ],
  theme: {
    extend: {
      colors: {
        espresso: "var(--color-espresso)",
        clay: "var(--color-clay)",
        sand: "var(--color-sand)",
        pebble: "var(--color-pebble)",
        pebbler: "var(--color-pebbler)",
        sage: "var(--color-sage)",
        terracotta: "var(--color-terracotta)",
        charcoal: "var(--color-charcoal)",
        turnusbackgnd: "var(--color-turnusbackgnd)",
      },
    },
  },
  plugins: [],
} satisfies Config;
