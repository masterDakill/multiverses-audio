/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette Mason Sterling
        gold: {
          50: '#FFFEF7',
          100: '#FEFCE8',
          400: '#FACC15', 
          500: '#D4AF37', // Or principal du logo MS
          600: '#B8941F',
          700: '#9C7A07',
          800: '#805F00',
          900: '#6B4E00'
        },
        sunset: {
          50: '#FFF7ED',
          100: '#FFEDD5',
          400: '#FB923C',
          500: '#F97316', // Orange coucher de soleil
          600: '#EA580C',
          700: '#C2410C',
          800: '#9A3412',
          900: '#7C2D12'
        },
        road: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          400: '#64748B',
          500: '#475569', // Gris route futuriste
          600: '#334155',
          700: '#1E293B',
          800: '#0F172A',
          900: '#020617'
        },
        // Univers musicaux
        classic: {
          500: '#475569',
          600: '#334155',
          700: '#1E293B'
        },
        karaoke: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9'
        },
        lounge: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309'
        },
        dance: {
          500: '#3B82F6',
          600: '#2563EB',
          700: '#1D4ED8'
        },
        rock: {
          500: '#DC2626',
          600: '#B91C1C',
          700: '#991B1B'
        },
        cinematic: {
          500: '#4F46E5',
          600: '#4338CA',
          700: '#3730A3'
        }
      },
      fontFamily: {
        'avenir': ['Avenir', 'system-ui', 'sans-serif'],
        'raleway': ['Raleway', 'system-ui', 'sans-serif'],
        'display': ['Avenir', 'Raleway', 'system-ui', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradient 15s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 3s linear infinite',
        'bounce-slow': 'bounce 2s infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' }
        },
        slideUp: {
          '0%': { transform: 'translateY(100px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.6)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'road-gradient': 'linear-gradient(135deg, #475569 0%, #1E293B 50%, #0F172A 100%)',
        'sunset-gradient': 'linear-gradient(135deg, #F97316 0%, #EA580C 50%, #C2410C 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #B8941F 50%, #9C7A07 100%)',
        'hero-pattern': 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(212,175,55,0.1) 100%)'
      },
      backdropBlur: {
        'xs': '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)',
        'glow-lg': '0 0 40px rgba(212, 175, 55, 0.4)',
        'sunset-glow': '0 0 30px rgba(249, 115, 22, 0.3)',
        'universe-glow': '0 0 25px rgba(139, 92, 246, 0.4)'
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem'
      }
    },
  },
  plugins: [],
  safelist: [
    // Classes dynamiques pour les univers
    'text-classic-500', 'bg-classic-500', 'border-classic-500',
    'text-karaoke-500', 'bg-karaoke-500', 'border-karaoke-500', 
    'text-lounge-500', 'bg-lounge-500', 'border-lounge-500',
    'text-dance-500', 'bg-dance-500', 'border-dance-500',
    'text-rock-500', 'bg-rock-500', 'border-rock-500',
    'text-cinematic-500', 'bg-cinematic-500', 'border-cinematic-500',
    // Gradients univers
    'from-classic-600', 'to-classic-800',
    'from-karaoke-600', 'to-pink-600',
    'from-lounge-600', 'to-red-600', 
    'from-dance-600', 'to-purple-600',
    'from-rock-600', 'to-orange-600',
    'from-cinematic-600', 'to-purple-600',
    // Shadows
    'shadow-classic-500/20', 'shadow-karaoke-500/20',
    'shadow-lounge-500/20', 'shadow-dance-500/20',
    'shadow-rock-500/20', 'shadow-cinematic-500/20'
  ]
}
