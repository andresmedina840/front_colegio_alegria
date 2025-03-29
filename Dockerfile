# 🛠️ Etapa de construcción optimizada
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar solo lo necesario para instalar dependencias
COPY package.json package-lock.json ./

# Instalación limpia y reproducible
RUN npm ci --progress=false

# Copiar el resto de los archivos
COPY . .

# Construcción con cache de Next.js
RUN npm run build

# 🚀 Etapa de producción ligera
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copiar solo lo necesario desde la etapa de construcción
COPY --from=builder /app/package*.json ./ 
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/next.config.js ./next.config.js

# Limpieza de cache innecesaria
RUN npm cache clean --force

# Salud del contenedor
HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

EXPOSE 3000

# Inicio optimizado
CMD ["npm", "start"]
