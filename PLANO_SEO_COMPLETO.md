# 🚀 Plano Completo de SEO - America Cannabis

**Data de criação:** 25 de Outubro de 2025
**Objetivo:** Implementar melhorias completas de SEO para maximizar o ranking orgânico
**Status:** Em execução

---

## 📊 Análise Inicial

### ✅ O que já está funcionando bem:
- Descrições dos produtos otimizadas (900+ caracteres)
- Sitemap XML dinâmico
- Robots.txt configurado
- Schema.org básico (Product, Organization, Breadcrumb)
- Open Graph tags
- HTTPS e segurança
- Mobile responsive

### ❌ O que precisa ser melhorado:
- Meta tags genéricas (não personalizadas por produto)
- URLs com UUID ao invés de slugs amigáveis
- Sem alt text nas imagens
- Estrutura de headings poderia ser melhor
- Faltam páginas de categoria SEO-friendly
- Sistema de reviews desativado
- Sem FAQ schema
- Sem blog/conteúdo educacional
- Open Graph images genéricas

---

## 🎯 Plano de Execução

### **FASE 1 - Quick Wins (Alta Prioridade)** 🔥

#### 1.1. Meta Tags Personalizadas por Produto
**Objetivo:** Gerar metaTitle, metaDescription e metaKeywords únicos para cada produto

**Implementação:**
- Script para gerar meta tags baseadas nas descrições otimizadas
- Adicionar campos no banco de dados
- Atualizar 95 produtos com meta tags personalizadas
- Modificar página de produto para usar meta tags dinâmicas

**Exemplo:**
```
metaTitle: "Tree House Sativa 2ml - Delta 8/9/10 THC-A | America Cannabis"
metaDescription: "Vape premium Tree House Sativa 2ml. Blend exclusivo Delta 8, 9 e 10 + THC-A. 90%+ potência. Energia e foco. Entrega em todo Brasil. ⚡"
metaKeywords: "tree house sativa, delta 8, delta 9, delta 10, thc-a, vape cannabis"
```

**Impacto:** ⭐⭐⭐ CRÍTICO - Melhora CTR em 20-40%

**Arquivos afetados:**
- `backend/generate-seo-metadata.js` (novo)
- `backend/prisma/schema.prisma` (campos já existem)
- `frontend/src/app/produtos/[id]/page.tsx`

---

#### 1.2. Alt Text nas Imagens
**Objetivo:** Adicionar texto alternativo descritivo em todas as imagens

**Implementação:**
- Atualizar componente ProductGallery
- Atualizar ProductCard/ProductCardSSR
- Adicionar alt text nas imagens do header/footer
- Seguir padrão: "{Nome do Produto} - {Categoria} | America Cannabis"

**Impacto:** ⭐⭐⭐ ALTO - Google Imagens + Acessibilidade

**Arquivos afetados:**
- `frontend/src/components/ProductGallery.tsx`
- `frontend/src/components/ProductCard.tsx`
- `frontend/src/components/ProductCardSSR.tsx`
- `frontend/src/components/Header.tsx`

---

#### 1.3. URLs com Slug ao invés de UUID
**Objetivo:** Transformar `/produtos/ac421e35-37b2...` em `/produtos/tree-house-sativa-2ml`

**Implementação:**
- Backend: Criar rota `/api/products/slug/:slug`
- Frontend: Atualizar roteamento dinâmico para aceitar slug
- Manter compatibilidade com UUID antigo (redirect 301)
- Atualizar todos os links internos
- Atualizar sitemap para usar slugs

**Impacto:** ⭐⭐⭐ ALTO - URLs descritivas rankeiam melhor

**Arquivos afetados:**
- `backend/src/routes/productRoutes.ts`
- `frontend/src/app/produtos/[slug]/page.tsx` (renomear de [id])
- `frontend/src/components/*` (atualizar links)
- `frontend/src/app/sitemap.ts`

---

#### 1.4. Estrutura de Headings (H1, H2, H3)
**Objetivo:** Hierarquia semântica correta para SEO

**Implementação:**
- H1: Único - Nome do produto
- H2: Seções principais (Sobre, Especificações, Benefícios, Reviews)
- H3: Subseções dentro de cada H2

**Impacto:** ⭐⭐ MÉDIO - Melhor compreensão pelo Google

**Arquivos afetados:**
- `frontend/src/app/produtos/[slug]/page.tsx`
- `frontend/src/components/ProductBenefits.tsx`
- `frontend/src/components/ProductTestimonials.tsx`

---

### **FASE 2 - Médio Prazo (Semana 1-2)** 🎯

