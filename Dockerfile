# Usar uma imagem base oficial do Node.js 20
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Define a variável de ambiente para o build
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}

# Copia o package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante do código da aplicação
COPY . .

# Gera o build da aplicação Next.js
RUN npm run build

# Expor a porta 3000 para a aplicação
EXPOSE 3000

# Comando para iniciar a aplicação em produção
CMD ["npm", "run", "start"]
