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
        // ========================================
        // PALETA ESTRATÉGICA - E-COMMERCE CANNABIS
        // ========================================

        // CORES PRINCIPAIS - Identidade & Confiança (60% uso)
        primary: {
          DEFAULT: '#2D1B4E', // Roxo profundo - Headers, textos principais
          dark: '#1A0F2E',    // Roxo muito escuro - Backgrounds premium
          light: '#4A2D6B',   // Roxo médio - Hover states
          vibrant: '#9D4EDD', // 🆕 Roxo vibrante - Badges, destaques, conversão
        },
        secondary: {
          DEFAULT: '#6B5435', // Dourado escuro - Detalhes premium
          dark: '#4A3822',    // Dourado muito escuro - Sombras
          light: '#8B6F47',   // Dourado médio - Backgrounds sutis
        },
        accent: {
          DEFAULT: '#5FAD56', // Verde cannabis - CTAs principais
          dark: '#4A8C43',    // Verde escuro - Hover em CTAs
          light: '#7BC674',   // Verde claro - Sucesso, disponível
        },

        // CORES DE CONVERSÃO - Atenção & Urgência (25% uso)
        info: {
          DEFAULT: '#00D9FF', // 🆕 Cyan - Links, tooltips, informações
          dark: '#00B8D4',    // Cyan escuro - Hover
          light: '#66E5FF',   // Cyan claro - Backgrounds informativos
        },
        urgent: {
          DEFAULT: '#FFB800', // 🆕 Amarelo-ouro - Escassez, últimas unidades
          dark: '#E6A500',    // Amarelo escuro - Hover
          light: '#FFD666',   // Amarelo claro - Backgrounds de alerta
        },
        new: {
          DEFAULT: '#FF006E', // 🆕 Pink - "Novo!", promoções flash
          dark: '#D4004E',    // Pink escuro - Hover
          light: '#FF3389',   // Pink claro - Backgrounds de novidade
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

      },
    },
  },
  plugins: [],
};
export default config;
