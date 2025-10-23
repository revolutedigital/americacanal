# Quick Start - America Cannabis

## Setup em 3 Passos (5 minutos)

### 1️⃣ Instalar Dependências

```bash
cd backend && npm install && cd ..
cd frontend && npm install && cd ..
```

### 2️⃣ Iniciar Docker

```bash
docker-compose up -d
```

### 3️⃣ Configurar Banco de Dados

```bash
docker exec -it america-cannabis-backend sh -c "npx prisma migrate dev --name init && npx prisma db seed"
```

## Acessar Aplicação

**Site Público:**
```
http://localhost:3000
```

**Painel Admin:**
```
http://localhost:3000/admin/login

Email: admin@americacannabis.com
Senha: Admin@2025
```

**API Backend:**
```
http://localhost:4000
```

## Comandos Úteis

### Ver Logs
```bash
docker-compose logs -f
```

### Parar Tudo
```bash
docker-compose down
```

### Reiniciar
```bash
docker-compose restart
```

### Rebuild Completo
```bash
docker-compose down -v
docker-compose up -d --build
```

### Prisma Studio (Visualizar Banco)
```bash
cd backend
npx prisma studio
```

## Customizar

### Número do WhatsApp
Edite `frontend/.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
```

### Cores do Site
Edite `frontend/tailwind.config.ts`:
```typescript
primary: {
  DEFAULT: '#2D5016', // Seu verde
}
```

### Adicionar Produtos
1. Acesse http://localhost:3000/admin/login
2. Faça login
3. Clique em "Novo Produto"

## Troubleshooting

**Porta em uso?**
```bash
# Matar processo na porta 3000
lsof -ti:3000 | xargs kill -9

# Matar processo na porta 4000
lsof -ti:4000 | xargs kill -9
```

**Erro no Docker?**
```bash
# Limpar tudo e recomeçar
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

**Erro no Banco?**
```bash
# Resetar banco
cd backend
npx prisma migrate reset
npx prisma db seed
```

## Deploy Railway

### 1. Criar Conta
https://railway.app

### 2. Criar Serviços
- PostgreSQL (template)
- Backend (GitHub repo, pasta `/backend`)
- Frontend (GitHub repo, pasta `/frontend`)

### 3. Variáveis Backend
```env
DATABASE_URL=<railway_postgres_url>
JWT_SECRET=<gerar_secret_forte>
PORT=4000
NODE_ENV=production
```

### 4. Variáveis Frontend
```env
NEXT_PUBLIC_API_URL=<railway_backend_url>
NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
```

### 5. Rodar Seed
No terminal do Railway (backend):
```bash
npx prisma db seed
```

## Pronto! 🎉

Agora você tem:
- ✅ Site público funcionando
- ✅ Painel admin completo
- ✅ API REST funcional
- ✅ Banco de dados configurado
- ✅ Integração WhatsApp
- ✅ Produtos de exemplo

Acesse e comece a usar!
