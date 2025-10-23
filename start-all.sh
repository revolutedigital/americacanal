#!/bin/bash

echo "🚀 Iniciando America Cannabis - Multi-Tenant E-commerce Platform"
echo ""
echo "📦 Backend: http://localhost:5000"
echo "🌐 Frontend: http://localhost:3001"
echo "🔧 Admin: http://localhost:3001/admin"
echo ""
echo "Pressione Ctrl+C para parar os servidores"
echo ""

# Função para cleanup quando o script for interrompido
cleanup() {
    echo ""
    echo "⏹️  Parando servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

trap cleanup INT TERM

# Iniciar backend em background
echo "🔄 Iniciando Backend..."
cd backend && npm run dev &
BACKEND_PID=$!

# Aguardar 3 segundos para o backend iniciar
sleep 3

# Iniciar frontend em background
echo "🔄 Iniciando Frontend..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

# Aguardar os processos
wait
