# PLANO DE IMPLEMENTAÇÃO UX - AMERICA CANNABIS
## Avaliação Final: 8.2/10 → Meta: 9.5/10

---

## VISÃO GERAL

Este documento detalha o plano de implementação das melhorias UX identificadas na avaliação enterprise. As implementações estão priorizadas em 4 fases (P0-P3) com estimativas de tempo e complexidade.

**Objetivo**: Elevar a nota UX de 8.2 para 9.5+ através de melhorias incrementais e mensuráveis.

---

## FASE 1 - CRÍTICO (P0) - Sprint 1 (2-3 dias)

### 1. Implementar Menu Mobile Hamburger
**Impacto**: CRÍTICO - Header não funciona em mobile
**Complexidade**: Média
**Tempo estimado**: 4-6 horas
**Responsável**: Frontend Dev

**Tarefas**:
- [ ] Criar componente `MobileMenu.tsx`
- [ ] Adicionar estado de menu aberto/fechado
- [ ] Implementar animação de slide-in/out
- [ ] Adicionar backdrop overlay com blur
- [ ] Integrar com Header existente
- [ ] Adicionar breakpoint de exibição (< 768px)
- [ ] Implementar close on route change
- [ ] Testar em dispositivos reais (iOS/Android)

**Critérios de aceite**:
- Menu funcional em telas < 768px
- Animação suave (300ms)
- Acessível via teclado (ESC para fechar)
- ARIA labels corretos
- Sem scroll body quando menu aberto

**Arquivos a modificar**:
- `frontend/src/components/Header.tsx`
- `frontend/src/components/MobileMenu.tsx` (novo)
- `frontend/src/app/globals.css` (animações)

---

### 2. Melhorar Contraste de Cores
**Impacto**: ALTO - Acessibilidade WCAG AAA
**Complexidade**: Baixa
**Tempo estimado**: 1-2 horas
**Responsável**: Frontend Dev + Designer

**Tarefas**:
- [ ] Auditar cores com ferramenta de contraste (WebAIM)
- [ ] Ajustar `secondary.DEFAULT` de #8B6F47 para cor mais escura
- [ ] Ajustar `secondary.light` se necessário
- [ ] Testar contraste em todos os componentes
- [ ] Validar WCAG AAA (7:1) em textos
- [ ] Atualizar documentação de cores

**Cores propostas**:
```typescript
secondary: {
  DEFAULT: '#6B5435', // Dourado muito escuro (7.5:1)
  dark: '#4A3822',    // Dourado extremamente escuro
  light: '#8B6F47',   // Antigo DEFAULT (usar apenas bg)
}
```

**Critérios de aceite**:
- Contraste mínimo 7:1 (AAA) para textos
- Contraste mínimo 4.5:1 (AA) para elementos grandes
- Validação com axe DevTools
- Sem quebra visual do design

**Arquivos a modificar**:
- `frontend/tailwind.config.ts`
- Testar visualmente todos os componentes

---

### 3. Error Handling Robusto
**Impacto**: CRÍTICO - UX de erros ausente
**Complexidade**: Média-Alta
**Tempo estimado**: 6-8 horas
**Responsável**: Frontend Dev

**Tarefas**:
- [ ] Criar componente `ErrorBoundary.tsx`
- [ ] Criar hook `useErrorHandler.ts`
- [ ] Criar componente `ErrorToast.tsx`
- [ ] Implementar error interceptor no Axios
- [ ] Adicionar error states em formulários
- [ ] Criar página 404 customizada
- [ ] Criar página 500 customizada
- [ ] Implementar retry logic em API calls
- [ ] Adicionar error logging (Sentry setup preparado)

**Estrutura de erro padrão**:
```typescript
interface ApiError {
  message: string;
  code: string;
  statusCode: number;
  details?: any;
}
```

**Critérios de aceite**:
- Todos os erros de API exibem feedback visual
- ErrorBoundary captura erros React
- Mensagens amigáveis (não técnicas)
- Ações de retry quando aplicável
- Logs estruturados para debugging

