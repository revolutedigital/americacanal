#!/bin/bash

echo "🐘 Iniciando PostgreSQL via Docker..."
echo ""

# Parar e remover container existente
echo "🗑️  Removendo container antigo (se existir)..."
docker stop postgres-america 2>/dev/null
docker rm postgres-america 2>/dev/null

echo ""
echo "🚀 Iniciando novo container PostgreSQL..."
docker run --name postgres-america \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=america_cannabis \
  -p 5432:5432 \
  -d postgres:14

echo ""
echo "⏳ Aguardando PostgreSQL inicializar..."
sleep 5

echo ""
echo "✅ Verificando se está rodando..."
docker ps | grep postgres-america

echo ""
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ PostgreSQL está rodando!"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🌐 Agora acesse: http://localhost:5178/admin/login"
echo ""
echo "   Email: admin@americacannabiss.com"
echo "   Senha: admin123"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Para parar o PostgreSQL:"
echo "  docker stop postgres-america"
echo ""
