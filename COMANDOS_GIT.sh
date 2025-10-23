#!/bin/bash
# 🚀 Script para enviar o projeto América Cannabis para o GitHub

set -e

echo "📦 América Cannabis - Deploy para GitHub"
echo "========================================="
echo ""

# 1. Verificar se está no diretório correto
if [ ! -f "package.json" ]; then
    echo "❌ Erro: Execute este script na pasta raiz do projeto!"
    exit 1
fi

# 2. Verificar status do git
echo "📋 Verificando status do git..."
git status
echo ""

# 3. Adicionar arquivos
echo "➕ Adicionando arquivos..."
git add .
echo "✅ Arquivos adicionados"
echo ""

# 4. Mostrar o que vai ser commitado
echo "📝 Arquivos que serão commitados:"
git diff --cached --name-status
echo ""

# 5. Fazer commit
echo "💾 Criando commit..."
git commit -m "feat: América Cannabis pronto para deploy no Railway

- Backend API com Express + Prisma + PostgreSQL
- Frontend Next.js 14 com SSR e PWA
- Sistema completo de e-commerce
- Painel admin enterprise
- Branding profissional (10/10)
- Dockerfiles e railway.json configurados
- Migrations automáticas
- Tracking pixels (Meta, GA4, GTM)
- Acessibilidade WCAG AA
- SEO otimizado

Repositório: https://github.com/revolutedigital/americacanal
Deploy: Railway"

echo "✅ Commit criado"
echo ""

# 6. Verificar remote
echo "🔗 Verificando remote..."
if ! git remote | grep -q "origin"; then
    echo "➕ Adicionando remote origin..."
    git remote add origin https://github.com/revolutedigital/americacanal.git
    echo "✅ Remote adicionado"
else
    echo "✅ Remote já configurado"
    git remote -v
fi
echo ""

# 7. Push para GitHub
echo "🚀 Enviando para GitHub..."
echo "⚠️  IMPORTANTE: Você pode precisar fazer login no GitHub"
echo ""

read -p "Deseja fazer push agora? (s/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Ss]$ ]]; then
    git push -u origin main || git push -u origin master
    echo ""
    echo "✅ Código enviado com sucesso para GitHub!"
    echo ""
    echo "🎉 Próximos passos:"
    echo "1. Acesse: https://railway.app"
    echo "2. Crie um novo projeto"
    echo "3. Conecte com o GitHub: revolutedigital/americacanal"
    echo "4. Siga o guia: GUIA_DEPLOY_RAILWAY.md"
    echo ""
    echo "📚 Documentação:"
    echo "   - Guia completo: GUIA_DEPLOY_RAILWAY.md"
    echo "   - Resumo rápido: RESUMO_DEPLOY.md"
else
    echo "⏸️  Push cancelado"
    echo "   Execute manualmente: git push -u origin main"
fi
