import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import ProductCardSSR from '@/components/ProductCardSSR';
import { Product } from '@/lib/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5177';
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.americacannabis.com';
const TENANT_ID = '0fb61585-3cb3-48b3-ae76-0a5358084a8c';

interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
}

interface CategoryContent {
  title: string;
  description: string;
  seoContent: string;
  benefits: string[];
  keywords: string[];
}

// Conteúdo SEO otimizado por categoria
const categoryContent: Record<string, CategoryContent> = {
  'vaporizadores-descartaveis': {
    title: 'Vaporizadores Descartáveis de Cannabis Premium',
    description: 'Explore nossa linha completa de vapes descartáveis com Delta 8, Delta 9 e Delta 10 THC. Tecnologia avançada, sabores intensos e máxima potência. Entrega rápida em todo Brasil.',
    seoContent: `
# Vaporizadores Descartáveis Premium - Delta THC

Os **vaporizadores descartáveis de cannabis** são a forma mais prática e moderna de consumir THC. Nossa coleção premium inclui as melhores marcas do mercado, com **Delta 8, Delta 9 e Delta 10 THC** de altíssima pureza.

## Por Que Escolher Vapes Descartáveis?

✅ **Praticidade Total**: Não precisa carregar, encher ou configurar. Use direto da embalagem.

✅ **Discrição Máxima**: Design compacto e vapor com pouco odor. Perfeito para uso discreto.

✅ **Potência Garantida**: Óleos concentrados com 90%+ de Delta THC. Efeito rápido e intenso.

✅ **Variedade de Efeitos**: Sativa (energia), Indica (relaxamento) e Híbridos (equilibrado).

✅ **Sabores Premium**: Terpenos naturais para sabor autêntico e efeito entourage.

## Marcas Premium Disponíveis

🥇 **Tree House**: Blend exclusivo Delta 8+9+10 + THC-A. 2ml de pura potência.

🥇 **Pulse**: Display digital LED mostra bateria e puffs. 5ml de duração.

🥇 **Jetter Juice**: Ultra-compacto formato pen. Ideal para viagens.

🥇 **EigthSix**: Linha intermediária com excelente custo-benefício.

## Como Escolher o Vape Ideal?

**Para Iniciantes**: Comece com Delta 8 (efeito mais suave) ou híbridos.

**Para Energia e Foco**: Escolha vapes Sativa com terpenos cítricos.

**Para Relaxamento**: Indica com terpenos relaxantes (mirceno, linalol).

**Para Potência Máxima**: Delta 9 THC-P ou HHC-P (efeito mais intenso).

## Certificação e Qualidade

Todos os nossos vaporizadores passam por testes laboratoriais rigorosos:
- ✅ COA (Certificado de Análise) disponível
- ✅ Livre de pesticidas e metais pesados
- ✅ Terpenos naturais de cannabis
- ✅ Hardware de grau médico

## Entrega Rápida e Discreta

📦 Entrega expressa para todo Brasil
🔒 Embalagem discreta e segura
💳 Pagamento facilitado
📞 Atendimento especializado via WhatsApp
    `.trim(),
    benefits: [
      'Uso imediato sem configuração',
      'Portátil e discreto',
      'Potência 90%+ Delta THC',
      'Sem combustão ou odor',
      'Testado em laboratório',
      'Variedade de sabores'
    ],
    keywords: ['vape descartável', 'delta 8', 'delta 9', 'thc vape', 'caneta vape', 'vape cannabis']
  },

  'vaporizadores-refil': {
    title: 'Cartuchos e Refis para Vaporizador - Delta THC',
    description: 'Cartuchos refil premium para vapes 510. Óleos concentrados com Delta 8, 9 e 10 THC. Compatível com qualquer bateria 510 thread. Qualidade superior garantida.',
    seoContent: `
# Cartuchos Refil Premium para Vaporizador

Cartuchos **510 thread** compatíveis com qualquer vaporizador universal. Óleo de cannabis ultra-puro com **Delta THC de altíssima concentração**.

## Vantagens dos Cartuchos Refil

✅ **Economia**: Custo por ml muito menor que descartáveis

✅ **Sustentabilidade**: Reutilize sua bateria favorita

✅ **Variedade**: Troque de sabor e efeito facilmente

✅ **Potência Controlada**: Ajuste voltagem na sua bateria

✅ **Durabilidade**: 1g de óleo rende 200-300 puffs

## Tipos de Cartucho

**510 Standard**: Compatível com 99% das baterias

**CCELL**: Tecnologia de cerâmica para vapor suave

**Live Resin**: Terpenos preservados do cultivo

**Distillate**: Óleo puro e cristalino (90%+ THC)

## Como Usar

1. Conecte o cartucho à bateria 510
2. Aguarde 1 minuto antes do primeiro puff
3. Inale suavemente por 3-5 segundos
4. Comece com voltagem baixa (2.8V-3.2V)
5. Armazene em local fresco e escuro

## Compatibilidade

Nossos cartuchos funcionam com:
- Baterias 510 universais
- Pens magnéticas
- Mods de voltagem variável
- Todos os modelos Yocan, Vessel, Ooze, etc.
    `.trim(),
    benefits: [
      'Compatível 510 thread',
      'Economia a longo prazo',
      'Troca fácil de sabores',
      'Óleo ultra-puro',
      'Sustentável e ecológico'
    ],
    keywords: ['cartucho 510', 'refil vape', 'cartridge thc', 'óleo vape', 'delta thc refil']
  },

  'comestiveis-gummy': {
    title: 'Gomas de Cannabis - CBD e THC Comestíveis Premium',
    description: 'Gomas comestíveis de CBD e THC de alta qualidade. Ursinhos, frutas e sabores variados. Efeito duradouro e dosagem precisa. A forma mais gostosa de consumir cannabis.',
    seoContent: `
# Gomas de Cannabis (Edibles) - CBD e THC

As **gomas de cannabis** são a forma mais gostosa e discreta de consumir CBD e THC. Efeito prolongado, dosagem precisa e zero odor.

## Vantagens das Gomas Comestíveis

✅ **Efeito Duradouro**: 4-8 horas de duração (vs. 2-3h do vape)

✅ **Dosagem Precisa**: Cada goma tem quantidade exata de CBD/THC

✅ **Zero Odor**: Perfeito para quem não gosta de fumaça ou vapor

✅ **Discrição Total**: Parece um doce comum

✅ **Sabor Delicioso**: Frutas naturais, sem gosto de cannabis

## Tipos de Gomas

**CBD Puro**: Relaxamento sem efeito psicoativo. Ideal para ansiedade e sono.

**THC + CBD**: Balanço perfeito para efeito suave e controlado.

**Full Spectrum**: Todos os canabinoides para efeito entourage.

**Nano-Emulsion**: Absorção 3x mais rápida (efeito em 20 min).

## Dosagem Recomendada

**Iniciantes**: 5-10mg THC ou 10-25mg CBD

**Intermediários**: 10-25mg THC ou 25-50mg CBD

**Experientes**: 25mg+ THC ou 50mg+ CBD

⚠️ **Importante**: O efeito demora 45-90 minutos. Não tome mais antes de 2 horas!

## Benefícios Terapêuticos

🌿 Alívio de ansiedade e estresse
🌿 Melhora qualidade do sono
🌿 Redução de dores crônicas
🌿 Relaxamento muscular
🌿 Melhora do humor
🌿 Estimula apetite (THC)

## Armazenamento

- Local fresco e seco (não geladeira)
- Longe da luz solar direta
- Embalagem bem fechada
- Fora do alcance de crianças e pets

## Certificação

Todas as nossas gomas são:
- ✅ Testadas em laboratório terceirizado
- ✅ Dosagem verificada e consistente
- ✅ Ingredientes naturais premium
- ✅ Sem corantes ou conservantes artificiais
    `.trim(),
    benefits: [
      'Efeito duradouro (4-8h)',
      'Dosagem precisa',
      'Sabores deliciosos',
      '100% discreto',
      'Sem fumaça ou odor'
    ],
    keywords: ['goma cbd', 'edible thc', 'ursinho cannabis', 'comestível maconha', 'gummy weed']
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const response = await fetch(
      `${API_URL}/api/categories?tenantId=${TENANT_ID}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return { title: 'Categorias | America Cannabis' };
    }

    const categories: Category[] = await response.json();
    const category = categories.find(c => c.slug === params.slug);

    if (!category) {
      return { title: 'Categoria não encontrada | America Cannabis' };
    }

    const content = categoryContent[params.slug] || {
      title: category.name,
      description: category.description || `Explore nossa categoria de ${category.name}`,
      keywords: [category.name, 'cannabis', 'brasil']
    };

    const title = `${content.title} | America Cannabis`;
    const description = content.description;

    return {
      title,
      description,
      keywords: content.keywords,
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/categorias/${params.slug}`,
        siteName: 'America Cannabis',
        locale: 'pt_BR',
        type: 'website',
      },
      alternates: {
        canonical: `${SITE_URL}/categorias/${params.slug}`
      },
      robots: {
        index: true,
        follow: true,
      }
    };
  } catch (error) {
    return { title: 'America Cannabis' };
  }
}

