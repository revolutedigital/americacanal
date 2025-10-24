# 🎨 Sistema de Cores - America Cannabis E-commerce

## Guia Estratégico de Uso de Cores para Conversão

Este documento explica como usar as cores de forma estratégica para **maximizar conversões** mantendo **100% de confiança**.

---

## 📊 Hierarquia de Cores (Regra 60/30/10)

### 🟣 **60% - CORES PRINCIPAIS (Identidade & Confiança)**

#### **Primary (Roxo)**
- `primary` - #2D1B4E - Headers, textos principais, identidade
- `primary-dark` - #1A0F2E - Backgrounds premium, footer
- `primary-light` - #4A2D6B - Hover states, estados ativos
- `primary-vibrant` - #9D4EDD - 🆕 **Badges de destaque, CTAs secundários**

**Uso:**
```tsx
<div className="bg-primary text-white">Header</div>
<button className="bg-primary-vibrant">Destaque</button>
```

#### **Secondary (Dourado)**
- `secondary` - #6B5435 - Detalhes premium, preços antigos
- `secondary-light` - #8B6F47 - Backgrounds sutis
- `secondary-dark` - #4A3822 - Sombras e divisores

**Uso:**
```tsx
<span className="text-secondary line-through">R$ 599</span>
```

#### **Accent (Verde Cannabis)**
- `accent` - #5FAD56 - **CTAs principais de compra**
- `accent-dark` - #4A8C43 - Hover em botões
- `accent-light` - #7BC674 - Sucesso, disponível

**Uso:**
```tsx
<button className="btn-gradient-accent">Comprar Agora</button>
```

---

### 🎯 **30% - CORES DE CONVERSÃO (Atenção & Urgência)**

#### **Info (Cyan)** 🆕
- `info` - #00D9FF - Links informativos, tooltips
- `info-dark` - #00B8D4 - Hover
- `info-light` - #66E5FF - Backgrounds informativos

**Uso:**
```tsx
import { InfoIcon, InfoLink } from '@/components/Tooltip';

<InfoIcon content="Este produto tem frete grátis" />
<InfoLink href="/ajuda">Saiba mais</InfoLink>
```

#### **Urgent (Amarelo-Ouro)** 🆕
- `urgent` - #FFB800 - Escassez, "últimas unidades"
- `urgent-dark` - #E6A500 - Hover
- `urgent-light` - #FFD666 - Backgrounds de alerta

**Uso:**
```tsx
import { LowStockBadge } from '@/components/Badge';

<LowStockBadge quantity={3} />
```

#### **New (Pink)** 🆕
- `new` - #FF006E - "Novo!", promoções flash
- `new-dark` - #D4004E - Hover
- `new-light` - #FF3389 - Backgrounds

**Uso:**
```tsx
import { NewBadge } from '@/components/Badge';

<NewBadge />
```

---

### ⚡ **10% - CORES DE AÇÃO (Micro-detalhes)**

#### **Success** (Verde claro)
- `accent-light` - Mensagens de sucesso

#### **Warning** (Amarelo)
- `urgent` - Avisos importantes

#### **Danger** (Vermelho)
- Mantém cores padrão do Tailwind

---

## 🏷️ Componentes de Badge

### Importação
```tsx
import Badge, {
  BestSellerBadge,
  NewBadge,
  DiscountBadge,
  LowStockBadge
} from '@/components/Badge';
```

### Uso

#### **Best Seller (Roxo Vibrante)**
```tsx
<BestSellerBadge />
// Resultado: "⭐ Mais Vendido" com gradiente roxo
```

#### **Novo Produto (Pink)**
```tsx
<NewBadge />
// Resultado: "🆕 NOVO" com gradiente pink animado
```

#### **Desconto (Roxo Vibrante)**
```tsx
<DiscountBadge percentage={25} />
// Resultado: "-25% OFF" com gradiente roxo + anel branco
```

#### **Estoque Baixo (Amarelo Urgente)**
```tsx
<LowStockBadge quantity={3} />
// Resultado: "⚡ Últimas 3 unidades!" animado
```

#### **Badge Genérico**
```tsx
<Badge variant="info" size="md">
  Frete Grátis
</Badge>

// Variantes: bestseller, new, discount, lowstock, available, preorder, info, premium
// Tamanhos: sm, md, lg
// animated?: boolean
```

---

## 💊 Componentes de Pill e Tag

### Importação
```tsx
import Pill, { Tag, LabelBadge } from '@/components/Pill';
```

### Pills (Filtros, Categorias)
```tsx
<Pill variant="accent" active={true}>
  Indica
</Pill>

<Pill variant="info" onClick={() => filter('sativa')}>
  Sativa
</Pill>

<Pill variant="primary" removable onRemove={() => removeFilter()}>
  Flores
</Pill>

// Variantes: primary, accent, info, secondary, neutral
```

### Tags (Filtros pequenos)
```tsx
<Tag variant="info" onRemove={() => clearFilter()}>
  CBD > 20%
</Tag>
```

