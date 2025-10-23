# Configurar Google Analytics e Facebook Pixel

## Google Analytics 4 (GA4)

### 1. Criar Conta no Google Analytics
1. Acesse: https://analytics.google.com/
2. Clique em "Começar a medir"
3. Crie uma conta e uma propriedade
4. Copie o **ID de Medição** (formato: `G-XXXXXXXXXX`)

### 2. Configurar no Site
Abra o arquivo: `/frontend/src/app/layout.tsx`

Substitua `G-XXXXXXXXXX` pelo seu ID real nas linhas:
- Linha 156: `src={https://www.googletagmanager.com/gtag/js?id=SEU-ID-AQUI}`
- Linha 164: `gtag('config', 'SEU-ID-AQUI', {`

### 3. Testar
1. Acesse seu site em produção
2. Abra o Google Analytics > Relatórios > Tempo real
3. Deve aparecer sua visita em tempo real

---

## Facebook Pixel

### 1. Criar Pixel no Facebook Business Manager
1. Acesse: https://business.facebook.com/
2. Vá em "Gerenciador de Eventos" > "Pixels"
3. Clique em "Criar Pixel"
4. Copie o **Pixel ID** (números)

### 2. Configurar no Site
Abra o arquivo: `/frontend/src/app/layout.tsx`

Substitua `YOUR_PIXEL_ID` pelo seu Pixel ID real nas linhas:
- Linha 181: `fbq('init', 'SEU-PIXEL-ID');`
- Linha 190: `src="https://www.facebook.com/tr?id=SEU-PIXEL-ID&ev=PageView&noscript=1"`

### 3. Testar
1. Instale a extensão "Facebook Pixel Helper" no Chrome
2. Acesse seu site
3. A extensão mostrará se o pixel está funcionando
4. No Facebook Business Manager > Pixels > Teste de Eventos, você verá as atividades

---

## Eventos Personalizados (Opcional)

### Google Analytics - Rastrear Compras

Para rastrear quando alguém clica em "Comprar via WhatsApp", adicione este código:

```javascript
gtag('event', 'purchase_intent', {
  'event_category': 'ecommerce',
  'event_label': 'WhatsApp Purchase',
  'value': productPrice
});
```

### Facebook Pixel - Rastrear Visualizações de Produto

```javascript
fbq('track', 'ViewContent', {
  content_name: productName,
  content_category: categoryName,
  value: productPrice,
  currency: 'BRL'
});
```

---

## Variáveis de Ambiente (Recomendado)

Para maior segurança, use variáveis de ambiente:

1. Crie um arquivo `.env.local` na pasta `frontend/`:
```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_FB_PIXEL_ID=123456789
```

2. No `layout.tsx`, substitua os IDs por:
```javascript
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
```

---

## Contatos para Ajustar

Quando tiver os IDs reais, abra o arquivo:
`/frontend/src/app/layout.tsx`

E substitua:
- `G-XXXXXXXXXX` → Seu Google Analytics ID
- `YOUR_PIXEL_ID` → Seu Facebook Pixel ID

---

## Outras Integrações Recomendadas

### Hotjar (Heatmaps e Gravações de Sessão)
- Site: https://www.hotjar.com/
- Permite ver como usuários navegam no site

### Microsoft Clarity (Gratuito)
- Site: https://clarity.microsoft.com/
- Heatmaps e gravações gratuitas

### Google Tag Manager (GTM)
- Facilita adicionar múltiplos scripts sem mexer no código
- Site: https://tagmanager.google.com/
