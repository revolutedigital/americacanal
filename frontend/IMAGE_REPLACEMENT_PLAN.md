# 📸 Plano de Substituição de Imagens Unsplash

**Status**: Bloqueado - Aguardando fotos reais dos produtos
**Data**: 2025-11-06
**Prioridade**: Alta (afeta SEO e conversão)

## 📊 Análise Atual

### Imagens Unsplash Identificadas

**Total**: 53 posts de blog com imagens Unsplash

#### 1. Artigos Educacionais (26 posts)
Posts IDs: 1-20 + alguns extras

Categorias afetadas:
- Guia do Iniciante: 5 posts
- Saúde & Bem-Estar: 9 posts
- Legislação & Regulamentação: 3 posts
- Ciência & Pesquisa: 3 posts
- Produtos & Reviews: 6 posts

#### 2. Reviews de Produtos (27 posts)
Posts com IDs iniciando com:
- `product-[UUID]`: Reviews de produtos específicos (7 posts)
- `brand-[UUID]`: Páginas de marca (20 posts)

**Problema Crítico**: Os produtos no banco de dados TAMBÉM usam imagens Unsplash, não apenas os posts do blog.

## 🚨 Blockers Identificados

### 1. Produtos sem Fotos Reais
```bash
# Exemplo de produto verificado:
# ID: 9b31e3e7-19a2-498d-a85d-131f7854a338
# Nome: Stoney Cat Lemon Pez 3.5g
# Imagem: https://images.unsplash.com/photo-1615486511262-2558ca0cc2ea?w=800

# Status: UNSPLASH PLACEHOLDER
```

**Conclusão**: Não existem fotos reais disponíveis nem no:
- ✗ Banco de dados (backend)
- ✗ Pasta /public do frontend
- ✗ Qualquer CDN/storage configurado

### 2. Necessidade de Fotografia de Produto

Para substituir completamente as imagens, será necessário:

1. **Fotografar todos os produtos** (~100 produtos no catálogo)
   - Produtos Indica: 15
   - Produtos Sativa: 18
   - Produtos Híbrida: 15
   - Outros produtos: ~52

2. **Criar imagens para artigos educacionais** (26 imagens)
   - Podem usar fotos dos produtos
   - Ou criar ilustrações/designs customizados
   - Ou comprar stock photos de qualidade (não Unsplash)

## 🎯 Estratégia de Substituição

### Fase 1: Produtos (Prioridade ALTA)
**Impacto**: Afeta 27 blog posts + páginas de produto

1. **Contratar fotógrafo de produtos** ou
2. **Fotografar in-house** com setup profissional:
   - Lightbox/tenda de iluminação
   - Câmera DSLR ou iPhone 14+ Pro
   - Fundo branco/neutro
   - Ângulos consistentes (front, 45°, top-down)

**Especificações das fotos**:
```
Formato: JPEG ou WebP
Resolução mínima: 1200x1200px (quadrado)
Qualidade: 85-90%
Background: Branco limpo (#FFFFFF)
Estilo: Clean, product-forward, consistente
```

3. **Upload para CDN**:
   - Opção A: Railway Volumes (já configurado)
   - Opção B: Cloudinary/ImageKit (otimização automática)
   - Opção C: S3/R2 (mais controle)

4. **Atualizar banco de dados**:
   ```sql
   UPDATE products
   SET images = '["https://cdn.americacannabis.com/products/{sku}-1.webp"]'
   WHERE id = 'UUID';
   ```

5. **Script de migração automática** (fornecido abaixo)

### Fase 2: Artigos Educacionais (Prioridade MÉDIA)
**Impacto**: 26 blog posts

Opções:
1. **Usar fotos de produtos relevantes** (custo $0)
   - Ex: Post sobre "CBD e Ansiedade" → usar foto de óleo CBD

2. **Stock photos premium** (custo ~$10-30/imagem)
   - Shutterstock, Adobe Stock, iStock
   - Evitar Unsplash (reconhecível demais)

3. **Ilustrações customizadas** (custo ~$50-200/imagem)
   - Contratar designer no Fiverr/99designs
   - Estilo único e profissional

### Fase 3: Top 10 Articles (Prioridade BAIXA)
**Status**: Posts 21-23 (Top 10 Indica/Sativa/Híbrida)

Esses posts podem usar:
- Collage dos produtos mencionados
- Hero image com múltiplos produtos
- Aguardar fotos dos produtos

## 🛠️ Scripts de Migração

### Script 1: Substituir Imagens de Produtos
```python
# /frontend/replace_product_images.py
import json
import requests

TENANT_ID = "3aac40a2-42a8-4db4-8f46-d044844c618d"
API_URL = "https://backend-production1.up.railway.app"

def update_blog_images():
    """
    Busca imagens reais dos produtos via API e atualiza blog-posts.json
    """

    with open('src/data/blog-posts.json', 'r') as f:
        posts = json.load(f)

    updated = 0

    for post in posts:
        # Só processar posts de produtos/marcas
        if not (post['id'].startswith('product-') or post['id'].startswith('brand-')):
            continue

        # Só processar se ainda tem Unsplash
        if 'unsplash' not in post.get('imageUrl', '').lower():
            continue

        # Extrair ID do produto
        product_id = post['id'].replace('product-', '').replace('brand-', '')

        # Buscar produto na API
        try:
            response = requests.get(
                f"{API_URL}/api/products/{product_id}",
                params={"tenantId": TENANT_ID}
            )

            if response.status_code == 200:
                product = response.json()
                images = product.get('images', [])

                # Verificar se tem imagem real (não Unsplash)
                if images and 'unsplash' not in images[0].lower():
                    post['imageUrl'] = images[0]
                    updated += 1
                    print(f"✅ Atualizado: {post['slug']}")
                else:
                    print(f"⚠️  Produto ainda usa Unsplash: {post['slug']}")
            else:
                print(f"❌ Erro ao buscar: {post['slug']}")

        except Exception as e:
            print(f"❌ Erro: {post['slug']} - {e}")

    # Salvar alterações
    with open('src/data/blog-posts.json', 'w') as f:
        json.dump(posts, f, indent=2, ensure_ascii=False)

    print(f"\n📊 Total atualizado: {updated} posts")

if __name__ == "__main__":
    update_blog_images()
```

