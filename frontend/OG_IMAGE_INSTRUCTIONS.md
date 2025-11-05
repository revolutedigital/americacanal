# Instruções para Criar OG Image

## Opção 1: Usar HTML Template (Recomendado)

O arquivo `/public/og-template.html` contém um template pronto para converter em imagem.

### Método A: Screenshot Online
1. Acesse: https://htmlcsstoimage.com/
2. Cole o conteúdo de `og-template.html`
3. Ajuste dimensões para **1200x630px**
4. Baixe como `og-image.jpg`
5. Coloque em `/public/og-image.jpg`

### Método B: Puppeteer (Node.js)
```bash
npm install puppeteer

node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  await page.goto('file://' + __dirname + '/public/og-template.html');
  await page.screenshot({ path: 'public/og-image.jpg', quality: 90 });
  await browser.close();
})();
"
```

## Opção 2: Usar Canva (Mais Simples)

1. Acesse [Canva.com](https://canva.com)
2. Crie design personalizado: **1200 x 630 px**
3. Use o template sugerido:

### Elementos do Design:
- **Fundo**: Gradiente roxo (#8B5CF6) → verde (#2D5016)
- **Logo**: "AMERICA CANNABIS" (fonte bold, tamanho 72px, branco)
- **Tagline**: "Produtos Premium de Cannabis Certificados" (48px)
- **Badges**:
  - 🔬 GMP Certificado
  - ⚡ Entrega Rápida
  - 🛡️ 100% Seguro

4. Exporte como **JPG (qualidade alta)**
5. Salve como `/public/og-image.jpg`

## Opção 3: Usar Figma

1. Crie frame 1200x630px
2. Importe design do Canva ou crie do zero
3. Exporte como JPG 2x
4. Salve em `/public/og-image.jpg`

## Opção 4: IA Generativa (Midjourney/DALL-E)

Use o prompt:
```
Social media banner for cannabis e-commerce, 1200x630px, modern minimalist design.
Background gradient from purple (#8B5CF6) to dark green (#2D5016).
Center text: "AMERICA CANNABIS - Produtos Premium de Cannabis"
Three badges at bottom: "GMP Certified" "Fast Delivery" "100% Secure"
Professional, clean, premium aesthetic. No photos, geometric shapes only.
--ar 1200:630
```

## Verificação

Após criar a imagem, verifique:
- [ ] Tamanho: **exatamente 1200x630px**
- [ ] Formato: JPG ou PNG
- [ ] Peso: < 300KB (otimizar se necessário)
- [ ] Localização: `/public/og-image.jpg`
- [ ] Textos legíveis em thumbnail pequeno
- [ ] Cores compatíveis com identidade visual

## Teste

Teste a OG image em:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)

## Placeholder Temporário

Se precisar de um placeholder imediato, use este comando para criar uma imagem sólida:

```bash
convert -size 1200x630 gradient:'#8B5CF6'-'#2D5016' \
  -gravity center -pointsize 72 -fill white \
  -annotate +0+0 'AMERICA CANNABIS' \
  public/og-image.jpg
```

(Requer ImageMagick instalado: `brew install imagemagick`)
