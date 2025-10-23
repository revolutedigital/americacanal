# Arquitetura - America Cannabis E-commerce

## Diagrama de Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js)                    │
│                     Port 3000 (Container)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐         ┌──────────────────────────┐     │
│  │ Public Pages │         │   Admin Pages (Protected)│     │
│  ├──────────────┤         ├──────────────────────────┤     │
│  │ / (Catalog)  │         │ /admin/login             │     │
│  │              │         │ /admin/dashboard         │     │
│  │ Components:  │         │ /admin/produtos          │     │
│  │ - Header     │         │ /admin/produtos/novo     │     │
│  │ - Footer     │         │ /admin/produtos/editar   │     │
│  │ - ProductCard│         │                          │     │
│  └──────────────┘         └──────────────────────────┘     │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Hooks & Utils                         │    │
│  ├────────────────────────────────────────────────────┤    │
│  │ - useAuth (JWT management)                        │    │
│  │ - api.ts (Axios client)                           │    │
│  │ - utils (formatPrice, getWhatsAppUrl)             │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ HTTP REST API
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                     BACKEND (Express)                        │
│                     Port 4000 (Container)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │                   Routes                           │    │
│  ├────────────────────────────────────────────────────┤    │
│  │ /api/auth                                         │    │
│  │   - POST /login                                   │    │
│  │   - GET  /me (protected)                          │    │
│  │                                                    │    │
│  │ /api/products                                     │    │
│  │   - GET    /            (public)                  │    │
│  │   - GET    /:id         (public)                  │    │
│  │   - GET    /admin/all   (protected)               │    │
│  │   - POST   /            (protected)               │    │
│  │   - PUT    /:id         (protected)               │    │
│  │   - DELETE /:id         (protected)               │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                 │
│  ┌────────────────────────▼───────────────────────────┐    │
│  │              Middlewares                           │    │
│  ├────────────────────────────────────────────────────┤    │
│  │ - authMiddleware (JWT verification)               │    │
│  │ - CORS                                            │    │
│  │ - JSON parser                                     │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                 │
│  ┌────────────────────────▼───────────────────────────┐    │
│  │              Controllers                           │    │
│  ├────────────────────────────────────────────────────┤    │
│  │ - authController (login, me)                      │    │
│  │ - productController (CRUD)                        │    │
│  └────────────────────────────────────────────────────┘    │
│                           │                                 │
│  ┌────────────────────────▼───────────────────────────┐    │
│  │              Prisma Client                         │    │
│  └────────────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────────┘
                           │
                           │ SQL
                           ▼
┌─────────────────────────────────────────────────────────────┐
│                    DATABASE (PostgreSQL)                     │
│                     Port 5432 (Container)                    │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐         ┌────────────────────────┐     │
│  │   User Table   │         │   Product Table        │     │
│  ├────────────────┤         ├────────────────────────┤     │
│  │ - id (UUID)    │         │ - id (UUID)            │     │
│  │ - email        │         │ - name                 │     │
│  │ - password     │         │ - description          │     │
│  │ - name         │         │ - price (Decimal)      │     │
│  │ - createdAt    │         │ - imageUrl             │     │
│  │ - updatedAt    │         │ - stock (Int)          │     │
│  └────────────────┘         │ - isActive (Boolean)   │     │
│                             │ - createdAt            │     │
│                             │ - updatedAt            │     │
│                             └────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Fluxo de Autenticação

```
┌──────────┐                ┌──────────┐               ┌──────────┐
│ Frontend │                │ Backend  │               │ Database │
└────┬─────┘                └────┬─────┘               └────┬─────┘
     │                           │                          │
     │ POST /api/auth/login      │                          │
     ├──────────────────────────>│                          │
     │ { email, password }       │                          │
     │                           │ Query user by email      │
     │                           ├─────────────────────────>│
     │                           │                          │
     │                           │<─────────────────────────┤
     │                           │ User data                │
     │                           │                          │
     │                           │ bcrypt.compare()         │
     │                           │                          │
     │                           │ generateToken(JWT)       │
     │                           │                          │
     │<──────────────────────────┤                          │
     │ { token, user }           │                          │
     │                           │                          │
     │ Store token in            │                          │
     │ localStorage              │                          │
     │                           │                          │
     │ All subsequent requests   │                          │
     ├──────────────────────────>│                          │
     │ Authorization: Bearer token                          │
     │                           │                          │
     │                           │ verifyToken(JWT)         │
     │                           │                          │
     │                           │ Add user to req          │
     │                           │                          │
```

## Fluxo de Produto (Compra via WhatsApp)

```
┌──────────┐              ┌──────────┐              ┌──────────┐
│   User   │              │ Frontend │              │ WhatsApp │
└────┬─────┘              └────┬─────┘              └────┬─────┘
     │                         │                         │
     │ Browse catalog          │                         │
     ├────────────────────────>│                         │
     │                         │                         │
     │                         │ GET /api/products       │
     │                         │ (fetch active products) │
     │                         │                         │
     │ View product card       │                         │
     │ - Image                 │                         │
     │ - Name                  │                         │
     │ - Price                 │                         │
     │ - Stock badge           │                         │
     │                         │                         │
     │ Click "Comprar" or      │                         │
     │ "Consultar Disponib."   │                         │
     ├────────────────────────>│                         │
     │                         │                         │
     │                         │ Generate WhatsApp URL   │
     │                         │ with product info       │
     │                         │                         │
     │                         │ Open WhatsApp           │
     │                         ├────────────────────────>│
     │                         │                         │
     │<────────────────────────┼─────────────────────────┤
     │          WhatsApp conversation                    │
     │                                                    │
```

## Stack Tecnológico

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **HTTP Client:** Axios
- **State Management:** React Hooks

### Backend
- **Runtime:** Node.js 20
- **Framework:** Express
- **Language:** TypeScript
- **ORM:** Prisma
- **Authentication:** JWT + bcrypt
- **Validation:** Manual validation

### Database
- **DBMS:** PostgreSQL 16
- **Migration:** Prisma Migrate
- **Seed:** Custom seed script

### DevOps
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **CI/CD Ready:** Railway, Vercel, Heroku

## Segurança

### Autenticação
- JWT com expiração de 7 dias
- Senhas hasheadas com bcrypt (10 rounds)
- Token armazenado no localStorage
- Middleware de proteção de rotas

### Validação
- Validação de inputs no backend
- Sanitização de dados
- CORS configurado
- TypeScript para type safety

### Boas Práticas
- .env para variáveis sensíveis
- .gitignore para arquivos sensíveis
- Princípio do menor privilégio
- Separação de concerns

## Escalabilidade

### Horizontal
- Stateless backend (pode escalar horizontalmente)
- JWT permite múltiplas instâncias
- Banco de dados centralizado

### Vertical
- Otimizações de queries (Prisma)
- Índices no banco (isActive)
- Cache de imagens (Next.js)

### Futuras Melhorias
- Redis para cache
- CDN para assets
- Load balancer
- Rate limiting
- Logs centralizados
