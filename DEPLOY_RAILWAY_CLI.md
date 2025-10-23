# 🚀 Deploy Railway via CLI - Comandos Diretos

**Execute estes comandos no seu terminal:**

---

## 🎯 Passo a Passo

### 1️⃣ Gerar JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Copie o resultado e guarde!**

---

### 2️⃣ Criar Projeto Railway

```bash
cd /Users/yourapple/americancannabiss
railway init
```

- Nome: **America Cannabis**
- Confirme

---

### 3️⃣ Adicionar PostgreSQL

```bash
railway add
```

- Escolha: **PostgreSQL**

---

### 4️⃣ Deploy Backend

```bash
cd backend
railway up
```

Aguarde o build (3-5 minutos)

---

### 5️⃣ Configurar Variáveis do Backend

```bash
# Ainda na pasta backend
railway variables set DATABASE_URL='${{Postgres.DATABASE_URL}}'
railway variables set JWT_SECRET="COLE_O_JWT_SECRET_AQUI"
railway variables set PORT=4000
railway variables set NODE_ENV=production
```

---

### 6️⃣ Gerar Domínio do Backend

```bash
railway domain
```

**Copie a URL gerada!** (ex: `https://backend-production-abc.up.railway.app`)

---

### 7️⃣ Deploy Frontend

```bash
cd ../frontend
railway up
```

Aguarde o build (5-8 minutos)

---

### 8️⃣ Configurar Variáveis do Frontend

```bash
# Ainda na pasta frontend
railway variables set NEXT_PUBLIC_API_URL="URL_DO_BACKEND_AQUI"
railway variables set NEXT_PUBLIC_WHATSAPP_NUMBER="595982574068"
```

---

### 9️⃣ Gerar Domínio do Frontend

```bash
railway domain
```

**Copie a URL gerada!** (ex: `https://frontend-production-xyz.up.railway.app`)

---

### 🔟 Atualizar Variáveis Finais

```bash
# Frontend - adicionar SITE_URL
railway variables set NEXT_PUBLIC_SITE_URL="URL_DO_FRONTEND_AQUI"

# Backend - adicionar FRONTEND_URL
cd ../backend
railway variables set FRONTEND_URL="URL_DO_FRONTEND_AQUI"
```

---

### 1️⃣1️⃣ Redeploy (Aplicar Variáveis)

```bash
# Backend
cd backend
railway up

# Frontend
cd ../frontend
railway up
```

---

## ✅ Verificar Deploy

```bash
# Testar backend
curl https://SEU-BACKEND-URL.up.railway.app/health

# Deve retornar:
# {"status":"OK","message":"America Cannabis API is running"}
```

---

## 📊 Ver Status

```bash
# Ver serviços
railway status

# Ver logs do backend
cd backend
railway logs

# Ver logs do frontend
cd ../frontend
railway logs
```

---

## 🎉 Pronto!

Acesse: `https://SEU-FRONTEND-URL.up.railway.app`

---

## 📝 Comandos Úteis

```bash
# Ver variáveis
railway variables

# Redeploy
railway up

# Ver logs em tempo real
railway logs --follow

# Abrir no browser
railway open
```

---

## 🔐 Criar Usuário Admin (Depois do Deploy)

```bash
# Conectar ao banco do Railway
cd backend
railway run npx prisma studio

# Ou via script:
railway run npm run prisma:seed
```

---

**Tempo estimado total: 15-20 minutos**
