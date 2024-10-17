# Usar uma imagem base oficial do Node.js
FROM node:18-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

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
