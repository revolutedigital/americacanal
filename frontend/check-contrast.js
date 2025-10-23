// Script para verificar contraste de cores WCAG 2.1
// Baseado nas diretrizes WCAG para contraste de cores

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(color1, color2) {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);

  const lum1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
  const lum2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);

  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);

  return (brightest + 0.05) / (darkest + 0.05);
}

function checkWCAG(ratio) {
  return {
    'AA Normal (4.5:1)': ratio >= 4.5 ? '✅ PASSA' : '❌ FALHA',
    'AA Grande (3:1)': ratio >= 3 ? '✅ PASSA' : '❌ FALHA',
    'AAA Normal (7:1)': ratio >= 7 ? '✅ PASSA' : '❌ FALHA',
    'AAA Grande (4.5:1)': ratio >= 4.5 ? '✅ PASSA' : '❌ FALHA'
  };
}

// Cores da paleta America Cannabis (ATUALIZADA PARA WCAG AA)
const colors = {
  primary: '#2D1B4E',
  primaryDark: '#1A0F2E',
  primaryLight: '#4A2D6B',
  secondary: '#8B6F47',        // CORRIGIDO: Escurecido para WCAG AA
  secondaryDark: '#6B5435',
  secondaryLight: '#B8986B',   // Antigo DEFAULT (não conforme)
  accent: '#C4FF61',
  accentDark: '#9FD800',
  white: '#FFFFFF',
  black: '#000000',
  gray900: '#1A1A1A',
  gray600: '#4B5563'
};

console.log('═══════════════════════════════════════════════════════════');
console.log('  ANÁLISE DE CONTRASTE DE CORES - AMERICA CANNABIS');
console.log('  Verificação WCAG 2.1 AA/AAA');
console.log('═══════════════════════════════════════════════════════════\n');

// Combinações principais usadas no site
const combinations = [
  { name: 'Primary (#2D1B4E) sobre Branco', fg: colors.primary, bg: colors.white, uso: 'Preços, títulos' },
  { name: 'Branco sobre Primary (#2D1B4E)', fg: colors.white, bg: colors.primary, uso: 'Texto no header/footer' },
  { name: 'Secondary (#B8986B) sobre Branco', fg: colors.secondary, bg: colors.white, uso: 'Elementos dourados' },
  { name: 'Branco sobre Secondary (#B8986B)', fg: colors.white, bg: colors.secondary, uso: 'Botões dourados' },
  { name: 'Accent (#C4FF61) sobre Primary (#2D1B4E)', fg: colors.accent, bg: colors.primary, uso: 'Destaques no roxo' },
  { name: 'Gray-900 (#1A1A1A) sobre Branco', fg: colors.gray900, bg: colors.white, uso: 'Texto principal' },
  { name: 'Primary Dark (#1A0F2E) sobre Branco', fg: colors.primaryDark, bg: colors.white, uso: 'Texto escuro' },
  { name: 'Secondary Dark (#8B7355) sobre Branco', fg: colors.secondaryDark, bg: colors.white, uso: 'Dourado escuro' },
  { name: 'Branco sobre Accent (#C4FF61)', fg: colors.white, bg: colors.accent, uso: 'Texto sobre verde limão' },
  { name: 'Gray-900 sobre Accent (#C4FF61)', fg: colors.gray900, bg: colors.accent, uso: 'Texto escuro sobre limão' }
];

combinations.forEach((combo, index) => {
  const ratio = getContrastRatio(combo.fg, combo.bg);
  const results = checkWCAG(ratio);

  console.log(`${index + 1}. ${combo.name}`);
  console.log(`   Uso: ${combo.uso}`);
  console.log(`   Taxa de Contraste: ${ratio.toFixed(2)}:1`);
  console.log(`   ${results['AA Normal (4.5:1)'].padEnd(10)} - AA Texto Normal (4.5:1)`);
  console.log(`   ${results['AA Grande (3:1)'].padEnd(10)} - AA Texto Grande (3:1)`);
  console.log(`   ${results['AAA Normal (7:1)'].padEnd(10)} - AAA Texto Normal (7:1)`);
  console.log(`   ${results['AAA Grande (4.5:1)'].padEnd(10)} - AAA Texto Grande (4.5:1)`);
  console.log('');
});

console.log('═══════════════════════════════════════════════════════════');
console.log('  RESUMO');
console.log('═══════════════════════════════════════════════════════════');
console.log('WCAG 2.1 Requisitos Mínimos:');
console.log('  - Nível AA Texto Normal: 4.5:1');
console.log('  - Nível AA Texto Grande: 3:1');
console.log('  - Texto Grande: 18pt+ ou 14pt+ negrito');
console.log('═══════════════════════════════════════════════════════════\n');
