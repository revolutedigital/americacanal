# Setup Rápido - America Cannabis

## Início Rápido (5 minutos)

### 1. Instalar dependências

```bash
# Backend
cd backend
npm install
cd ..

# Frontend
cd frontend
npm install
cd ..
```

### 2. Iniciar com Docker

```bash
docker-compose up -d
```

### 3. Configurar banco de dados

```bash
# Entrar no container do backend
docker exec -it america-cannabis-backend sh

# Rodar migrations
npx prisma migrate dev --name init

# Seed (criar admin e produtos)
npx prisma db seed

# Sair do container
exit
```

### 4. Acessar

- **Site:** http://localhost:3000
- **Admin:** http://localhost:3000/admin/login
  - Email: `admin@americacannabis.com`
  - Senha: `Admin@2025`

## Setup Sem Docker

### 1. PostgreSQL

```bash
docker run -d \
  --name postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=america_cannabis \
  -p 5432:5432 \
  postgres:16-alpine
```

### 2. Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

## Parar Tudo

```bash
docker-compose down
```

## Limpar Tudo

```bash
docker-compose down -v
```

## Troubleshooting

**Porta 3000 em uso?**
```bash
lsof -ti:3000 | xargs kill -9
```

**Porta 4000 em uso?**
```bash
lsof -ti:4000 | xargs kill -9
```

**Porta 5432 em uso?**
```bash
lsof -ti:5432 | xargs kill -9
```

**Rebuild completo:**
```bash
docker-compose down -v
docker-compose up -d --build
```
