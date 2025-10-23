# 🚀 Deploy Manual via Railway Dashboard

**Projeto:** americacanal
**URL:** https://railway.com/project/aa6ba8cb-91e6-43b4-98f0-5caae0e1a911

---

## 📦 1. Criar Serviço BACKEND

1. **No dashboard**, clique em **"+ New"**
2. Selecione **"GitHub Repo"**
3. Escolha: **`revolutedigital/americacanal`**
4. Railway vai criar o serviço

### Configurar Backend

1. **Clique no serviço criado**
2. Vá em **Settings**:
   - **Service Name:** `backend`
   - **Root Directory:** `backend`
   - **Builder:** Dockerfile (deve detectar automaticamente)

3. Vá em **Variables** e adicione:

```env
DATABASE_URL=${{Postgres.DATABASE_URL}}
JWT_SECRET=2a6b5799227206128ccfbee7b6376f4ab96fe74f065a6139a3b1734269cec66d
PORT=4000
NODE_ENV=production
FRONTEND_URL=https://temporario.com
```

**Como adicionar DATABASE_URL:**
- Clique em **"+ New Variable"**
- Clique em **"Add Reference"**
- Selecione **"Postgres"** → **"DATABASE_URL"**
- Isso vai criar: `${{Postgres.DATABASE_URL}}`

4. **Salvar** e aguardar o deploy automático (3-5 minutos)

5. **Copie a URL** gerada (algo como `https://backend-production-xxx.railway.app`)

---

## 🎨 2. Criar Serviço FRONTEND

1. **No dashboard**, clique em **"+ New"**
2. Selecione **"GitHub Repo"**
3. Escolha: **`revolutedigital/americacanal`**
4. Railway vai criar o serviço

### Configurar Frontend

1. **Clique no serviço criado**
2. Vá em **Settings**:
   - **Service Name:** `frontend`
   - **Root Directory:** `frontend`
   - **Builder:** Dockerfile (deve detectar automaticamente)

3. Vá em **Variables** e adicione (substitua `<URL_DO_BACKEND>`):

```env
NEXT_PUBLIC_API_URL=<URL_DO_BACKEND_QUE_VOCE_COPIOU>
NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
NEXT_PUBLIC_SITE_URL=https://temporario.com
```

4. **Salvar** e aguardar o deploy automático (5-8 minutos)

5. **Copie a URL** gerada (algo como `https://frontend-production-yyy.railway.app`)

---

## 🔄 3. Atualizar URLs Finais

### Backend
1. Vá no serviço **backend** → **Variables**
2. Edite `FRONTEND_URL` e cole a URL do frontend
3. Clique em **"Redeploy"**

### Frontend
1. Vá no serviço **frontend** → **Variables**
2. Edite `NEXT_PUBLIC_SITE_URL` e cole a URL do frontend
3. Clique em **"Redeploy"**

---

## ✅ 4. Verificar se Funcionou

### Backend
```bash
curl https://seu-backend.railway.app/health
```

Deve retornar:
```json
{"status":"OK","message":"America Cannabis API is running"}
```

### Frontend
Abra no navegador: `https://seu-frontend.railway.app`

Deve carregar o site normalmente.

---

## 🎯 Resumo Visual

```
┌─────────────────────────────────────┐
│  Projeto: americacanal              │
├─────────────────────────────────────┤
│  ✅ Postgres (já criado)            │
│  📦 Backend (root: backend/)        │
│  🎨 Frontend (root: frontend/)      │
└─────────────────────────────────────┘
```

---

## 🆘 Se der erro

**No serviço que falhou:**
1. Clique no deployment que falhou
2. Vá em **"View Logs"**
3. Copie a mensagem de erro
4. Me envie para eu te ajudar

---

**Pronto!** Siga esses passos e me avise quando terminar ou se encontrar algum erro.
