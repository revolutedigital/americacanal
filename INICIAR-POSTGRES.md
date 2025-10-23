# 🚨 ERRO: PostgreSQL Não Está Rodando

## ❌ Problema Identificado

O erro que você está vendo:
```
Erro interno do servidor
```

É causado por:
```
Can't reach database server at `localhost:5432`
```

**O PostgreSQL não está rodando!**

---

## ✅ SOLUÇÕES (Escolha uma):

### Opção 1: Se você tem Postgres.app (macOS)

1. **Abra o Postgres.app:**
   - Vá em `Applications` → `Postgres.app`
   - Ou use Spotlight (Cmd+Space) e digite "Postgres"

2. **Clique no botão "Start"**

3. **Verifique se está rodando:**
   - Deve aparecer um elefante azul na barra de menu

---

### Opção 2: Se você instalou via Homebrew

```bash
# Iniciar PostgreSQL 14
brew services start postgresql@14

# OU PostgreSQL genérico
brew services start postgresql

# Verificar status
brew services list | grep postgres
```

---

### Opção 3: Se você tem PostgreSQL instalado manualmente

```bash
# Encontrar onde está instalado
which postgres

# Iniciar manualmente (substitua o caminho)
pg_ctl -D /usr/local/var/postgres start

# OU
sudo systemctl start postgresql
```

---

### Opção 4: Usar Docker (Recomendado se nada funcionar)

```bash
# Parar qualquer postgres existente
docker stop postgres-america 2>/dev/null
docker rm postgres-america 2>/dev/null

# Iniciar PostgreSQL via Docker
docker run --name postgres-america \
  -e POSTGRES_PASSWORD=postgres123 \
  -e POSTGRES_DB=america_cannabis \
  -p 5432:5432 \
  -d postgres:14

# Aguardar 3 segundos
sleep 3

# Verificar se está rodando
docker ps | grep postgres
```

---

## 🔍 Como Verificar se PostgreSQL Iniciou

Execute este comando:

```bash
# Testar conexão
psql -h localhost -U postgres -d america_cannabis -c "SELECT 1"
```

Se retornar sem erro, está funcionando!

---

## 🚀 Depois que o PostgreSQL Estiver Rodando

**APENAS RECARREGUE A PÁGINA** no navegador:

```
http://localhost:5178/admin/login
```

E faça login novamente com:
```
Email: admin@americacannabiss.com
Senha: admin123
```

**Vai funcionar!**

---

## 🔧 Se Ainda Não Funcionar

Execute os comandos abaixo e me envie a saída:

```bash
# Verificar se a porta 5432 está em uso
lsof -i:5432

# Verificar processos do postgres
ps aux | grep postgres

# Verificar se o banco existe
psql -h localhost -U postgres -l
```

---

## 💡 IMPORTANTE

O PostgreSQL precisa estar rodando SEMPRE que você for usar o sistema.

**Sintomas de PostgreSQL não rodando:**
- ❌ Erro 500 ao fazer login
- ❌ "Erro interno do servidor"
- ❌ "Can't reach database server"
- ❌ Produtos não carregam
- ❌ Nada funciona no admin

**Com PostgreSQL rodando:**
- ✅ Login funciona
- ✅ Produtos aparecem
- ✅ Tudo funciona perfeitamente