#### 2.1. Páginas de Categoria SEO-Friendly
**Objetivo:** Criar `/categorias/vapes`, `/categorias/flores`, etc.

**Implementação:**
- Criar rota dinâmica `/categorias/[slug]`
- Adicionar conteúdo introdutório (300+ palavras) por categoria
- Meta tags personalizadas por categoria
- Schema.org CollectionPage
- Internal linking para produtos

**Exemplo de conteúdo:**
```markdown
# Vapes de Cannabis Premium - Delta THC
Descubra nossa linha completa de vapes premium com Delta 8, 9 e 10...
[300 palavras de conteúdo otimizado]
```

**Impacto:** ⭐⭐⭐ ALTO - Rankear para termos de categoria

**Arquivos novos:**
- `frontend/src/app/categorias/[slug]/page.tsx`
- `backend/src/routes/categoryContent.ts`

---

#### 2.2. Sistema de Reviews e Ratings
**Objetivo:** Ativar avaliações para rich snippets

**Implementação:**
- Descomentar componente ProductReviews
- Ativar interface de adicionar review
- Implementar AggregateRating no Schema.org
- Moderar reviews antes de publicar

**Impacto:** ⭐⭐⭐ MUITO ALTO - Estrelas no Google = +30% CTR

**Arquivos afetados:**
- `frontend/src/app/produtos/[slug]/page.tsx` (descomentar)
- `frontend/src/components/ProductReviews.tsx`
- `frontend/src/lib/schema.ts` (adicionar aggregateRating)
- `backend/src/routes/reviewRoutes.ts`

---

#### 2.3. FAQ Schema por Produto
**Objetivo:** Aparecer em "People Also Ask" do Google

**Implementação:**
- Criar componente ProductFAQ
- Definir 5-8 perguntas frequentes por tipo de produto
- Implementar FAQPage schema
- Interface admin para gerenciar FAQs