async function getCategory(slug: string): Promise<Category | null> {
  try {
    const response = await fetch(
      `${API_URL}/api/categories?tenantId=${TENANT_ID}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return null;

    const categories: Category[] = await response.json();
    return categories.find(c => c.slug === slug) || null;
  } catch (error) {
    return null;
  }
}

async function getCategoryProducts(categoryId: string): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/products?tenantId=${TENANT_ID}&categoryId=${categoryId}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) return [];
    return response.json();
  } catch (error) {
    return [];
  }
}

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const category = await getCategory(params.slug);

  if (!category) {
    notFound();
  }

  const products = await getCategoryProducts(category.id);
  const content = categoryContent[params.slug];

  const breadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Produtos', href: '/produtos' },
    { label: category.name, href: `/categorias/${params.slug}` },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow" id="main-content">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-primary via-primary-vibrant to-primary text-white py-16">
          <div className="container mx-auto px-4">
            <Breadcrumbs items={breadcrumbs} />

            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {content?.title || category.name}
            </h1>

            <p className="text-xl text-white/90 max-w-3xl mb-6">
              {content?.description || category.description}
            </p>

            <div className="flex flex-wrap gap-4">
              {content?.benefits.map((benefit, i) => (
                <span key={i} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  ✓ {benefit}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* SEO Content */}
          {content && (
            <div className="prose prose-lg max-w-none mb-12 bg-white rounded-xl p-8 shadow-lg">
              <div dangerouslySetInnerHTML={{ __html: content.seoContent.replace(/\n/g, '<br/>') }} />
            </div>
          )}

          {/* Products Grid */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2">
              {products.length} {products.length === 1 ? 'Produto' : 'Produtos'} Disponíveis
            </h2>
            <p className="text-gray-600">
              Todos os produtos com entrega rápida e segura para todo Brasil
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCardSSR key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-xl text-gray-600">
                Nenhum produto disponível nesta categoria no momento.
              </p>
              <a href="/produtos" className="mt-4 inline-block text-primary hover:underline font-semibold">
                Ver todos os produtos →
              </a>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
