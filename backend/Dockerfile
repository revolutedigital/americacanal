FROM node:20-alpine

# Instalar OpenSSL para Prisma
RUN apk add --no-cache openssl

WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./
COPY prisma ./prisma/

# Instalar dependências (incluindo dev dependencies para o build)
RUN npm ci

# Copiar código fonte
COPY . .

# Gerar Prisma Client
RUN npx prisma generate

# Compilar TypeScript
RUN npm run build

# Remover dev dependencies para produção
RUN npm prune --production

# Copiar script de entrada
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expor porta (Railway usa a variável $PORT)
EXPOSE 4000

# Usar o script de entrada que roda migrations
ENTRYPOINT ["docker-entrypoint.sh"]
