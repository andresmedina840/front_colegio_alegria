# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# Cachea las dependencias instalando primero solo package.json
COPY package.json package-lock.json* ./
RUN npm ci --force

# Copia el resto de los archivos
COPY . .

# Variables de construcción
ARG NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BACKEND

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BACKEND=${NEXT_PUBLIC_BACKEND}

# Construye la aplicación
RUN npm run build

# -----------------------------
# Etapa de producción
# -----------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# Solo copia lo necesario para producción
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

# Usuario no root para seguridad
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs && \
    chown -R nextjs:nodejs /app

USER nextjs

# Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# Comando de inicio optimizado
CMD ["node", "server.js"]