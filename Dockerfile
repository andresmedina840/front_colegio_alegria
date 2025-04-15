# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copia archivos de dependencias primero
COPY package.json package-lock.json* ./
RUN npm ci --force

# 2. Copia el resto de los archivos
COPY . .

# 3. Variables de construcción
ARG NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BACKEND

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BACKEND=${NEXT_PUBLIC_BACKEND}

# 4. Construye la aplicación
RUN npm run build

# -----------------------------
# Etapa de producción
# -----------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# 1. Copia archivos necesarios
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# 2. Configura usuario no-root
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs && \
    chown -R nextjs:nodejs /app

USER nextjs

# 3. Variables de entorno
ENV NODE_ENV=production
ENV PORT=3000
ENV NEXT_TELEMETRY_DISABLED=1

EXPOSE 3000

# 4. Comando de inicio
CMD ["npm", "start"]