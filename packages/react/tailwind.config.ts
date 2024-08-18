import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  prefix: "k-",
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
