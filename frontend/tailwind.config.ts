import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Cannabis Premium Enterprise
        primary: {
          DEFAULT: '#2D1B4E', // Roxo profundo escuro
          dark: '#1A0F2E',    // Roxo muito escuro
          light: '#4A2D6B',   // Roxo médio
        },
        secondary: {
          DEFAULT: '#6B5435', // Dourado muito escuro (WCAG AAA - 7.5:1)
          dark: '#4A3822',    // Dourado extremamente escuro
          light: '#8B6F47',   // Dourado escuro (antigo DEFAULT - usar apenas para bg)
        },
        accent: {
          DEFAULT: '#5FAD56', // Verde cannabis profissional
          dark: '#4A8C43',    // Verde escuro harmonioso
          light: '#7BC674',   // Verde claro suave
        },

        // Sistema de Verde Cannabis (expandido para uso granular)
        cannabis: {
          50: '#F0F9EF',
          100: '#D9F0D6',
          200: '#B6E3B1',
          300: '#8BD384',
          400: '#5FAD56',  // = accent.DEFAULT
          500: '#4A8C43',  // = accent.dark
          600: '#3A6D35',
          700: '#2D5429',
          800: '#1E3A1C',
          900: '#122114',
        },

        // Tons de Dourado (expandido para uso granular)
        gold: {
          50: '#FAF8F2',
          100: '#F0EAD6',
          200: '#E0D4B8',
          300: '#C9B894',
          400: '#B09D70',
          500: '#8B6F47',  // = secondary.light
          600: '#6B5435',  // = secondary.DEFAULT
          700: '#4A3822',  // = secondary.dark
          800: '#302513',
          900: '#1A1409',
        },

        // Cores de suporte (para casos específicos)
        purple: {
          DEFAULT: '#9D4EDD',
          dark: '#7B2CBF',
          light: '#C77DFF',
        },
        pink: {
          DEFAULT: '#FF006E',
          dark: '#D4004E',
          light: '#FF3389',
        },
        cyan: {
          DEFAULT: '#00D9FF',
          dark: '#00B8D4',
          light: '#66E5FF',
        },
      },
    },
  },
  plugins: [],
};
export default config;
