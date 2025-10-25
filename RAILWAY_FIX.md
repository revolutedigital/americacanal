# 🚀 Railway Deployment - Configuração Necessária

## ❌ Problemas Encontrados

### Backend
- ✅ **RESOLVIDO** - Erros TypeScript com modelos inexistentes foram comentados no commit `b6d1dd0`

### Frontend
- ❌ **AÇÃO NECESSÁRIA** - Railway não encontra o Dockerfile porque está procurando no diretório raiz

---

## ✅ SOLUÇÃO - Configurar Root Directory

### Opção 1: Configurar Root Directory (RECOMENDADO)

1. Acesse: https://railway.app
2. Vá em **AMERICACANAL** project
3. Clique no serviço **frontend**
4. Clique em **Settings** (⚙️)
5. Role até encontrar **"Root Directory"** ou **"Source"**
6. Configure: `frontend`
7. Salve as alterações
8. Clique em **"Redeploy"** ou espere o deploy automático

### Opção 2: Mudar para NIXPACKS (alternativa)

Se a Opção 1 não funcionar:

1. No serviço **frontend** → **Settings**
2. Encontre **"Builder"** ou **"Build Configuration"**
3. Mude de `DOCKERFILE` para `NIXPACKS`
4. Salve e clique em **"Redeploy"**

NIXPACKS detecta automaticamente Next.js e faz o build correto sem precisar do Dockerfile.

---

## 🧪 Verificar se Funcionou

Após o deploy completar (3-5 minutos):

### Teste o Backend:
```bash
curl https://backend-production1.up.railway.app/api/products?tenantId=0fb61585-3cb3-48b3-ae76-0a5358084a8c
```
✅ Deve retornar lista de produtos em JSON

### Teste o Frontend:
```bash
curl https://frontend-production1.up.railway.app/produtos/tree-house-2ml-delta-8-9-10-thc-a-sativa
```
✅ Deve retornar HTML com o nome do produto (não skeleton)
✅ Deve carregar `/produtos/%5Bslug%5D` (não `%5Bid%5D`)

---

## 📝 Mudanças Realizadas no Código

### Backend (commit b6d1dd0):
- Comentadas linhas que usavam `prisma.wishlist`, `prisma.benefit`, `prisma.manualSale`
- Estes modelos não existem no schema atual do Prisma

### Frontend (commits anteriores):
- ✅ Deletados arquivos antigos: `page-old-client.tsx`, `page-backup.tsx`
- ✅ Apenas `/produtos/[slug]/page.tsx` correto permanece
- ✅ TypeScript build passa sem erros
- ❌ Railway precisa ser configurado para encontrar o Dockerfile

---

## 🆘 Se Ainda Não Funcionar

Se após configurar o Root Directory ou mudar para NIXPACKS ainda não funcionar:

### Opção 3: Recriar Serviço Frontend

1. Delete o serviço `frontend` atual no Railway
2. Crie um novo serviço
3. Conecte ao repositório GitHub `revolutedigital/americacanal`
4. Configure:
   - Branch: `main`
   - Root Directory: `frontend`
   - Builder: `NIXPACKS` (recomendado) ou `DOCKERFILE`
5. Adicione as variáveis de ambiente:
   ```
   NEXT_PUBLIC_API_URL=https://backend-production1.up.railway.app
   NEXT_PUBLIC_WHATSAPP_NUMBER=595982574068
   NEXT_PUBLIC_SITE_URL=https://frontend-production1.up.railway.app
   ```

---

## 📊 Status Atual

| Serviço | Status | Ação Necessária |
|---------|--------|-----------------|
| Backend | ✅ OK | Nenhuma (após commit b6d1dd0) |
| Frontend | ⚠️ AGUARDANDO | Configurar Root Directory no Railway Dashboard |
