# 🚀 America Cannabis - Como Usar

## Portas Configuradas

- **Backend:** http://localhost:5000
- **Frontend:** http://localhost:3001
- **Admin:** http://localhost:3001/admin

---

## 📦 Opção 1: Iniciar Tudo de Uma Vez

```bash
./start-all.sh
```

Isso iniciará backend e frontend simultaneamente.

---

## 🔧 Opção 2: Iniciar Separadamente

### Backend
```bash
./start-backend.sh
```
ou
```bash
cd backend
npm run dev
```

### Frontend
```bash
./start-frontend.sh
```
ou
```bash
cd frontend
npm run dev
```

---

## 🎯 Acessando o Sistema

### Site Público
```
http://localhost:3001
```

### Painel Admin
```
http://localhost:3001/admin/login
```

**Credenciais padrão:**
- Email: (criar no banco ou usar seed)
- Senha: (configurar)

---

## ✨ Funcionalidades Implementadas

### 📊 Backend (Porta 5000)
- ✅ API REST completa
- ✅ Multi-tenant (isolamento por tenantId)
- ✅ Autenticação JWT
- ✅ Upload de imagens
- ✅ CRUD completo de:
  - Produtos
  - Categorias
  - Reviews (reais e padrão/fake)
  - Benefícios (globais e por produto)
  - Banners (home e categoria)
  - Configurações do tenant

### 🌐 Frontend Público (Porta 3001)
- ✅ Home com banners dinâmicos
- ✅ Carrossel de avaliações padrão
- ✅ Catálogo de produtos
- ✅ Página de produto com:
  - Galeria de imagens com zoom
  - Benefícios dinâmicos
  - Reviews
  - Produtos relacionados
  - WhatsApp checkout

### 🔧 Painel Admin (Porta 3001/admin)
- ✅ Dashboard com analytics
- ✅ Gerenciamento de produtos
- ✅ Gerenciamento de categorias
- ✅ Moderação de reviews
- ✅ **Avaliações Padrão** (fake reviews)
- ✅ **Benefícios Globais**
- ✅ **Banners** (home e categoria)
- ✅ Configurações completas

---

## 🎨 Como Configurar

### 1. Criar Avaliações Padrão
1. Acesse: http://localhost:3001/admin/avaliacoes-padrao
2. Crie avaliações com foto, nome, estrelas e comentário
3. Marque como "Destaque" para aparecer na home
4. Vá em Configurações > Confiança
5. Ative: ☑️ "Usar Avaliações Padrão"

### 2. Criar Benefícios Globais
1. Acesse: http://localhost:3001/admin/beneficios
2. Crie até 10 benefícios (emoji + título + descrição)
3. Vá em Configurações > Confiança
4. Ative: ☑️ "Usar Benefícios Globais"

### 3. Criar Banners
1. Acesse: http://localhost:3001/admin/banners
2. Selecione "Banners da Home"
3. Faça upload das imagens:
   - Desktop: 1920x600px
   - Mobile: 800x800px (opcional)
4. Configure título, subtítulo e CTA
5. Ative o banner

---

## 🛠️ Tecnologias

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Multer + Sharp (upload/otimização)

### Frontend
- Next.js 14 (App Router)
- React 18
- TypeScript
- TailwindCSS
- Axios

---

## 📝 Estrutura do Projeto

```
americancannabiss/
├── backend/              # API (porta 5000)
│   ├── src/
│   │   ├── controllers/  # Lógica de negócio
│   │   ├── routes/       # Rotas da API
│   │   ├── middlewares/  # Auth, etc
│   │   └── server.ts     # Entry point
│   └── prisma/
│       └── schema.prisma # Database schema
│
├── frontend/             # Next.js (porta 3001)
│   ├── src/
│   │   ├── app/          # Pages (App Router)
│   │   ├── components/   # React components
│   │   └── lib/          # Utils, API client
│   └── public/           # Static files
│
├── start-all.sh         # Inicia tudo
├── start-backend.sh     # Apenas backend
└── start-frontend.sh    # Apenas frontend
```

---

## 🔒 Avisos Legais

⚠️ **Avaliações Padrão (Fake Reviews):**
- O uso de avaliações falsas pode violar leis de proteção ao consumidor
- Use por sua conta e risco
- Recomendamos fortemente usar apenas reviews reais de clientes

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique os logs do console
2. Confirme que as portas 5000 e 3001 estão disponíveis
3. Verifique se o PostgreSQL está rodando
4. Confirme as variáveis de ambiente (.env)

---

## 🎉 Pronto para Usar!

Execute `./start-all.sh` e acesse http://localhost:3001

Divirta-se! 🚀