### Script 2: Mapear Imagens Necessárias
```python
# /frontend/list_required_images.py
import json

def list_required_images():
    """
    Gera lista de imagens que precisam ser criadas/fotografadas
    """

    with open('src/data/blog-posts.json', 'r') as f:
        posts = json.load(f)

    # Separar por tipo
    product_posts = []
    educational_posts = []

    for post in posts:
        if 'unsplash' not in post.get('imageUrl', '').lower():
            continue

        if post['id'].startswith('product-') or post['id'].startswith('brand-'):
            product_id = post['id'].replace('product-', '').replace('brand-', '')
            product_posts.append({
                'slug': post['slug'],
                'title': post['title'],
                'product_id': product_id
            })
        else:
            educational_posts.append({
                'id': post['id'],
                'slug': post['slug'],
                'title': post['title'],
                'category': post.get('category', {}).get('name', 'N/A')
            })

    # Salvar listas
    with open('IMAGE_REQUIRED_PRODUCTS.json', 'w') as f:
        json.dump(product_posts, f, indent=2, ensure_ascii=False)

    with open('IMAGE_REQUIRED_EDUCATIONAL.json', 'w') as f:
        json.dump(educational_posts, f, indent=2, ensure_ascii=False)

    print(f"📦 Produtos que precisam de fotos: {len(product_posts)}")
    print(f"📚 Artigos educacionais que precisam de imagens: {len(educational_posts)}")
    print("\nArquivos criados:")
    print("  - IMAGE_REQUIRED_PRODUCTS.json")
    print("  - IMAGE_REQUIRED_EDUCATIONAL.json")

if __name__ == "__main__":
    list_required_images()
```

## 📋 Checklist de Ação

### Imediato (Esta Sprint)
- [x] Identificar todos os posts com Unsplash (53 posts)
- [x] Confirmar que produtos não têm fotos reais
- [x] Criar plano de substituição
- [ ] Executar script de mapeamento de imagens necessárias
- [ ] Apresentar relatório ao cliente/dono do produto

### Curto Prazo (Próxima Sprint)
- [ ] Decisão: fotografar in-house ou contratar fotógrafo?
- [ ] Se fotografar: comprar/preparar equipment
- [ ] Se contratar: briefing e cotação
- [ ] Definir estilo visual e guidelines de fotografia
- [ ] Escolher CDN/storage para hospedar imagens

### Médio Prazo (2-4 semanas)
- [ ] Fotografar top 20 produtos mais vendidos
- [ ] Upload e configuração no backend
- [ ] Executar script de substituição automática
- [ ] Testar em staging
- [ ] Deploy para produção

### Longo Prazo (1-2 meses)
- [ ] Completar fotografia de todos os produtos
- [ ] Criar/adquirir imagens para artigos educacionais
- [ ] Atualizar todos os 53 posts
- [ ] Remover configuração de Unsplash do next.config.js
- [ ] Documentar processo para futuros produtos

## 💰 Estimativa de Custos

### Opção 1: Fotografia In-House
- Setup inicial: $200-500 (lightbox, tripé, backdrop)
- Tempo: ~5-10 min por produto
- Total: ~10-15 horas para 100 produtos
- **Custo total**: $200-500 (one-time) + tempo interno

### Opção 2: Fotógrafo Profissional
- Custo por foto: $10-30
- Total: 100 produtos × $20 = $2,000
- **Custo total**: $2,000-3,000

### Opção 3: Híbrido
- Fotografar top 30 produtos in-house: $300 setup
- Contratar para produtos complexos: 20 × $25 = $500
- **Custo total**: $800-1,000

## 🎯 Recomendação

**Opção Recomendada**: Opção 3 (Híbrido)

**Justificativa**:
1. Setup in-house útil para futuros produtos
2. Controle de qualidade e timing
3. Economia comparado a fotografar tudo externamente
4. Flexibilidade para re-shoots

**Priorização**:
1. **Semana 1**: Top 10 produtos mais vendidos (fotografia urgente)
2. **Semana 2-3**: Produtos featured e em promoção
3. **Semana 4+**: Catálogo completo

## 📞 Próximos Passos

1. **Executar script de mapeamento** (fornecido acima)
2. **Reunião com stakeholders** para decisão de fotografia
3. **Budget approval** para equipment ou fotógrafo
4. **Início imediato** com top 10 produtos

---

**Última atualização**: 2025-11-06
**Responsável**: Equipe Tech + Marketing
**Status**: Aguardando decisão sobre fotografia
