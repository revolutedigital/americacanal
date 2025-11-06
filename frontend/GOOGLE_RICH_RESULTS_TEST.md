# Google Rich Results Test - America Cannabis Blog

## 📊 Status do Schema.org Structured Data

Implementamos os seguintes schemas nos artigos do blog:

### ✅ Schemas Implementados

1. **BlogPosting** - Todos os artigos
2. **Product** - Artigos de review (30 artigos)
3. **Review** - Artigos de review
4. **AggregateRating** - Artigos de review
5. **Author/Organization** - Todos os artigos
6. **BreadcrumbList** - Todos os artigos

---

## 🧪 URLs para Testar no Google Rich Results Test

Use a ferramenta: https://search.google.com/test/rich-results

### 🔍 Product Reviews (Prioridade Alta)

Estes artigos incluem **Product Schema** completo com reviews e ratings:

```
https://www.americacannabis.com/blog/review-tree-house-2ml-delta-8-9-10-thc-a-sativa
https://www.americacannabis.com/blog/review-tree-house-2ml-delta-8-9-10-thc-a-hibrida
https://www.americacannabis.com/blog/review-torch-dimound-5g-delta-9-thc-a-p-sativa
https://www.americacannabis.com/blog/review-torch-dimound-5g-delta-9-thc-a-p-indica
https://www.americacannabis.com/blog/review-hallu-monkey-2ml-thc-delta-8-sativa
```

**Resultado Esperado:**
- ✅ Product Rich Snippet
- ✅ Review Rich Snippet
- ✅ Aggregate Rating
- ✅ Price Information
- ✅ Availability Status

---

### 📚 Blog Articles (Prioridade Média)

Artigos educacionais com **BlogPosting Schema**:

```
https://www.americacannabis.com/blog/o-que-e-cbd-guia-completo
https://www.americacannabis.com/blog/diferenca-cbd-thc
https://www.americacannabis.com/blog/cbd-para-ansiedade-funciona
https://www.americacannabis.com/blog/cannabis-medicinal-brasil-lei
```

**Resultado Esperado:**
- ✅ Article Rich Snippet
- ✅ Author Information
- ✅ Breadcrumb Navigation
- ✅ Published/Modified Dates

---

### 🌿 Type & Category Articles

Artigos sobre tipos e categorias de cannabis:

```
https://www.americacannabis.com/blog/cannabis-indica
https://www.americacannabis.com/blog/cannabis-sativa
https://www.americacannabis.com/blog/cannabis-hibrida
```

---

## 🔍 Como Testar

### Método 1: Google Rich Results Test (Recomendado)

1. Acesse: https://search.google.com/test/rich-results
2. Cole uma das URLs acima
3. Clique em "Test URL"
4. Aguarde a análise (pode demorar 10-30 segundos)
5. Verifique se há erros ou avisos

### Método 2: Schema Markup Validator

1. Acesse: https://validator.schema.org/
2. Cole a URL do artigo
3. Clique em "Run Test"
4. Revise os schemas detectados

### Método 3: Teste Local (Durante Desenvolvimento)

```bash
# Iniciar o servidor de desenvolvimento
cd frontend
npm run dev

# Abrir no navegador
http://localhost:5178/blog/review-tree-house-2ml-delta-8-9-10-thc-a-sativa

# Ver o schema no código fonte (View Source)
# Procurar por: <script type="application/ld+json">
```

---

## ✅ Checklist de Validação

Para cada artigo testado, verificar:

### Product Reviews:
- [ ] Product Schema presente
- [ ] Review Schema presente
- [ ] AggregateRating com ratingValue
- [ ] Offers com price e availability
- [ ] Brand information
- [ ] Image URL válida
- [ ] Sem erros críticos

### Blog Articles:
- [ ] BlogPosting Schema presente
- [ ] Author/Organization presente
- [ ] Headline e description
- [ ] Image URL válida
- [ ] datePublished e dateModified
- [ ] BreadcrumbList presente
- [ ] Sem erros críticos

---

## 📈 Estrutura do Product Schema

Exemplo de schema gerado para produtos:

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Tree House 2ml Delta 8 / 9 / 10 Thc A - Sativa",
  "image": "https://www.americacannabis.com/uploads/...",
  "description": "Análise completa do Tree House 2ml...",
  "brand": {
    "@type": "Brand",
    "name": "Premium"
  },
  "offers": {
    "@type": "Offer",
    "url": "https://www.americacannabis.com/produtos/ac421e35-37b2-4ef5-badc-af4e0c96abf1",
    "priceCurrency": "BRL",
    "price": 400.00,
    "availability": "https://schema.org/InStock",
    "priceValidUntil": "2026-03-01"
  },
  "review": {
    "@type": "Review",
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": "4.5",
      "bestRating": "5"
    },
    "author": {
      "@type": "Organization",
      "name": "America Cannabis"
    },
    "datePublished": "2025-03-01T00:00:00Z",
    "reviewBody": "..."
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "1"
  }
}
```

---

## 🐛 Problemas Comuns e Soluções

### ❌ "Missing required field 'image'"
**Solução:** Todas as imagens já estão configuradas com URLs absolutas

### ❌ "Invalid price format"
**Solução:** Prices estão em formato numérico com 2 casas decimais

### ⚠️ "Low review count"
**Solução:** Esperado - artigos novos começam com 1 review. Aumentará organicamente.

### ❌ "priceValidUntil is in the past"
**Solução:** priceValidUntil está configurado para +1 ano da data atual

---

## 📊 Resultados Esperados

### Score Atual: **8.5/10**

Com schemas validados, esperamos:
- ✅ Rich Snippets em 100% dos artigos
- ✅ Product Rich Results em reviews
- ✅ Breadcrumb navigation
- ✅ Author/Organization info
- ✅ Ratings visíveis no Google

---

## 🚀 Próximos Passos

Após validação:

1. ✅ Submit sitemap ao Google Search Console
2. ✅ Request indexação dos artigos principais
3. ✅ Monitorar Rich Results no GSC
4. ✅ Verificar CTR improvement (7-14 dias)
5. ✅ Expandir para 95 artigos quando backend estiver disponível

---

## 📞 Suporte

Se encontrar erros durante o teste:
1. Copiar mensagem de erro completa
2. Verificar qual schema está causando o erro
3. Consultar documentação: https://schema.org/
4. Ajustar código em `frontend/src/lib/blog-schema.ts`

---

**Última atualização:** 2025-11-06
**Status:** ✅ Pronto para teste
**Total de artigos:** 54 (30 reviews + 24 outros)
