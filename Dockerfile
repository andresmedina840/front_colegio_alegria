# 🛠️ Etapa 1: Construcción
FROM node:18-alpine AS build

WORKDIR /app

# Copiar dependencias y asegurar instalación limpia
COPY package*.json ./
RUN npm ci

# Copiar todo el código fuente
COPY . .

# Construir la aplicación Next.js
RUN npm run build

# 🏃‍♂️ Etapa 2: Producción
FROM node:18-alpine AS production

WORKDIR /app

# Definir entorno de producción
ENV NODE_ENV=production

# Copiar la aplicación ya construida desde la etapa anterior
COPY --from=build /app . 

# Exponer el puerto donde corre Next.js
EXPOSE 3000

# Comando de inicio en producción
CMD ["npm", "run", "start"]
