# 🔧 Guia: Corrigir Imagens Placeholder

## Problema Identificado

**via.placeholder.com está OFFLINE**, causando:
- `ERR_NAME_NOT_RESOLVED` no browser
- Centenas de imagens quebradas no site
- Console poluído com erros

## Solução Implementada

### 1. ✅ Endpoint Local `/api/placeholder` (JÁ DEPLOYADO)

Criado endpoint que gera SVGs localmente sem dependência externa.

**Exemplo de uso**:
```
/api/placeholder?width=800&height=800&text=Produto&bg=10b981&color=ffffff
```

**Vantagens**:
- Sempre disponível (não depende de serviço externo)
- Cache de 1 ano
- Customizável (cores, texto, tamanho)

### 2. ⏳ Script para Atualizar Banco de Dados

Criado script que substitui TODAS as URLs `via.placeholder.com` por `/api/placeholder` no banco.

## Como Executar o Script

### Opção A: Via Railway CLI (RECOMENDADO)

```bash
# 1. Entrar no container do backend
railway run bash --service backend

# 2. Dentro do container, executar:
npx ts-node scripts/fix-placeholder-urls.ts

# 3. Aguardar conclusão (mostrará progresso)
```

### Opção B: Localmente com Conexão ao Banco Railway

```bash
# 1. Navegar para pasta do backend
cd backend

# 2. Definir DATABASE_URL do Railway
export DATABASE_URL="postgresql://postgres:TUFSTLBNOsOqmcsXkOwQHrqySggBDOpi@gondola.proxy.rlwy.net:35644/railway"

# 3. Executar script
npx ts-node scripts/fix-placeholder-urls.ts
```

### Opção C: Via Docker (se backend está em Docker)

```bash
# 1. Listar containers
docker ps

# 2. Entrar no container do backend
docker exec -it <container_id> bash

# 3. Executar script
npx ts-node scripts/fix-placeholder-urls.ts
```

## O Que o Script Faz

1. **Busca** todos os produtos no banco
2. **Identifica** quais têm URLs `via.placeholder.com`
3. **Converte** URLs mantendo parâmetros:
   ```
   ANTES:
   https://via.placeholder.com/800x800/10b981/ffffff?text=Complexo%20Deltas

   DEPOIS:
   https://www.americacannabis.com/api/placeholder?width=800&height=800&bg=10b981&color=ffffff&text=Complexo%20Deltas
   ```
4. **Atualiza** produto no banco de dados
5. **Mostra** progresso e relatório final

## Output Esperado

```
🔧 Iniciando substituição de URLs via.placeholder.com...

📦 Total de produtos: 95

✅ Atualizado: Complexo Deltas Skywalker
   Antes: https://via.placeholder.com/800x800/10b981/ffffff?text=...
   Depois: https://www.americacannabis.com/api/placeholder?width=...

✅ Atualizado: Complexo Deltas Pine
   Antes: https://via.placeholder.com/800x800/10b981/ffffff?text=...
   Depois: https://www.americacannabis.com/api/placeholder?width=...

...

📊 RELATÓRIO FINAL:
   ✅ Atualizados: 27
   ⏭️  Pulados: 68
   📦 Total: 95

✅ Script concluído com sucesso!
```

## Verificação Pós-Execução

1. **Limpar cache do browser** (Ctrl+Shift+R ou Cmd+Shift+R)
2. **Acessar site** em https://frontend-production1.up.railway.app
3. **Abrir console** (F12)
4. **Verificar**: Não deve mais ter `ERR_NAME_NOT_RESOLVED`

## Troubleshooting

### Erro: "Cannot find module 'ts-node'"

```bash
npm install -g ts-node
# ou
npx -y ts-node scripts/fix-placeholder-urls.ts
```

### Erro: "DATABASE_URL is not defined"

Defina a variável de ambiente:
```bash
export DATABASE_URL="postgresql://user:pass@host:port/database"
```

### Erro: "Permission denied"

```bash
chmod +x scripts/fix-placeholder-urls.ts
```

## Rollback (Se Necessário)

Se algo der errado, você pode reverter:

```sql
-- Conectar ao banco via Railway
railway run psql

-- Ver produtos afetados
SELECT id, name, images
FROM "Product"
WHERE images::text LIKE '%americacannabis.com/api/placeholder%';

-- Não há rollback automático, mas você pode restaurar backup
```

## Commits Relacionados

- [`df7f677`](https://github.com/revolutedigital/americacanal/commit/df7f677) - Placeholder endpoint criado
- [`e3d56fe`](https://github.com/revolutedigital/americacanal/commit/e3d56fe) - Image optimization fix

## Status Atual

- ✅ Endpoint `/api/placeholder` deployado
- ⏳ Script criado, aguardando execução
- ⏳ Banco de dados ainda tem URLs antigas

**Próxima ação**: Executar script no backend (Railway ou localmente)
