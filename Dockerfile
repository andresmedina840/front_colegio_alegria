# Etapa 1: Construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Copiar package.json y lockfile para instalar dependencias
COPY package*.json ./

# Instalar dependencias de producción y desarrollo
RUN npm install

# Copiar todo el proyecto
COPY . .

# Generar build optimizado en modo standalone
RUN npm run build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario del build anterior
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Crear usuario seguro
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs && \
    chown -R nextjs:nodejs /app

USER nextjs

ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

CMD ["node", ".next/standalone/server.js"]
