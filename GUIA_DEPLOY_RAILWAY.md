# 🚀 Guia Completo de Deploy no Railway - América Cannabis

**Repositório:** https://github.com/revolutedigital/americacanal

---

## 📋 Pré-requisitos

- [ ] Conta no Railway (https://railway.app)
- [ ] Conta no GitHub
- [ ] Código enviado para o repositório
- [ ] Credenciais de banco de dados PostgreSQL

---

## 🗂️ Estrutura do Projeto

```
americancannabiss/
├── backend/           # API Node.js + Express + Prisma
│   ├── Dockerfile
│   ├── railway.json
│   ├── docker-entrypoint.sh
│   └── .env.example
└── frontend/          # Next.js 14
    ├── Dockerfile
    ├── railway.json
    └── .env.example
```

---

## 🎯 Passo a Passo Completo

### 1️⃣ Preparar o Repositório GitHub

#### 1.1 Criar/Configurar Repositório

```bash
cd /Users/yourapple/americancannabiss

# Se ainda não iniciou o git
git init

# Adicionar o remote
git remote add origin https://github.com/revolutedigital/americacanal.git

# Verificar remote
git remote -v

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "feat: projeto América Cannabis pronto para deploy"

# Enviar para GitHub
git push -u origin main
```

**⚠️ IMPORTANTE:** Antes de fazer push, certifique-se de ter um `.gitignore` adequado:

```bash
# Verificar se .gitignore existe
cat .gitignore

# Se não existir, criar
```

#### 1.2 Verificar .gitignore

O `.gitignore` deve conter **PELO MENOS**:

```
# Dependencies
node_modules/
package-lock.json

# Environment Variables (NUNCA commitar!)
.env
.env.local
.env.production
.env.development

# Build outputs
dist/
.next/
out/
build/

# Logs
logs/
*.log
npm-debug.log*

# OS
.DS_Store
Thumbs.db

# IDEs
.vscode/
.idea/

# Uploads (se você tiver)
uploads/
public/uploads/
```

---

### 2️⃣ Deploy do Backend (API)

#### 2.1 Criar Novo Projeto no Railway

1. Acesse https://railway.app
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Escolha o repositório: **`revolutedigital/americacanal`**
5. O Railway detectará automaticamente o monorepo

#### 2.2 Adicionar PostgreSQL

1. No seu projeto Railway, clique em **"+ New"**
2. Selecione **"Database"**
3. Escolha **"PostgreSQL"**
4. Aguarde a criação (30 segundos)

#### 2.3 Configurar o Serviço Backend

1. Clique em **"+ New"** novamente
2. Selecione **"GitHub Repo"**
3. Escolha o repo: `revolutedigital/americacanal`
4. Configure:
   - **Root Directory:** `backend`
   - **Builder:** Dockerfile

#### 2.4 Configurar Variáveis de Ambiente (Backend)

No serviço do **Backend**, vá em **Variables** e adicione:

```env
# Database (copie de PostgreSQL → Connect → DATABASE_URL)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# JWT Secret (GERAR UM NOVO!)
JWT_SECRET=SUA_CHAVE_SUPER_SECRETA_AQUI_256_BITS

# Server
PORT=4000
NODE_ENV=production

# CORS (vai adicionar depois que deploy do frontend)
FRONTEND_URL=https://seu-frontend.railway.app
```

**🔐 IMPORTANTE:** Gerar JWT_SECRET seguro:

```bash
# No terminal local:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

#### 2.5 Deploy do Backend

1. Clique em **"Deploy"**
2. Aguarde o build (3-5 minutos)
3. O Railway irá:
   - Rodar o Dockerfile
   - Executar migrations automaticamente
   - Iniciar o servidor
4. Copie a URL pública: `https://seu-backend-xyz.railway.app`

**✅ Verificar se funcionou:**

```bash
# Teste o health endpoint
curl https://seu-backend-xyz.railway.app/health

# Resposta esperada:
# {"status":"OK","message":"America Cannabis API is running"}
```

---

### 3️⃣ Deploy do Frontend (Next.js)

#### 3.1 Configurar Serviço Frontend

1. No Railway, clique em **"+ New"** → **"GitHub Repo"**
2. Escolha novamente: `revolutedigital/americacanal`
3. Configure:
   - **Root Directory:** `frontend`
   - **Builder:** Dockerfile

#### 3.2 Configurar Variáveis de Ambiente (Frontend)

No serviço do **Frontend**, vá em **Variables** e adicione:

```env
# API URL (cole a URL do backend que você copiou)
NEXT_PUBLIC_API_URL=https://seu-backend-xyz.railway.app

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068

# Site URL (vai aparecer depois do deploy)
NEXT_PUBLIC_SITE_URL=https://seu-frontend-abc.railway.app
```

**⚠️ NOTA:** A variável `NEXT_PUBLIC_SITE_URL` você só consegue preencher **depois** do primeiro deploy, então:

1. Deploy sem ela primeiro
2. Copie a URL gerada
3. Adicione a variável
4. Faça redeploy

#### 3.3 Deploy do Frontend

1. Clique em **"Deploy"**
2. Aguarde o build (5-8 minutos - Next.js é mais demorado)
3. Copie a URL: `https://seu-frontend-abc.railway.app`

#### 3.4 Atualizar FRONTEND_URL no Backend

1. Volte no serviço **Backend**
2. Vá em **Variables**
3. Edite `FRONTEND_URL` para a URL do frontend
4. Clique em **"Deploy"** para aplicar

---

### 4️⃣ Configurar Domínio Customizado (Opcional)

#### 4.1 Frontend (Site Principal)

1. No serviço **Frontend**, vá em **Settings** → **Domains**
2. Clique em **"+ Custom Domain"**
3. Digite seu domínio: `americacannabis.com`
4. Railway mostrará os registros DNS:

```
Type: CNAME
Name: @
Value: seu-frontend-abc.railway.app
```

5. Adicione esses registros no seu provedor DNS
6. Aguarde propagação (5-60 minutos)

#### 4.2 Backend (API)

1. No serviço **Backend**, vá em **Settings** → **Domains**
2. Adicione: `api.americacannabis.com`
3. Configure DNS:

```
Type: CNAME
Name: api
Value: seu-backend-xyz.railway.app
```

4. **Atualizar variáveis:**
   - Frontend: `NEXT_PUBLIC_API_URL=https://api.americacannabis.com`
   - Backend: `FRONTEND_URL=https://americacannabis.com`
5. Redeploy ambos os serviços

---

## 🔧 Comandos Úteis

### Ver Logs (Debugging)

```bash
# No Railway Dashboard:
# 1. Clique no serviço (Backend ou Frontend)
# 2. Vá em "Deployments"
# 3. Clique no último deployment
# 4. Veja os logs em tempo real
```

### Redeploy Manual

```bash
# No Railway Dashboard:
# 1. Vá no serviço
# 2. Clique em "⋮" (três pontos)
# 3. "Redeploy"
```

### Executar Prisma Studio (Gerenciar DB)

```bash
# Localmente, conectando ao Railway DB:

# 1. Copie DATABASE_URL do Railway
# 2. No terminal local:
cd backend
DATABASE_URL="postgresql://..." npx prisma studio
```

---

## 🔐 Criar Usuário Admin Inicial

Após o primeiro deploy, você precisa criar um usuário admin:

### Opção 1: Via Railway CLI

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Conectar ao projeto
railway link

# Executar comando no backend
railway run npm run prisma:seed
```

### Opção 2: Via Script Node

1. No Railway, vá no **Backend** → **Variables**
2. Adicione temporariamente:
   ```
   RUN_SEED=true
   ```
3. Modifique o `docker-entrypoint.sh` para rodar seed
4. Redeploy
5. **REMOVA** `RUN_SEED=true` depois!

### Opção 3: Manualmente via Prisma Studio (Recomendado)

```bash
# Local, conectado ao Railway DB:
DATABASE_URL="sua-url-do-railway" npx prisma studio

# Vá em "User"
# Clique em "Add record"
# Preencha:
# - email: admin@americacannabiss.com
# - password: (hash bcrypt - gere com ferramenta online)
# - name: Administrator
# - role: ADMIN
# - tenantId: (copie o ID do seu tenant)
```

**Gerar hash bcrypt online:**
- https://bcrypt-generator.com/
- Use rounds: 10
- Senha sugerida: Gere uma forte e segura!

---

## 📊 Checklist Final

### Backend

- [ ] Deploy concluído com sucesso
- [ ] Health endpoint respondendo
- [ ] Database conectado
- [ ] Migrations executadas
- [ ] JWT_SECRET configurado (seguro)
- [ ] CORS configurado com URL do frontend

### Frontend

- [ ] Deploy concluído com sucesso
- [ ] Site abrindo
- [ ] Conectando com API
- [ ] Imagens carregando
- [ ] NEXT_PUBLIC_API_URL correto

### Funcionalidades

- [ ] Login admin funcionando
- [ ] Produtos listando
- [ ] Adicionar ao carrinho funciona
- [ ] WhatsApp button funciona
- [ ] Tracking pixels configurados (se necessário)

---

## 🐛 Troubleshooting

### ❌ "Cannot connect to database"

**Causa:** DATABASE_URL incorreto

**Solução:**
1. Vá no Railway → PostgreSQL → Connect
2. Copie o DATABASE_URL completo
3. Cole no Backend Variables
4. Redeploy

### ❌ "CORS Error" no Frontend

**Causa:** Backend não está aceitando requisições do frontend

**Solução:**
1. Backend Variables → FRONTEND_URL
2. Adicione a URL exata do frontend
3. Redeploy backend

### ❌ "Module not found" no build

**Causa:** Dependência faltando

**Solução:**
```bash
# Local:
cd backend  # ou frontend
npm install
git add package.json package-lock.json
git commit -m "fix: add missing dependencies"
git push
```

### ❌ Imagens não carregam

**Causa:** next.config.js → remotePatterns

**Solução:**
Adicione o domínio do backend em `remotePatterns`:

```js
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'seu-backend-xyz.railway.app',
  },
]
```

### ❌ Build timeout

**Causa:** Build muito longo (>10min)

**Solução Railway:**
1. Settings → Builder
2. Aumente o timeout ou
3. Otimize o Dockerfile (remova pacotes desnecessários)

---

## 💰 Custos Railway

### Free Tier (Hobby Plan)

- **$5/mês de crédito grátis**
- 500 horas de execução
- 1GB RAM
- 1GB disco

### Estimativa para América Cannabis:

```
Backend:  ~$3-5/mês  (sempre rodando)
Frontend: ~$3-5/mês  (sempre rodando)
Database: $5/mês     (PostgreSQL)
Total:    ~$11-15/mês
```

**💡 DICA:** O Hobby Plan gratuito deve cobrir desenvolvimento/testes. Para produção, considere o **Developer Plan ($20/mês)**.

---

## 📚 Recursos Adicionais

- **Railway Docs:** https://docs.railway.app
- **Prisma Deploy:** https://www.prisma.io/docs/guides/deployment
- **Next.js Deploy:** https://nextjs.org/docs/deployment
- **PostgreSQL Railway:** https://docs.railway.app/databases/postgresql

---

## ✅ Conclusão

Seguindo este guia, você terá:

- ✅ Backend rodando no Railway
- ✅ Frontend rodando no Railway
- ✅ PostgreSQL gerenciado
- ✅ SSL/HTTPS automático
- ✅ Migrations automáticas
- ✅ Logs e monitoring
- ✅ CI/CD automático (git push → deploy)

**🚀 O América Cannabis está PRONTO para produção!**

---

**Precisa de ajuda?**
- Railway Discord: https://discord.gg/railway
- Issues GitHub: https://github.com/revolutedigital/americacanal/issues

---

**Última atualização:** 2025-10-22
**Repositório:** https://github.com/revolutedigital/americacanal
