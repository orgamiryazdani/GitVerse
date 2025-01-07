import type { Config } from 'tailwindcss';

export const tailwindColors: { [key: string]: string } = {
  transparent: 'transparent',
  white: '#ffffff',
  black: '#000000',
  'dark-100': '#404258',
  'dark-200': '#474E68',
  'dark-300': '#50577A',
  'dark-400': '#6B728E',
  'dark-content': '#f1f5f9',
  'light-100': '#F5EFFF',
  'light-200': '#E5D9F2',
  'light-300': '#CDC1FF',
  'light-400': '#A294F9',
  'light-content': '#0f172a',
  success: '#36d399',
  warning: '#fbbd23',
  error: '#f87272',
};

export default {
  content: ['./src/app/**/*.{tsx,jsx}'],
  theme: {
    colors: tailwindColors,
    container: {
      center: true,
    },
    extend: {
      maxWidth: {
        '8xl': '1500px',
      },
    },
  },
  darkMode: 'class',
  plugins: [],
} satisfies Config;