**Arquivos a criar/modificar**:
- `frontend/src/components/ErrorBoundary.tsx` (novo)
- `frontend/src/hooks/useErrorHandler.ts` (novo)
- `frontend/src/components/ErrorToast.tsx` (novo)
- `frontend/src/lib/api.ts` (adicionar interceptor)
- `frontend/src/app/error.tsx` (novo)
- `frontend/src/app/not-found.tsx` (novo)

---

## FASE 2 - ALTO (P1) - Sprint 2 (3-4 dias)

### 4. Skeleton Screens
**Impacto**: ALTO - Percepção de performance
**Complexidade**: Média
**Tempo estimado**: 4-5 horas
**Responsável**: Frontend Dev

**Tarefas**:
- [ ] Criar componente `ProductCardSkeleton.tsx`
- [ ] Criar componente `ProductDetailSkeleton.tsx`
- [ ] Criar componente `DashboardSkeleton.tsx`
- [ ] Implementar animação shimmer/pulse
- [ ] Substituir spinners por skeletons apropriados
- [ ] Otimizar com React.memo

**Exemplo de skeleton**:
```tsx
<div className="animate-pulse">
  <div className="bg-gray-200 h-72 rounded-t-xl" />
  <div className="p-5 space-y-3">
    <div className="h-4 bg-gray-200 rounded w-3/4" />
    <div className="h-4 bg-gray-200 rounded w-1/2" />
  </div>
</div>
```

**Critérios de aceite**:
- Layout skeleton match com componente real
- Animação suave e performática
- Transition suave de skeleton → conteúdo real
- Redução percebida de tempo de carregamento

**Arquivos a criar**:
- `frontend/src/components/skeletons/ProductCardSkeleton.tsx`
- `frontend/src/components/skeletons/ProductDetailSkeleton.tsx`
- `frontend/src/components/skeletons/DashboardSkeleton.tsx`

---

### 5. Toast Notifications
**Impacto**: ALTO - Feedback consistente
**Complexidade**: Média
**Tempo estimado**: 5-6 horas
**Responsável**: Frontend Dev

**Tarefas**:
- [ ] Instalar `react-hot-toast` ou criar custom
- [ ] Criar componente `Toast.tsx`
- [ ] Criar `ToastProvider` context
- [ ] Criar hook `useToast()`
- [ ] Implementar tipos: success, error, warning, info
- [ ] Adicionar animações enter/exit
- [ ] Configurar posicionamento (top-right)
- [ ] Implementar auto-dismiss (5s default)
- [ ] Adicionar ações (undo, dismiss)

**Tipos de toast**:
```typescript
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  action?: { label: string; onClick: () => void };
}
```

**Critérios de aceite**:
- Toast visível e acessível (ARIA live region)
- Animações suaves
- Stack de múltiplos toasts
- Responsive em mobile
- Não bloqueia interação

**Arquivos a criar**:
- `frontend/src/components/Toast.tsx`
- `frontend/src/hooks/useToast.ts`
- `frontend/src/contexts/ToastContext.tsx`

---

### 6. Testes de Acessibilidade Automatizados
**Impacto**: ALTO - Qualidade contínua
**Complexidade**: Média
**Tempo estimado**: 4-6 horas
**Responsável**: Frontend Dev + DevOps

**Tarefas**:
- [ ] Instalar `@axe-core/react` e `jest-axe`
- [ ] Configurar axe em desenvolvimento
- [ ] Criar testes de acessibilidade para componentes críticos
- [ ] Configurar Lighthouse CI
- [ ] Adicionar checks no GitHub Actions
- [ ] Documentar padrões de acessibilidade
- [ ] Criar badge de acessibilidade no README

**Configuração exemplo**:
```javascript
// jest.config.js
module.exports = {
  setupFilesAfterEnv: ['./jest.setup.js'],
};

// jest.setup.js
import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';
expect.extend(toHaveNoViolations);
```

