# Etapa de build
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências usando npm ci
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Gera o build da aplicação Next.js
RUN npm run build

# Etapa de produção
FROM node:20-alpine AS production

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia apenas os arquivos necessários da etapa de build
COPY --from=builder /app/.next .next
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Define a variável de ambiente para o build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Define o ambiente para produção
ENV NODE_ENV=production

# Expor a porta 3000 para a aplicação
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["npm", "run", "start"]