**Exemplo:**
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    {
      "questionName": "Quanto tempo dura o Tree House Sativa?",
      "acceptedAnswer": "Aproximadamente 400 puffs, 1-2 semanas de uso..."
    }
  ]
}
```

**Impacto:** ⭐⭐⭐ ALTO - Featured snippets no Google

**Arquivos novos:**
- `frontend/src/components/ProductFAQ.tsx`
- `frontend/src/lib/schema.ts` (adicionar generateFAQSchema)
- `backend/prisma/schema.prisma` (modelo FAQ)

---

#### 2.4. Open Graph Images Dinâmicas
**Objetivo:** Cada produto compartilha sua própria imagem

**Implementação:**
- Usar imageUrl do produto como og:image
- Gerar meta tags dinâmicas por produto
- Adicionar og:image:width e og:image:height
- Otimizar imagens para 1200x630px

**Impacto:** ⭐⭐ MÉDIO - Melhor compartilhamento social

**Arquivos afetados:**
- `frontend/src/app/produtos/[slug]/page.tsx`

---

### **FASE 3 - Longo Prazo (Contínuo)** 📈

#### 3.1. Blog com Conteúdo Educacional
**Objetivo:** Tráfego orgânico via conteúdo informacional

**Implementação:**
- Criar estrutura `/blog` e `/blog/[slug]`
- CMS para gerenciar posts (ou arquivos MD)
- Schema.org BlogPosting e Article
- Sitemap incluindo posts do blog
- 20+ artigos iniciais

**Tópicos sugeridos:**
1. "Delta 8 vs Delta 9 vs Delta 10: Diferenças e Efeitos"
2. "Como Escolher o Melhor Vape de Cannabis"
3. "Guia Completo de Dosagem de THC"
4. "Benefícios do CBD para Ansiedade e Sono"
5. "Vape vs Flor: Qual a Melhor Forma de Consumo?"
6. "Como Identificar Cannabis de Qualidade"
7. "Terpenos: O Que São e Por Que Importam"
8. "Efeitos Sativa vs Indica: Qual Escolher?"
9. "Legalidade da Cannabis no Brasil"
10. "Como Armazenar Produtos de Cannabis"

**Impacto:** ⭐⭐⭐ MUITO ALTO - Tráfego orgânico massivo

**Arquivos novos:**
- `frontend/src/app/blog/page.tsx`
- `frontend/src/app/blog/[slug]/page.tsx`
- `frontend/src/content/posts/*.md`
- `frontend/src/lib/markdown.ts`

---

#### 3.2. Internal Linking Strategy
**Objetivo:** Distribuir autoridade entre páginas

**Implementação:**
- Links contextuais nas descrições de produtos
- "Produtos relacionados" (já existe ✅)
- Links de categoria no header
- Breadcrumbs com links (já existe ✅)
- Footer com mapa do site
- Links de blog para produtos relevantes

**Impacto:** ⭐⭐ MÉDIO - Melhor distribuição de PageRank

**Arquivos afetados:**
- `frontend/src/components/Footer.tsx`
- `frontend/src/components/Header.tsx`
- Todos os componentes de produto

---

#### 3.3. LocalBusiness Schema
**Objetivo:** SEO local se houver loja física

**Implementação:**
- Adicionar endereço físico ao schema
- Horário de funcionamento
- Áreas de atendimento
- Google My Business integration

**Impacto:** ⭐ MÉDIO - "cannabis perto de mim"

**Arquivos afetados:**
- `frontend/src/app/layout.tsx`
- `frontend/src/lib/schema.ts`

---

#### 3.4. Otimizações de Performance
**Objetivo:** Core Web Vitals perfeitos

**Checklist:**
- [ ] Lazy loading de imagens (Next.js já faz ✅)
- [ ] Converter imagens para WebP
- [ ] Comprimir imagens (80% qualidade)
- [ ] CDN para assets estáticos
- [ ] Preload de fonts críticas
- [ ] Code splitting otimizado
- [ ] Service Worker para cache
- [ ] Minificar CSS/JS (Next.js já faz ✅)

**Impacto:** ⭐⭐⭐ ALTO - Performance é fator de ranking

**Ferramentas:**
- Google PageSpeed Insights
- Lighthouse CI
- WebPageTest

---

## 📝 Checklist de Implementação

### Fase 1 - Quick Wins
- [ ] 1.1. Gerar meta tags para 95 produtos
- [ ] 1.2. Adicionar alt text em todas as imagens
- [ ] 1.3. Implementar URLs com slug (backend)
- [ ] 1.4. Atualizar frontend para slugs
- [ ] 1.5. Melhorar estrutura de headings

### Fase 2 - Médio Prazo
- [ ] 2.1. Criar páginas de categoria
- [ ] 2.2. Ativar sistema de reviews
- [ ] 2.3. Implementar FAQ schema
- [ ] 2.4. Open Graph images dinâmicas

### Fase 3 - Longo Prazo
- [ ] 3.1. Criar estrutura de blog
- [ ] 3.2. Escrever 20 artigos iniciais
- [ ] 3.3. Internal linking strategy
- [ ] 3.4. LocalBusiness schema
- [ ] 3.5. Otimizar performance

---

## 📊 Métricas de Sucesso

### KPIs a monitorar:
1. **Posição média no Google** (Google Search Console)
   - Meta: Top 3 para palavras-chave principais

2. **Tráfego orgânico** (Google Analytics)
   - Meta: +200% em 3 meses

3. **CTR nos resultados** (Search Console)
   - Meta: >5% (média da indústria: 2-3%)

4. **Páginas indexadas** (Search Console)
   - Meta: 100% das páginas importantes

5. **Core Web Vitals** (PageSpeed Insights)
   - Meta: 90+ em todas as métricas

6. **Backlinks** (Ahrefs/SEMrush)
   - Meta: 50+ backlinks de qualidade em 6 meses

### Palavras-chave alvo:
- "vape cannabis brasil"
- "delta 8 brasil"
- "cbd oil brasil"
- "flores de cannabis"
- "produtos cannabis online"
- "thc legal brasil"
- "comprar cannabis medicinal"

---

## 🛠️ Ferramentas Necessárias

### SEO:
- Google Search Console
- Google Analytics 4
- Google Tag Manager
- Ahrefs ou SEMrush
- Screaming Frog

### Performance:
- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- GTmetrix

### Testing:
- Google Rich Results Test
- Schema.org Validator
- Mobile-Friendly Test

---

## 📅 Timeline Estimado

| Fase | Duração | Data Início | Data Fim |
|------|---------|-------------|----------|
| Fase 1 | 2-3 dias | 25/10/2025 | 28/10/2025 |
| Fase 2 | 1-2 semanas | 28/10/2025 | 08/11/2025 |
| Fase 3 | Contínuo | 08/11/2025 | Ongoing |

**Primeira revisão:** 30 dias após conclusão da Fase 2
**Meta final:** Top 3 rankings em 90 dias

---

## 🎯 Próximos Passos Imediatos

1. ✅ Criar este documento de plano
2. ⏳ Gerar meta tags personalizadas para todos os produtos
3. ⏳ Adicionar alt text nos componentes
4. ⏳ Implementar URLs com slug
5. ⏳ Deploy e validação

---

**Responsável:** Claude Code
**Última atualização:** 25/10/2025
**Status geral:** 🟢 Em andamento