**Critérios de aceite**:
- Testes axe passando em CI/CD
- Score Lighthouse Accessibility > 95
- Documentação de padrões criada
- Sem regressões de acessibilidade

**Arquivos a criar/modificar**:
- `frontend/jest.config.js`
- `frontend/jest.setup.js`
- `frontend/__tests__/accessibility/*.test.tsx`
- `.github/workflows/accessibility.yml`

---

### 7. Core Web Vitals Monitoring
**Impacto**: ALTO - Performance mensurável
**Complexidade**: Média
**Tempo estimado**: 3-4 horas
**Responsável**: Frontend Dev + DevOps

**Tarefas**:
- [ ] Configurar Google Analytics 4 real (substituir placeholder)
- [ ] Implementar web-vitals library
- [ ] Enviar métricas para GA4
- [ ] Configurar Google Search Console
- [ ] Implementar monitoring no Vercel/Railway
- [ ] Criar dashboard de métricas
- [ ] Configurar alertas para degradação

**Métricas a monitorar**:
- LCP (Largest Contentful Paint) < 2.5s
- FID (First Input Delay) < 100ms
- CLS (Cumulative Layout Shift) < 0.1
- TTFB (Time to First Byte) < 600ms
- FCP (First Contentful Paint) < 1.8s

**Implementação**:
```typescript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_label: metric.id,
  });
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

**Critérios de aceite**:
- Métricas sendo enviadas para GA4
- Dashboard configurado
- Alertas funcionando
- Baseline de performance estabelecido

**Arquivos a modificar**:
- `frontend/src/app/layout.tsx`
- `frontend/src/lib/analytics.ts` (novo)

---

### 8. Product Schema.org
**Impacto**: ALTO - SEO para produtos
**Complexidade**: Baixa-Média
**Tempo estimado**: 3-4 horas
**Responsável**: Frontend Dev

**Tarefas**:
- [ ] Criar função de geração de Product schema
- [ ] Adicionar schema em página de produto individual
- [ ] Incluir: name, image, price, availability, brand
- [ ] Adicionar aggregateRating quando houver reviews
- [ ] Validar com Google Rich Results Test
- [ ] Adicionar schema de BreadcrumbList
- [ ] Documentar implementação

**Schema exemplo**:
```typescript
const productSchema = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: product.name,
  image: product.imageUrl,
  description: product.description,
  brand: {
    '@type': 'Brand',
    name: product.brand?.name || 'America Cannabis',
  },
  offers: {
    '@type': 'Offer',
    price: product.price,
    priceCurrency: 'BRL',
    availability: product.stock > 0
      ? 'https://schema.org/InStock'
      : 'https://schema.org/PreOrder',
  },
  aggregateRating: reviews.length > 0 ? {
    '@type': 'AggregateRating',
    ratingValue: averageRating,
    reviewCount: reviews.length,
  } : undefined,
};
```

**Critérios de aceite**:
- Schema validado no Google Rich Results Test
- Implementado em todas as páginas de produto
- BreadcrumbList schema adicionado
- Testado com Search Console

**Arquivos a modificar**:
- `frontend/src/app/produtos/[id]/page.tsx`
- `frontend/src/lib/schema.ts` (novo)

---

## FASE 3 - MÉDIO (P2) - Sprint 3-4 (5-7 dias)

### 9. Biblioteca de Ícones
**Impacto**: MÉDIO - Profissionalismo visual
**Complexidade**: Média
**Tempo estimado**: 4-6 horas
**Responsável**: Frontend Dev + Designer

**Tarefas**:
- [ ] Escolher biblioteca (Lucide, Heroicons, Phosphor)
- [ ] Instalar e configurar
- [ ] Criar mapeamento emoji → ícone
- [ ] Substituir emojis em componentes críticos
- [ ] Criar componente `Icon.tsx` wrapper
- [ ] Padronizar tamanhos (16, 20, 24, 32px)
- [ ] Atualizar design system

**Biblioteca recomendada**: Lucide Icons (tree-shakeable, moderno)

```bash
npm install lucide-react
```

**Critérios de aceite**:
- Todos os emojis funcionais substituídos
- Performance mantida (tree-shaking)
- Consistência visual
- Documentação de uso

**Arquivos principais a modificar**:
- `frontend/src/components/Header.tsx`
- `frontend/src/components/Footer.tsx`
- `frontend/src/components/admin/Sidebar.tsx`
- `frontend/src/components/Icon.tsx` (novo)

---

### 10. Animações Avançadas
**Impacto**: MÉDIO - Polimento UX
**Complexidade**: Média-Alta
**Tempo estimado**: 6-8 horas
**Responsável**: Frontend Dev

**Tarefas**:
- [ ] Instalar Framer Motion
- [ ] Criar variantes de animação reutilizáveis
- [ ] Implementar page transitions
- [ ] Adicionar animações de entrada em listas
- [ ] Implementar scroll-triggered animations
- [ ] Adicionar gesture animations (drag, swipe)
- [ ] Otimizar performance (will-change, transform)

**Instalação**:
```bash
npm install framer-motion
```

**Exemplos de uso**:
```tsx
// Page transition
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
  {children}
