/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'accent': {
          purple: '#8b5cf6',
          pink: '#ec4899',
          blue: '#3b82f6',
          green: '#10b981',
          orange: '#f97316',
          cyan: '#06b6d4'
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
  safelist: [
    'text-purple-400',
    'text-pink-400',
    'text-blue-400',
    'text-green-400',
    'text-orange-400',
    'text-cyan-400',
    'border-purple-500',
    'border-pink-500',
    'border-blue-500',
    'border-green-500',
    'border-orange-500',
    'border-cyan-500',
    'bg-purple-500',
    'bg-pink-500',
    'bg-blue-500',
    'bg-green-500',
    'bg-orange-500',
    'bg-cyan-500',
    'shadow-purple-500/20',
    'shadow-pink-500/20',
    'shadow-blue-500/20',
    'shadow-green-500/20',
    'shadow-orange-500/20',
    'shadow-cyan-500/20'
  ]
}
