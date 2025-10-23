#!/bin/bash
# 🚀 Deploy América Cannabis no Railway via CLI

set -e

echo "🚀 América Cannabis - Deploy Railway"
echo "====================================="
echo ""

# Cores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar se está autenticado
echo -e "${BLUE}Verificando autenticação...${NC}"
if ! railway whoami > /dev/null 2>&1; then
    echo -e "${RED}❌ Não autenticado no Railway!${NC}"
    echo "Execute: railway login"
    exit 1
fi

echo -e "${GREEN}✅ Autenticado como: $(railway whoami)${NC}"
echo ""

# Gerar JWT Secret
echo -e "${BLUE}Gerando JWT_SECRET seguro...${NC}"
JWT_SECRET=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo -e "${GREEN}✅ JWT_SECRET gerado${NC}"
echo ""

# Instruções
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${YELLOW}📋 INSTRUÇÕES DE DEPLOY${NC}"
echo -e "${YELLOW}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo "Vou te guiar pelo deploy. Siga os passos:"
echo ""

# Passo 1
echo -e "${BLUE}1️⃣  Criar novo projeto Railway${NC}"
echo "   Execute: railway init"
echo "   Nome sugerido: America Cannabis"
echo ""
read -p "Pressione ENTER quando terminar..."
echo ""

# Passo 2
echo -e "${BLUE}2️⃣  Adicionar PostgreSQL${NC}"
echo "   Execute: railway add"
echo "   Escolha: PostgreSQL"
echo ""
read -p "Pressione ENTER quando terminar..."
echo ""

# Passo 3
echo -e "${BLUE}3️⃣  Criar serviço Backend${NC}"
echo "   Execute os comandos:"
echo "   "
echo "   cd backend"
echo "   railway up"
echo "   "
echo "   Isso vai fazer o build e deploy do backend"
echo ""
read -p "Pressione ENTER quando terminar..."
echo ""

# Passo 4
echo -e "${BLUE}4️⃣  Configurar variáveis Backend${NC}"
echo "   Execute:"
echo "   "
echo "   railway variables --set DATABASE_URL=\\\${{Postgres.DATABASE_URL}}"
echo "   railway variables --set JWT_SECRET=$JWT_SECRET"
echo "   railway variables --set PORT=4000"
echo "   railway variables --set NODE_ENV=production"
echo "   "
read -p "Pressione ENTER quando terminar..."
echo ""

# Passo 5
echo -e "${BLUE}5️⃣  Pegar URL do Backend${NC}"
echo "   Execute: railway domain"
echo "   Copie a URL gerada (https://backend-production-xxx.up.railway.app)"
echo ""
read -p "Cole a URL do Backend aqui: " BACKEND_URL
echo ""

# Passo 6
echo -e "${BLUE}6️⃣  Configurar FRONTEND_URL no Backend${NC}"
echo "   (vamos fazer isso depois do frontend deploy)"
echo ""

# Passo 7
echo -e "${BLUE}7️⃣  Criar serviço Frontend${NC}"
echo "   Execute os comandos:"
echo "   "
echo "   cd ../frontend"
echo "   railway up"
echo "   "
read -p "Pressione ENTER quando terminar..."
echo ""

# Passo 8
echo -e "${BLUE}8️⃣  Configurar variáveis Frontend${NC}"
echo "   Execute:"
echo "   "
echo "   railway variables --set NEXT_PUBLIC_API_URL=$BACKEND_URL"
echo "   railway variables --set NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068"
echo "   "
read -p "Pressione ENTER quando terminar..."
echo ""

# Passo 9
echo -e "${BLUE}9️⃣  Pegar URL do Frontend${NC}"
echo "   Execute: railway domain"
echo "   Copie a URL gerada (https://frontend-production-xxx.up.railway.app)"
echo ""
read -p "Cole a URL do Frontend aqui: " FRONTEND_URL
echo ""

# Passo 10
echo -e "${BLUE}🔟 Atualizar variáveis finais${NC}"
echo "   Execute:"
echo "   "
echo "   # Frontend - adicionar SITE_URL"
echo "   railway variables --set NEXT_PUBLIC_SITE_URL=$FRONTEND_URL"
echo "   "
echo "   # Backend - adicionar FRONTEND_URL"
echo "   cd ../backend"
echo "   railway variables --set FRONTEND_URL=$FRONTEND_URL"
echo "   "
read -p "Pressione ENTER quando terminar..."
echo ""

# Finalização
echo ""
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ DEPLOY CONCLUÍDO!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""
echo -e "${BLUE}🌐 URLs da sua aplicação:${NC}"
echo -e "   Backend:  $BACKEND_URL"
echo -e "   Frontend: $FRONTEND_URL"
echo ""
echo -e "${YELLOW}📋 Próximos passos:${NC}"
echo "   1. Aguarde os builds terminarem (3-5 min cada)"
echo "   2. Teste o backend: curl $BACKEND_URL/health"
echo "   3. Acesse o site: $FRONTEND_URL"
echo "   4. Crie usuário admin via Prisma Studio"
echo ""
echo -e "${GREEN}🎉 América Cannabis está no ar!${NC}"
echo ""

# Salvar URLs
cat > deployment-info.txt << EOF
América Cannabis - Deployment Info
==================================

Backend URL:  $BACKEND_URL
Frontend URL: $FRONTEND_URL

JWT_SECRET: $JWT_SECRET

Deployed: $(date)
EOF

echo -e "${GREEN}✅ Informações salvas em: deployment-info.txt${NC}"
