# Sistema de Testes de Acessibilidade - America Cannabis

## Visão Geral

Este projeto utiliza **Vitest** com **React Testing Library** e **vitest-axe** para garantir que todos os componentes atendam aos padrões de acessibilidade WCAG.

## Ferramentas Configuradas

### Framework de Testes
- **Vitest**: Framework de testes rápido e moderno
- **@testing-library/react**: Biblioteca para testar componentes React
- **@testing-library/jest-dom**: Matchers personalizados para assertions
- **@testing-library/user-event**: Simular interações de usuário

### Acessibilidade
- **vitest-axe**: Testes automatizados de acessibilidade baseados em axe-core
- **@axe-core/react**: Validação de acessibilidade em tempo real
- **axe-core**: Motor de análise de acessibilidade

## Comandos Disponíveis

```bash
# Executar testes em modo watch (recomendado para desenvolvimento)
npm test

# Executar testes uma vez
npm run test:run

# Executar testes com interface visual
npm run test:ui

# Gerar relatório de cobertura
npm run test:coverage

# Executar testes em modo watch
npm run test:watch

# Executar testes de acessibilidade com output verboso
npm run test:a11y
```

## Estrutura de Arquivos

```
src/
├── test/
│   ├── setup.ts           # Configuração global dos testes
│   ├── test-utils.tsx     # Utilitários de teste (render, checkA11y)
│   └── README.md          # Este arquivo
└── components/
    └── __tests__/         # Testes dos componentes
        ├── MobileMenu.test.tsx
        └── ErrorBoundary.test.tsx
```

## Utilitários de Teste

### `checkA11y(container)`

Verifica se um componente tem violações de acessibilidade usando axe-core:

```tsx
import { render, checkA11y } from '@/test/test-utils'

it('should not have accessibility violations', async () => {
  const { container } = render(<MyComponent />)
  await checkA11y(container) // Lança erro se houver violações
})
```

### `hasProperARIA(element)`

Verifica se um elemento tem atributos ARIA adequados:

```tsx
import { hasProperARIA } from '@/test/test-utils'

const button = screen.getByRole('button')
const ariaInfo = hasProperARIA(button)
expect(ariaInfo.hasLabel).toBe(true)
```

### `hasFocusIndicator(element)`

Verifica se um elemento tem indicadores de foco visível:

```tsx
import { hasFocusIndicator } from '@/test/test-utils'

const link = screen.getByRole('link')
expect(hasFocusIndicator(link)).toBe(true)
```

## Exemplo de Teste

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, checkA11y } from '@/test/test-utils'
import MyComponent from '../MyComponent'

describe('MyComponent - Accessibility Tests', () => {
  it('should not have accessibility violations', async () => {
    const { container } = render(<MyComponent />)
    await checkA11y(container)
  })

  it('should have accessible button', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('aria-label')
  })

  it('should have proper focus indicators', () => {
    render(<MyComponent />)
    const button = screen.getByRole('button')
    expect(button.className).toContain('focus-visible')
  })
})
```

## Testes Implementados

### ✅ MobileMenu Component
- **12 testes passando**
- Testes de acessibilidade com axe-core
- Verificação de roles ARIA (dialog, aria-modal)
- Testes de navegação por teclado (ESC key)
- Validação de labels acessíveis

### ✅ ErrorBoundary Component
- **9 testes passando**
- Renderização de fallback UI
- Botões de retry e home acessíveis
- Focus indicators
- Detalhes de erro em modo desenvolvimento

## Padrões de Acessibilidade Verificados

### ARIA
- ✅ `role` semântico correto
- ✅ `aria-label` em elementos interativos
- ✅ `aria-modal` em modais/dialogs
- ✅ `aria-hidden` em elementos decorativos

### Keyboard Navigation
- ✅ Suporte a tecla ESC em modais
- ✅ Focus indicators visíveis (`focus-visible`)
- ✅ Tab navigation funcional

### Screen Readers
- ✅ Textos alternativos em imagens
- ✅ Labels em inputs e buttons
- ✅ Roles semânticos adequados

## Cobertura de Testes

Execute `npm run test:coverage` para ver o relatório completo de cobertura.

Atualmente testando:
- Componentes de navegação (MobileMenu)
- Componentes de erro (ErrorBoundary)
- Componentes de feedback (Toast - planejado)

## Configuração do Vitest

O arquivo `vitest.config.ts` configura:
- Ambiente jsdom para testes de React
- Plugin React para suporte a JSX
- Aliases de path (@/ -> src/)
- Cobertura com provider v8

## Próximos Passos

1. ✅ Adicionar mais testes para componentes de UI
2. ✅ Configurar CI/CD para executar testes automaticamente
3. ⏳ Integrar com Sentry para tracking de erros
4. ⏳ Adicionar testes E2E com Playwright
5. ⏳ Implementar visual regression testing

## Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

## Suporte

Para dúvidas ou problemas com os testes, consulte a documentação acima ou entre em contato com a equipe de desenvolvimento.
