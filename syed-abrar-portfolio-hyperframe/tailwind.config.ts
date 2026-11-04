import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:    ['var(--font-inter)',     'system-ui', 'sans-serif'],
        display: ['var(--font-orbitron)',  'sans-serif'],
        mono:    ['var(--font-jetbrains)', 'monospace'],
      },
      colors: {
        space: {
          black: '#080a0f',
          deep:  '#0d1117',
          navy:  '#111620',
          blue:  '#0d2137',
        },
        nebula: {
          purple: '#6b21a8',
          pink:   '#be185d',
          cyan:   '#0891b2',
          teal:   '#0d9488',
        },
        star: {
          white: '#f4f6ff',
          gold:  '#fbbf24',
          blue:  '#93c5fd',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':  'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'spin-slow':  'spin 20s linear infinite',
        'float':      'float 6s ease-in-out infinite',
        'marquee':    'marquee 30s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-14px)' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
};

export default config;
