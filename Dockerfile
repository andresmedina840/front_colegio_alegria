# Etapa 1: Construcción (builder)
FROM node:18-alpine AS builder

WORKDIR /app

# Copia solo los archivos necesarios para instalar dependencias
COPY package.json package-lock.json* ./
RUN npm ci --quiet

# Copia el resto de los archivos
COPY . .

# Construye la aplicación (asegúrate de tener output: standalone en next.config.js)
RUN npm run build

# Etapa 2: Producción (runner)
FROM node:18-alpine

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

# Copia solo lo necesario desde la etapa de construcción
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

# Usa el comando más eficiente para producción
CMD ["node", ".next/standalone/server.js"]