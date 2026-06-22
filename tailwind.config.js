/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          950: '#070B14',
          900: '#0F1422',
          800: '#1B2233',
          700: '#30384B',
          600: '#465166',
          500: '#5D6A82',
          400: '#7886A0',
          300: '#A5B3CB',
          200: '#CDD7E8',
          100: '#E9EEF7',
          50: '#F5F7FB',
        },
        primary: {
          600: '#2F4ED1',
          500: '#3E63F5',
          400: '#5C7DFF',
        },
        accent: {
          600: '#5E31C4',
          500: '#7742F0',
          400: '#9468FF',
        },
      },
      fontFamily: {
        sans: ['IBM Plex Sans', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      backgroundImage: {
        'app-background': 'linear-gradient(135deg, #070B14 0%, #10182A 46%, #1A1638 100%)',
        'accent-stroke': 'linear-gradient(90deg, #3E63F5 0%, #7742F0 100%)',
      },
      borderRadius: {
        card: '18px',
        input: '14px',
        pill: '999px',
      },
      boxShadow: {
        'soft-depth': '0 4px 20px rgba(0, 0, 0, 0.3)',
      },
    },
  },
  plugins: [],
}