### Label Badges (Informações)
```tsx
<LabelBadge variant="info" icon="📦">
  Frete Grátis
</LabelBadge>
```

---

## 🎨 Gradientes em Botões

### Classes Disponíveis

#### **Gradiente Verde (CTAs Principais - Comprar)**
```tsx
<button className="btn-gradient-accent">
  Comprar Agora
</button>
// Sombra verde + hover com elevação
```

#### **Gradiente Roxo Vibrante (CTAs de Destaque)**
```tsx
<button className="btn-gradient-vibrant">
  Ver Ofertas Especiais
</button>
// Sombra roxa vibrante + hover com elevação
```

#### **Gradiente Cyan (Ações Secundárias)**
```tsx
<button className="btn-gradient-info">
  Saiba Mais
</button>
// Sombra cyan + hover sutil
```

#### **Gradiente Dourado (Premium)**
```tsx
<button className="btn-gradient-gold">
  Linha Premium
</button>
// Sombra dourada + texto escuro
```

### Gradientes como Classes
```tsx
<div className="gradient-vibrant p-4 rounded-lg">
  Conteúdo com fundo roxo vibrante
</div>

// Disponíveis: gradient-vibrant, gradient-accent, gradient-info, gradient-urgent, gradient-gold
```

---

## 🔄 Micro-interações com Cyan

### Tooltips
```tsx
import Tooltip, { InfoIcon, InfoLink } from '@/components/Tooltip';

<Tooltip content="Informação adicional" position="top">
  <span>Passe o mouse aqui</span>
</Tooltip>

<InfoIcon content="Este produto é orgânico" />

<InfoLink href="/termos" external>
  Ver termos completos
</InfoLink>
```

### Animações Disponíveis
```tsx
className="animate-fadeIn"     // Fade suave
className="animate-slideUp"    // Slide de baixo para cima
className="animate-glow"       // Brilho pulsante cyan
```

---

## 📐 Regras de Uso (CRO)

### ✅ O QUE FAZER

1. **CTAs de Compra:** SEMPRE use `btn-gradient-accent` (verde)
2. **Badges de Conversão:** Use `BestSellerBadge`, `DiscountBadge`
3. **Escassez:** Use `LowStockBadge` (amarelo urgente)
4. **Novidades:** Use `NewBadge` (pink) APENAS para produtos < 30 dias
5. **Informações:** Use `InfoIcon` e `InfoLink` (cyan)
6. **Filtros:** Use `Pill` componentes com variantes adequadas

### ❌ O QUE EVITAR

1. ❌ **NÃO** use pink (`new`) em CTAs principais
2. ❌ **NÃO** misture mais de 3 cores no mesmo componente
3. ❌ **NÃO** use cyan + verde juntos (podem confundir)
4. ❌ **NÃO** use cores vibrantes em textos longos
5. ❌ **NÃO** use `primary-vibrant` para texto sobre fundos escuros (use `accent`)

---

## 📈 Exemplos de Uso Estratégico

### Card de Produto
```tsx
<div className="card-product">
  {/* Badges no topo */}
  <BestSellerBadge />
  <NewBadge />
  <DiscountBadge percentage={20} />

  {/* Informação com tooltip */}
  <div className="flex items-center gap-2">
    <span>Frete Grátis</span>
    <InfoIcon content="Para compras acima de R$ 200" />
  </div>

  {/* Escassez */}
  <LowStockBadge quantity={5} />

  {/* CTA Principal */}
  <button className="btn-gradient-accent">
    Comprar Agora
  </button>
</div>
```

### Filtros de Categoria
```tsx
<div className="flex gap-2">
  <Pill variant="accent" active={filter === 'indica'} onClick={() => setFilter('indica')}>
    Indica
  </Pill>
  <Pill variant="primary" active={filter === 'sativa'} onClick={() => setFilter('sativa')}>
    Sativa
  </Pill>
  <Pill variant="info" active={filter === 'hibrida'} onClick={() => setFilter('hibrida')}>
    Híbrida
  </Pill>
</div>
```

### Homepage Banner
```tsx
<div className="gradient-vibrant p-12 rounded-2xl">
  <h2 className="text-4xl font-bold text-white mb-4">
    Ofertas Especiais
  </h2>
  <button className="btn-gradient-gold">
    Ver Linha Premium
  </button>
</div>
```

---

## 🎯 Métricas de Sucesso

Acompanhe estas métricas após implementação:

- **Taxa de cliques em badges:** +18% esperado
- **Conversão em CTAs com gradiente:** +12% esperado
- **Tempo médio na página:** +15% esperado
- **Taxa de adição ao carrinho:** Monitorar

---

## 🚀 Próximos Passos

1. Implementar badges em todos os produtos
2. Substituir botões antigos por gradientes
3. Adicionar tooltips informativos
4. Testar A/B diferentes combinações
5. Monitorar métricas de conversão

---

**Atualizado:** 2025-10-24
**Versão:** 2.0
**Status:** ✅ Implementado
