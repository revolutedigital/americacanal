# Instruções para Criar Favicons Multi-Size

## Tamanhos Necessários

Para cobertura completa em todos os dispositivos e navegadores:

```
favicon.ico        (multi-size: 16x16, 32x32, 48x48)
favicon-16x16.png
favicon-32x32.png
apple-touch-icon.png (180x180)
icon-192x192.png   (Android)
icon-512x512.png   (Android/PWA)
```

## Opção 1: Gerador Online (Mais Rápido)

### RealFaviconGenerator (Recomendado)
1. Acesse: https://realfavicongenerator.net/
2. Upload logo/ícone base (mínimo 512x512px, PNG com transparência)
3. Configure cada plataforma:
   - **Favicon**: Use versão simplificada (ícone + cor de fundo)
   - **iOS**: Adicionar padding se necessário
   - **Android Chrome**: Usar cores da marca
   - **Windows Metro**: Cor sólida de fundo
4. Clique em "Generate"
5. Baixe o pacote ZIP
6. Extraia todos arquivos para `/public/`

### Favicon.io
1. Acesse: https://favicon.io/
2. Escolha método:
   - **From Text**: Digite "AC" (America Cannabis)
   - **From Image**: Upload logo
   - **From Emoji**: Use 🌿
3. Customize cores:
   - Background: #2D5016 (verde)
   - Text: #FFFFFF (branco)
4. Download e extraia para `/public/`

## Opção 2: Design Manual (Canva/Figma)

### Passo 1: Criar Ícone Base (512x512px)

**Sugestão de Design:**
- Fundo: Gradiente circular verde (#2D5016) para roxo (#8B5CF6)
- Centro: Folha de cannabis estilizada (branca)
- OU: Letras "AC" em negrito (branca)
- Bordas arredondadas (raio 20%)

### Passo 2: Exportar em Múltiplos Tamanhos

No Canva/Figma:
1. Crie artboard 512x512px
2. Exporte como PNG (transparente se possível):
   - 512x512px → `icon-512x512.png`
   - 192x192px → `icon-192x192.png`
   - 180x180px → `apple-touch-icon.png`
   - 32x32px → `favicon-32x32.png`
   - 16x16px → `favicon-16x16.png`

### Passo 3: Converter para ICO

Use ImageMagick:
```bash
convert favicon-16x16.png favicon-32x32.png favicon-48x48.png favicon.ico
```

Ou use conversor online:
- https://convertio.co/png-ico/
- https://www.icoconverter.com/

## Opção 3: Usando Ferramentas de Linha de Comando

### ImageMagick (Requer instalação)
```bash
# Instalar
brew install imagemagick  # macOS
# ou: sudo apt install imagemagick  # Linux

# Criar todos tamanhos a partir de um PNG 512x512
convert logo-512.png -resize 16x16 favicon-16x16.png
convert logo-512.png -resize 32x32 favicon-32x32.png
convert logo-512.png -resize 192x192 icon-192x192.png
convert logo-512.png -resize 180x180 apple-touch-icon.png

# Criar favicon.ico multi-size
convert logo-512.png -define icon:auto-resize=48,32,16 favicon.ico
```

## Opção 4: Design com IA

Prompt para Midjourney/DALL-E:
```
Minimalist app icon for cannabis e-commerce, 512x512px, flat design.
Simple cannabis leaf symbol in white on gradient background
(dark green #2D5016 to purple #8B5CF6).
Modern, clean, professional. Square format with rounded corners.
--ar 1:1 --style raw --v 6
```

## Estrutura Final em /public/

```
/public/
├── favicon.ico                (multi-size)
├── favicon-16x16.png
├── favicon-32x32.png
├── apple-touch-icon.png       (180x180)
├── icon-192x192.png
├── icon-512x512.png
└── og-image.jpg               (1200x630)
```

## Atualizar Código (Já Configurado)

O `layout.tsx` já está configurado com:
```typescript
icons: {
  icon: [
    { url: '/favicon.ico' },
    { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
  ],
  apple: [
    { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
  ],
}
```

Renomeie `apple-touch-icon.png` para `apple-icon.png` se necessário.

## Verificação

Teste os favicons em:
- [ ] Chrome desktop
- [ ] Firefox desktop
- [ ] Safari desktop
- [ ] Safari iOS (adicionar à tela inicial)
- [ ] Chrome Android (adicionar à tela inicial)

## Ferramentas de Teste

1. **Browser DevTools**
   - Abra DevTools → Application → Manifest
   - Verifique icons carregados

2. **Favicon Checker**
   - https://realfavicongenerator.net/favicon_checker

3. **Lighthouse**
   - Verifique PWA icons no relatório

## Dicas de Design

✅ **Boas Práticas:**
- Use design simples (funciona bem em tamanhos pequenos)
- Alto contraste entre ícone e fundo
- Evite detalhes finos (desaparecem em 16x16)
- Teste em fundo claro E escuro

❌ **Evite:**
- Textos longos
- Gradientes complexos em ícones pequenos
- Cores muito similares
- Bordas finas (< 2px)

## Placeholder Rápido (Emergência)

Se precisar de um favicon básico agora:

```bash
# Criar favicon simples com emoji
convert -size 512x512 xc:none \
  -background '#2D5016' \
  -fill white \
  -pointsize 400 \
  -font Arial-Bold \
  -gravity center \
  -annotate +0+0 '🌿' \
  -flatten icon-512x512.png
```

Depois converta para outros tamanhos usando os comandos acima.
