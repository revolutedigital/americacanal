# 🚀 Deploy Rápido via Railway CLI + Dashboard

**Projeto criado:** americacanal
**URL:** https://railway.com/project/aa6ba8cb-91e6-43b4-98f0-5caae0e1a911

---

## ⚡ Passos Rápidos

### 1️⃣ Adicionar PostgreSQL (Manual via Dashboard)

O Railway CLI não permite adicionar PostgreSQL via terminal não-interativo.

**Faça no Dashboard:**

1. Acesse: https://railway.com/project/aa6ba8cb-91e6-43b4-98f0-5caae0e1a911
2. Clique em **"+ New"**
3. Selecione **"Database"** → **"Add PostgreSQL"**
4. Aguarde a criação (30 segundos)

---

### 2️⃣ Deploy do Backend (Via CLI)

```bash
cd /Users/yourapple/americancannabiss/backend

# Deploy do backend
railway up --service backend

# Configurar variáveis de ambiente
railway variables --set DATABASE_URL="\${{Postgres.DATABASE_URL}}"
railway variables --set JWT_SECRET="2a6b5799227206128ccfbee7b6376f4ab96fe74f065a6139a3b1734269cec66d"
railway variables --set PORT="4000"
railway variables --set NODE_ENV="production"
railway variables --set FRONTEND_URL="https://temporario.com"
```

---

### 3️⃣ Deploy do Frontend (Via CLI)

Primeiro, pegue a URL do backend que foi gerada no passo anterior.

```bash
cd /Users/yourapple/americancannabiss/frontend

# Deploy do frontend
railway up --service frontend

# Configurar variáveis de ambiente (substitua <URL_DO_BACKEND>)
railway variables --set NEXT_PUBLIC_API_URL="<URL_DO_BACKEND>"
railway variables --set NEXT_PUBLIC_WHATSAPP_NUMBER="595982574068"
railway variables --set NEXT_PUBLIC_SITE_URL="https://temporario.com"
```

---

### 4️⃣ Atualizar URLs Finais

Depois de ambos os deploys, atualize as URLs:

```bash
# Backend - atualizar FRONTEND_URL
cd /Users/yourapple/americancannabiss/backend
railway variables --set FRONTEND_URL="<URL_DO_FRONTEND>"
railway up --service backend

# Frontend - atualizar SITE_URL
cd /Users/yourapple/americancannabiss/frontend
railway variables --set NEXT_PUBLIC_SITE_URL="<URL_DO_FRONTEND>"
railway up --service frontend
```

---

## 🎯 Alternativa: Deploy Totalmente via Dashboard

Se preferir fazer tudo via interface visual:

1. **Acesse:** https://railway.com/project/aa6ba8cb-91e6-43b4-98f0-5caae0e1a911

2. **Adicionar PostgreSQL:**
   - "+ New" → "Database" → "PostgreSQL"

3. **Adicionar Backend:**
   - "+ New" → "GitHub Repo" → `revolutedigital/americacanal`
   - Root Directory: `backend`
   - Variables: (copie de RAILWAY_ENV_VARS.md)

4. **Adicionar Frontend:**
   - "+ New" → "GitHub Repo" → `revolutedigital/americacanal`
   - Root Directory: `frontend`
   - Variables: (copie de RAILWAY_ENV_VARS.md)

---

## 📋 Checklist

- [ ] PostgreSQL adicionado
- [ ] Backend deployado
- [ ] Frontend deployado
- [ ] URLs atualizadas
- [ ] Health check do backend OK
- [ ] Site frontend abrindo

---

**Qual método você prefere?**
- CLI Híbrido (PostgreSQL manual + resto CLI)
- Dashboard Completo
