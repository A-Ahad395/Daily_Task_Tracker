import type { Config } from 'tailwindcss';
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: { ink: '#14213D', muted: '#71809A', canvas: '#F5F7FB', primary: '#2563EB' },
      boxShadow: { card: '0 7px 30px rgba(24, 42, 74, .045)' },
    },
  },
  plugins: [],
} satisfies Config;