</motion.div>

// Staggered list
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  {items.map((item) => (
    <motion.div key={item.id} variants={itemVariants}>
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

**Critérios de aceite**:
- Animações suaves (60fps)
- Respeitam prefers-reduced-motion
- Não degradam performance
- Polimento perceptível

**Arquivos a modificar**:
- `frontend/src/app/page.tsx`
- `frontend/src/app/produtos/page.tsx`
- `frontend/src/components/ProductCardSSR.tsx`
- `frontend/src/lib/animations.ts` (novo)

---

### 11. PWA Completo
**Impacto**: MÉDIO - Experiência app-like
**Complexidade**: Alta
**Tempo estimado**: 8-10 horas
**Responsável**: Frontend Dev

**Tarefas**:
- [ ] Configurar next-pwa plugin
- [ ] Criar service worker customizado
- [ ] Implementar estratégia de cache (Network First, Cache First)
- [ ] Adicionar offline page
- [ ] Configurar install prompt
- [ ] Adicionar shortcuts no manifest
- [ ] Implementar background sync (opcional)
- [ ] Testar em iOS e Android

**Instalação**:
```bash
npm install next-pwa
```

**next.config.js**:
```javascript
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/api\./,
      handler: 'NetworkFirst',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 300, // 5 minutes
        },
      },
    },
  ],
});

module.exports = withPWA({
  // existing config
});
```

**Critérios de aceite**:
- PWA installable em mobile/desktop
- Funcional offline (páginas visitadas)
- Lighthouse PWA score > 90
- Install prompt funcional

**Arquivos a criar/modificar**:
- `frontend/next.config.js`
- `frontend/public/sw.js`
- `frontend/public/offline.html`
- `frontend/src/app/manifest.ts` (atualizar)

---

### 12. A/B Testing Framework
**Impacto**: MÉDIO - Otimização baseada em dados
**Complexidade**: Alta
**Tempo estimado**: 8-12 horas
**Responsável**: Frontend Dev + Analytics

**Tarefas**:
- [ ] Escolher framework (Google Optimize, Vercel Edge Config, custom)
- [ ] Implementar feature flags
- [ ] Criar hook `useExperiment()`
- [ ] Configurar tracking de variantes
- [ ] Criar experimentos exemplo (CTA colors, layouts)
- [ ] Implementar análise estatística básica
- [ ] Documentar processo de criação de experimentos

**Opção recomendada**: Vercel Edge Config + Custom Logic

**Implementação exemplo**:
```typescript
// hooks/useExperiment.ts
export function useExperiment(experimentId: string) {
  const [variant, setVariant] = useState<'A' | 'B'>('A');

  useEffect(() => {
    // Assign variant based on user ID or random
    const assignedVariant = assignVariant(experimentId);
    setVariant(assignedVariant);

    // Track assignment
    trackEvent('experiment_viewed', {
      experiment_id: experimentId,
      variant: assignedVariant,
    });
  }, [experimentId]);

  return variant;
}

// Usage
function ProductCard() {
  const variant = useExperiment('cta-color-test');

  return (
    <button className={variant === 'A' ? 'bg-secondary' : 'bg-primary'}>
      {variant === 'A' ? 'Comprar Agora' : 'Garantir o Meu'}
    </button>
  );
}
```

**Critérios de aceite**:
- Sistema de A/B test funcional
- Tracking de variantes no Analytics
- Documentação de uso
- 2+ experimentos rodando

**Arquivos a criar**:
- `frontend/src/hooks/useExperiment.ts`
- `frontend/src/lib/experiments.ts`
- `frontend/src/contexts/ExperimentContext.tsx`

---

## FASE 4 - BAIXO (P3) - Sprint 5+ (7-10 dias)

### 13. Design System Documentation
**Impacto**: BAIXO - DX e escalabilidade
**Complexidade**: Média-Alta
**Tempo estimado**: 12-16 horas
**Responsável**: Frontend Dev + Designer

**Tarefas**:
- [ ] Instalar e configurar Storybook
- [ ] Criar stories para todos os componentes UI
- [ ] Documentar props e variantes
- [ ] Adicionar controles interativos
- [ ] Criar página de cores
- [ ] Criar página de tipografia
- [ ] Criar página de spacing
- [ ] Configurar deploy automático (Chromatic, Vercel)
- [ ] Adicionar accessibility addon

**Instalação**:
```bash
npx storybook@latest init
```

**Estrutura**:
```
frontend/
├── .storybook/
│   ├── main.ts
│   └── preview.ts
└── src/
    └── components/
        └── Button/
            ├── Button.tsx
            ├── Button.stories.tsx
            └── Button.test.tsx
```

**Critérios de aceite**:
- Storybook deployado e acessível
- Todos os componentes UI documentados
- Accessibility checks integrados
- Guidelines de uso documentados

---

### 14. Keyboard Navigation Testing
**Impacto**: BAIXO - Acessibilidade avançada
**Complexidade**: Média
**Tempo estimado**: 6-8 horas
**Responsável**: QA + Frontend Dev

**Tarefas**:
- [ ] Criar checklist de navegação por teclado
- [ ] Testar tab order em todas as páginas
- [ ] Implementar skip links
- [ ] Adicionar roving tabindex em menus
- [ ] Testar atalhos de teclado (ESC, Enter, Space)
- [ ] Documentar atalhos disponíveis
- [ ] Criar testes automatizados de keyboard nav

**Checklist de navegação**:
- [ ] Tab percorre todos os elementos interativos
- [ ] Shift+Tab funciona inversamente
- [ ] Enter ativa botões e links
- [ ] Space ativa checkboxes e toggles
- [ ] ESC fecha modals e dropdowns
- [ ] Arrow keys navegam em menus
- [ ] Focus trap em modals

**Critérios de aceite**:
- 100% navegável por teclado
- Focus sempre visível
- Tab order lógico
- Documentação de atalhos

---

## CRONOGRAMA GERAL

| Fase | Prioridade | Duração | Início | Fim |
|------|-----------|---------|--------|-----|
| Fase 1 | P0 - CRÍTICO | 2-3 dias | Sprint 1 | Sprint 1 |
| Fase 2 | P1 - ALTO | 3-4 dias | Sprint 2 | Sprint 2 |
| Fase 3 | P2 - MÉDIO | 5-7 dias | Sprint 3 | Sprint 4 |
| Fase 4 | P3 - BAIXO | 7-10 dias | Sprint 5 | Sprint 6+ |

**Total estimado**: 17-24 dias de trabalho (3-4 sprints de 2 semanas)

---

## MÉTRICAS DE SUCESSO

### Before/After Targets

| Métrica | Atual | Meta Pós-Implementação |
|---------|-------|------------------------|
| **UX Score** | 8.2/10 | 9.5/10 |
| **Lighthouse Accessibility** | ~85 | 95+ |
| **Lighthouse Performance** | ~75 | 90+ |
| **Core Web Vitals** | Não monitorado | 100% "Good" |
| **Mobile Usability Score** | 8/10 | 9.5/10 |
| **Error Rate (API)** | Sem tracking | < 1% |
| **Time to Interactive** | ~3.5s | < 2.5s |
| **Bounce Rate** | Não monitorado | < 40% |

---

## RECURSOS NECESSÁRIOS

### Equipe
- **1 Frontend Developer Senior** (Full-time durante Fases 1-2)
- **1 Designer UX/UI** (Part-time para validações)
- **1 QA/Tester** (Part-time para Fase 4)

### Ferramentas/Licenças
- Figma Pro (para design system)
- Chromatic (Storybook hosting) - $49/mês
- Sentry (error monitoring) - Free tier OK
- Google Analytics 4 - Grátis
- Vercel/Railway - Plano existente

### Orçamento estimado
- Ferramentas: ~$50/mês
- Tempo de desenvolvimento: 100-120 horas
- Total: $5,000-8,000 (considerando dev rate médio)

---

## RISCOS E MITIGAÇÕES

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| Breaking changes em mobile menu | Média | Alto | Testes extensivos, feature flag |
| Performance degradation com animações | Baixa | Médio | Profiling, lazy loading |
| Incompatibilidade PWA iOS | Média | Médio | Testes em Safari, fallback |
| Regressões de acessibilidade | Alta | Alto | Testes automatizados em CI |
| Overhead de A/B testing | Baixa | Baixo | Edge computing, caching |

---

## DEPENDÊNCIAS

### Fase 1 (P0)
- Nenhuma dependência externa crítica

### Fase 2 (P1)
- Depende de: Error handling (item 3) para toast de erros
- Depende de: Google Analytics configurado (item 7)

### Fase 3 (P2)
- Depende de: Design system estabelecido (Fase 1-2)
- Depende de: Analytics configurado (item 7) para A/B tests

### Fase 4 (P3)
- Depende de: Todos os componentes refatorados (Fases 1-3)

---

## VALIDAÇÃO E QA

### Checklist de cada fase
- [ ] Code review aprovado
- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Lighthouse score validado
- [ ] Teste em devices reais (iOS, Android)
- [ ] Validação de acessibilidade (axe)
- [ ] Performance profiling realizado
- [ ] Documentação atualizada

---

## ROLLOUT STRATEGY

### Fase 1 (P0)
- **Deploy**: Gradual (10% → 50% → 100%)
- **Rollback plan**: Feature flags
- **Monitoring**: Error rate, performance metrics

### Fase 2-4
- **Deploy**: Feature by feature
- **Canary deployment**: 5% users inicialmente
- **Monitoring**: User feedback, analytics

---

## DOCUMENTAÇÃO

Cada implementação deve incluir:
1. **README técnico** - Como funciona
2. **USAGE.md** - Como usar
3. **CHANGELOG.md** - O que mudou
4. **ADR (Architecture Decision Record)** - Por que escolhemos X

---

## PRÓXIMOS PASSOS

1. ✅ Plano criado e salvo
2. 🚀 **INICIAR FASE 1 - ITEM 1**: Menu Mobile Hamburger
3. 📊 Setup de tracking de progresso
4. 👥 Kick-off meeting com equipe

---

**Documento criado em**: 2025-10-20
**Última atualização**: 2025-10-20
**Versão**: 1.0
**Responsável**: Senior UX Team
**Status**: READY TO START 🚀
