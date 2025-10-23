# 🔐 Variáveis de Ambiente para Railway

## 📋 Backend - Variáveis de Ambiente

Configure estas variáveis no serviço **Backend** do Railway:

```env
# Database (Railway irá fornecer automaticamente)
DATABASE_URL=${{Postgres.DATABASE_URL}}

# JWT Secret (COPIE ESTE VALOR GERADO)
JWT_SECRET=2a6b5799227206128ccfbee7b6376f4ab96fe74f065a6139a3b1734269cec66d

# Server
PORT=4000
NODE_ENV=production

# CORS (Adicione depois do deploy do frontend)
FRONTEND_URL=https://seu-frontend.railway.app
```

**⚠️ IMPORTANTE:**
- O `DATABASE_URL` será preenchido automaticamente quando você adicionar o PostgreSQL
- O `JWT_SECRET` acima foi gerado de forma segura - copie exatamente como está
- O `FRONTEND_URL` você só consegue preencher depois do primeiro deploy do frontend

---

## 🎨 Frontend - Variáveis de Ambiente

Configure estas variáveis no serviço **Frontend** do Railway:

```env
# API URL (Adicione a URL do backend depois do deploy)
NEXT_PUBLIC_API_URL=https://seu-backend.railway.app

# WhatsApp
NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068

# Site URL (Adicione depois do primeiro deploy)
NEXT_PUBLIC_SITE_URL=https://seu-frontend.railway.app
```

**⚠️ IMPORTANTE:**
- O `NEXT_PUBLIC_API_URL` você só consegue preencher depois do deploy do backend
- O `NEXT_PUBLIC_SITE_URL` você só consegue preencher depois do primeiro deploy

---

## 📝 Ordem de Deploy

### 1️⃣ Primeiro Deploy

1. **Adicionar PostgreSQL** no Railway
2. **Configurar Backend** com:
   - `DATABASE_URL=${{Postgres.DATABASE_URL}}`
   - `JWT_SECRET=2a6b5799227206128ccfbee7b6376f4ab96fe74f065a6139a3b1734269cec66d`
   - `PORT=4000`
   - `NODE_ENV=production`
   - `FRONTEND_URL=https://temporario.com` (temporário)
3. **Deploy do Backend** → Copie a URL gerada
4. **Configurar Frontend** com:
   - `NEXT_PUBLIC_API_URL=<URL_DO_BACKEND>`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068`
   - `NEXT_PUBLIC_SITE_URL=https://temporario.com` (temporário)
5. **Deploy do Frontend** → Copie a URL gerada

### 2️⃣ Atualizar URLs

1. **Atualizar Backend**:
   - `FRONTEND_URL=<URL_DO_FRONTEND>`
   - Redeploy
2. **Atualizar Frontend**:
   - `NEXT_PUBLIC_SITE_URL=<URL_DO_FRONTEND>`
   - Redeploy

---

## ✅ Checklist de Configuração

### Backend
- [ ] DATABASE_URL configurado
- [ ] JWT_SECRET configurado (usar o valor acima)
- [ ] PORT=4000
- [ ] NODE_ENV=production
- [ ] FRONTEND_URL configurado com URL real

### Frontend
- [ ] NEXT_PUBLIC_API_URL configurado com URL do backend
- [ ] NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
- [ ] NEXT_PUBLIC_SITE_URL configurado com URL real

---

## 🔍 Como Testar

### Backend
```bash
# Teste o health endpoint
curl https://seu-backend.railway.app/health

# Resposta esperada:
# {"status":"OK","message":"America Cannabis API is running"}
```

### Frontend
Acesse `https://seu-frontend.railway.app` no navegador e verifique:
- [ ] Site carrega corretamente
- [ ] Produtos aparecem
- [ ] Imagens carregam
- [ ] Botão WhatsApp funciona

---

**Última atualização:** 2025-10-23
**JWT_SECRET gerado em:** 2025-10-23
