# Etapa de construcción
FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copia los archivos de dependencias primero
COPY package.json package-lock.json* ./

# 2. Instala dependencias (incluyendo devDependencies para la construcción)
RUN npm ci --force

# 3. Copia el resto de los archivos
COPY . .

# 4. Variables de construcción
ARG NODE_ENV=production
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_BACKEND

ENV NODE_ENV=${NODE_ENV}
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_BACKEND=${NEXT_PUBLIC_BACKEND}

# 5. Construye la aplicación
RUN npm run build

# -----------------------------
# Etapa de producción
# -----------------------------
FROM node:18-alpine AS runner

WORKDIR /app

# 1. Copia los archivos necesarios
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.next/standalone ./

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
CMD ["node", "server.js"]