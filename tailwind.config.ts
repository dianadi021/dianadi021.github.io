import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import aspectRatio from '@tailwindcss/aspect-ratio'

export default <Partial<Config>>{
  darkMode: 'class',
  content: [
    './app/**/*.{vue,js,ts,jsx,tsx}',
    './app/components/**/*.{vue,js,ts,jsx,tsx}',
    './app/layouts/**/*.{vue,js,ts,jsx,tsx}',
    './app/pages/**/*.{vue,js,ts,jsx,tsx}',
    './app/plugins/**/*.{js,ts}',
    './app/app.vue',
    './components/**/*.{vue,js,ts,jsx,tsx}',
    './layouts/**/*.{vue,js,ts,jsx,tsx}',
    './pages/**/*.{vue,js,ts,jsx,tsx}',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  theme: {
    extend: {
      spacing: {
        18: '4.5rem'
      },
      boxShadow: {
        xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)'
      },
      colors: {
        // Palet Warna Kustom Sesuai CONTEXT.md & Ghibli Atmosphere
        prussian: {
          DEFAULT: '#023047',
          light: '#034363',
          dark: '#011c2a',
          50: '#f0f7fb',
          100: '#dbeaf3',
          200: '#bad8e7',
          300: '#8ac0d7',
          400: '#52a1c2',
          500: '#219ebc',
          600: '#1b809d',
          700: '#18677f',
          800: '#17566a',
          900: '#023047',
          950: '#011c2a'
        },
        cerulean: {
          DEFAULT: '#219EBC',
          light: '#3db2d1',
          dark: '#1b809d',
          50: '#f0f9fc',
          100: '#ddf2f8',
          200: '#bfe6f2',
          300: '#91d4e8',
          400: '#5abada',
          500: '#219ebc',
          600: '#1a7fa0',
          700: '#196682',
          800: '#19556b',
          900: '#19475a'
        },
        ice: {
          DEFAULT: '#8ECAE6',
          light: '#bce0f1',
          dark: '#6eb5d6',
          50: '#f5fafc',
          100: '#eaf4f9',
          200: '#d4eaf3',
          300: '#b2dbeb',
          400: '#8ecae6',
          500: '#5faecf',
          600: '#4892b3',
          700: '#3c7692',
          800: '#356379',
          900: '#2f5264'
        },
        amber: {
          DEFAULT: '#FFB703',
          light: '#ffc32e',
          dark: '#d99c02',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffb703',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f'
        },
        'ut-orange': {
          DEFAULT: '#FB8500',
          light: '#ff9829',
          dark: '#d67100',
          50: '#fff8ed',
          100: '#ffeed5',
          200: '#ffd9aa',
          300: '#ffbd73',
          400: '#ff9838',
          500: '#fb8500',
          600: '#ea6c00',
          700: '#c24e02',
          800: '#9a3e0a',
          900: '#7d350d'
        },
        'ghibli-parchment': '#faf8f5',
        'ghibli-dark': '#023047',

        // Palet warna format Bootstrap
        primary: {
          DEFAULT: '#0d6efd',
          50: '#f0f7ff',
          100: '#cfe2ff',
          200: '#9ec5fe',
          300: '#6ea8fe',
          400: '#3d8bfd',
          500: '#0d6efd',
          600: '#0b5ed7',
          700: '#0a58ca',
          800: '#084298',
          900: '#052c65'
        },
        secondary: {
          DEFAULT: '#6c757d',
          50: '#f8f9fa',
          100: '#e9ecef',
          200: '#dee2e6',
          300: '#ced4da',
          400: '#adb5bd',
          500: '#6c757d',
          600: '#5c636a',
          700: '#495057',
          800: '#343a40',
          900: '#212529',
          white: '#f8f9fa',
          black: '#212529'
        },
        'secondary-white': '#f8f9fa',
        'secondary-black': '#212529',
        warning: {
          DEFAULT: '#ffc107',
          100: '#fff3cd',
          500: '#ffc107',
          600: '#ffca2c',
          700: '#664d03'
        },
        danger: {
          DEFAULT: '#dc3545',
          100: '#f8d7da',
          500: '#dc3545',
          600: '#bb2d3b',
          700: '#842029'
        },
        info: {
          DEFAULT: '#0dcaf0',
          100: '#cff4fc',
          500: '#0dcaf0',
          600: '#31d2f2',
          700: '#055160'
        },
        success: {
          DEFAULT: '#198754',
          100: '#d1e7dd',
          500: '#198754',
          600: '#157347',
          700: '#0f5132'
        }
      }
    }
  },
  // Safelist: Tailwind JIT tidak dapat mendeteksi class yang dibangun secara dinamis
  // (mis: dari cn(), :class binding conditional, atau string yang tidak statis).
  // Semua varian warna Bootstrap di about.vue harus disafelisted secara eksplisit.
  safelist: [
    // --- Background Colors (solid) ---
    'bg-primary', 'bg-secondary', 'bg-warning', 'bg-danger', 'bg-info', 'bg-success',
    'bg-secondary-white', 'bg-secondary-black',

    // --- Background Opacity Modifiers (mis: bg-primary/10, bg-info/20) ---
    'bg-primary/10', 'bg-primary/20',
    'bg-info/20', 'bg-warning/20',

    // --- Hover Background Shades ---
    'hover:bg-primary-600', 'hover:bg-danger-600', 'hover:bg-info-600',
    'hover:bg-success-600', 'hover:bg-warning-600', 'hover:bg-secondary-600',

    // --- Text Colors ---
    'text-primary', 'text-secondary', 'text-warning', 'text-danger', 'text-info', 'text-success',
    'text-secondary-white', 'text-secondary-black',

    // --- Text Shade Variants (mis: text-info-700, text-warning-700) ---
    'text-primary-700', 'text-info-700', 'text-warning-700',
    'text-danger-700', 'text-success-700',

    // --- Border Colors ---
    'border-primary', 'border-danger', 'border-warning', 'border-info', 'border-success',
    'border-secondary',
    'border-primary/20',

    // --- Ring / Focus Ring ---
    'ring-primary', 'ring-danger', 'ring-warning', 'ring-info', 'ring-success',
    'focus:ring-primary', 'focus:ring-danger', 'focus:ring-warning',
    'focus:ring-info', 'focus:ring-success',
  ],

  plugins: [
    forms,
    typography,
    aspectRatio
  ]
}
