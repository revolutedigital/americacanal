# America Cannabis - E-commerce Platform

Plataforma completa de e-commerce para America Cannabis com painel administrativo e catálogo público.

## Tecnologias Utilizadas

### Backend
- Node.js + Express
- TypeScript
- PostgreSQL
- Prisma ORM
- JWT Authentication
- bcrypt

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios

### DevOps
- Docker
- Docker Compose
- Railway (deploy)

## Estrutura do Projeto

```
americancannabiss/
├── backend/                 # API REST
│   ├── src/
│   │   ├── controllers/    # Lógica de negócio
│   │   ├── middlewares/    # Auth middleware
│   │   ├── routes/         # Rotas da API
│   │   ├── utils/          # Utilitários (JWT)
│   │   └── types/          # TypeScript types
│   ├── prisma/
│   │   ├── schema.prisma   # Schema do banco
│   │   └── seed.ts         # Seed inicial
│   └── Dockerfile
│
├── frontend/               # Next.js App
│   ├── src/
│   │   ├── app/           # Pages (App Router)
│   │   ├── components/    # Componentes React
│   │   ├── lib/           # API client, utils
│   │   └── hooks/         # Custom hooks
│   └── Dockerfile
│
└── docker-compose.yml
```

## Instalação e Configuração

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Git

### 1. Clone o repositório

```bash
git clone <repo-url>
cd americancannabiss
```

### 2. Configurar variáveis de ambiente

#### Backend (`backend/.env`)
```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5432/america_cannabis"
JWT_SECRET="seu_jwt_secret_super_seguro_mude_em_producao"
PORT=4000
NODE_ENV=development
```

#### Frontend (`frontend/.env.local`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000
NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
```

### 3. Instalar dependências

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## Rodando o Projeto

### Opção 1: Com Docker (Recomendado)

```bash
# Na raiz do projeto
docker-compose up -d
```

Isso irá iniciar:
- PostgreSQL na porta 5432
- Backend na porta 4000
- Frontend na porta 3000

### Opção 2: Desenvolvimento Local

#### 1. Iniciar PostgreSQL
```bash
docker run -d \
  --name postgres-america-cannabis \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=america_cannabis \
  -p 5432:5432 \
  postgres:16-alpine
```

#### 2. Backend
```bash
cd backend

# Gerar Prisma Client
npx prisma generate

# Rodar migrations
npx prisma migrate dev

# Seed inicial (criar admin)
npx prisma db seed

# Iniciar servidor
npm run dev
```

#### 3. Frontend
```bash
cd frontend
npm run dev
```

## Seed do Banco de Dados

O seed cria automaticamente:

**Usuário Admin:**
- Email: `admin@americacannabis.com`
- Senha: `Admin@2025`

**Produtos de exemplo:**
- 4 produtos pré-cadastrados para demonstração

Para rodar o seed:
```bash
cd backend
npx prisma db seed
```

## Acessando a Aplicação

- **Site Público:** http://localhost:3000
- **Painel Admin:** http://localhost:3000/admin/login
- **API Backend:** http://localhost:4000
- **Prisma Studio:** `cd backend && npx prisma studio`

## Funcionalidades

### Site Público
- Catálogo de produtos
- Cards com imagens, preços e descrições
- Badges de disponibilidade (Disponível / Sob Encomenda)
- Integração WhatsApp nos botões de compra
- Design responsivo

### Painel Administrativo
- Login com JWT
- Dashboard com estatísticas
- CRUD completo de produtos:
  - Criar produto
  - Editar produto
  - Excluir produto
  - Visualizar todos produtos
- Controle de estoque
- Ativar/desativar produtos

## API Endpoints

### Autenticação
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Verificar token (protegida)

### Produtos
- `GET /api/products` - Listar produtos ativos (público)
- `GET /api/products/:id` - Buscar produto (público)
- `GET /api/products/admin/all` - Listar todos (protegida)
- `POST /api/products` - Criar produto (protegida)
- `PUT /api/products/:id` - Atualizar produto (protegida)
- `DELETE /api/products/:id` - Deletar produto (protegida)

## Deploy no Railway

### 1. Criar conta no Railway
https://railway.app

### 2. Criar serviços

#### PostgreSQL
- Usar template "PostgreSQL" do Railway
- Copiar a `DATABASE_URL` gerada

#### Backend
1. Novo serviço → GitHub Repo → Selecionar repositório
2. Root Directory: `backend`
3. Variáveis de ambiente:
   ```
   DATABASE_URL=<url_do_postgres_railway>
   JWT_SECRET=<gerar_secret_forte>
   PORT=4000
   NODE_ENV=production
   ```
4. Build Command:
   ```
   npm install && npx prisma generate && npx prisma migrate deploy && npm run build
   ```
5. Start Command:
   ```
   npm start
   ```

#### Frontend
1. Novo serviço → GitHub Repo → Selecionar repositório
2. Root Directory: `frontend`
3. Variáveis de ambiente:
   ```
   NEXT_PUBLIC_API_URL=<url_do_backend_railway>
   NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
   ```
4. Build Command:
   ```
   npm install && npm run build
   ```
5. Start Command:
   ```
   npm start
   ```

### 3. Rodar Seed em Produção

No terminal do Railway (serviço backend):
```bash
npx prisma db seed
```

## Customização

### Atualizar número do WhatsApp

Edite `frontend/.env.local`:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
```

### Personalizar cores

Edite `frontend/tailwind.config.ts`:
```typescript
colors: {
  primary: {
    DEFAULT: '#2D5016', // Verde cannabis
    // ...
  },
}
```

### Adicionar mais produtos

Use o painel admin em `/admin/login` ou edite `backend/prisma/seed.ts`

## Comandos Úteis

### Backend
```bash
# Prisma Studio (GUI do banco)
npx prisma studio

# Criar nova migration
npx prisma migrate dev --name nome_da_migration

# Resetar banco (CUIDADO!)
npx prisma migrate reset

# Build TypeScript
npm run build

# Rodar produção
npm start
```

### Frontend
```bash
# Desenvolvimento
npm run dev

# Build
npm run build

# Preview da build
npm start

# Lint
npm run lint
```

### Docker
```bash
# Iniciar todos serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar tudo
docker-compose down

# Rebuild
docker-compose up -d --build

# Remover volumes
docker-compose down -v
```

## Troubleshooting

### Erro de conexão com banco
- Verifique se PostgreSQL está rodando: `docker ps`
- Confira a `DATABASE_URL` no `.env`

### Erro de autenticação
- Limpe o localStorage do navegador
- Verifique se o JWT_SECRET está configurado
- Tente fazer login novamente

### Frontend não conecta na API
- Verifique `NEXT_PUBLIC_API_URL` no `.env.local`
- Certifique-se que o backend está rodando
- Verifique CORS no backend

### Prisma errors
```bash
# Regenerar client
npx prisma generate

# Sincronizar schema
npx prisma db push
```

## Segurança

**IMPORTANTE para produção:**

1. Mude o `JWT_SECRET` para um valor forte
2. Use variáveis de ambiente seguras
3. Não commite arquivos `.env`
4. Use HTTPS em produção
5. Configure CORS adequadamente
6. Mude a senha do admin após primeiro acesso

## Licença

MIT

## Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

---

**Desenvolvido com Next.js, Express e PostgreSQL**
