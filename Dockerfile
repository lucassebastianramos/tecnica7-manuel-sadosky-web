# ---- Base Stage ----
# Usar una imagen base de Node.js. Alpine es ligera.
# Especificar la versión de Node que coincida con la de desarrollo (ej. LTS)
FROM node:18-slim AS base
WORKDIR /usr/src/app

ENV ROLLUP_SKIP_NATIVE=1
RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    git \
    openssl \
  && rm -rf /var/lib/apt/lists/*

# ---- Frontend Builder Stage ----
# Compila el frontend (Vite) dentro de la imagen. Así el build de producción
# no depende de la carpeta frontend-dist (que no se commitea al repo).
FROM node:18-slim AS frontend-builder
WORKDIR /usr/src/app/frontend

ENV ROLLUP_SKIP_NATIVE=1
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
# vite.config.ts escribe el build en ../frontend-dist => /usr/src/app/frontend-dist
RUN npm run build

# ---- Builder Stage ----
# Esta etapa instala todas las dependencias (dev y prod), copia el código fuente,
# genera Prisma Client y compila TypeScript.
FROM base AS builder
COPY package*.json ./
# Copy Prisma schema before npm install, because postinstall runs `prisma generate`
COPY prisma ./prisma
RUN npm install
COPY . .
# Build backend only (TypeScript -> dist). El frontend se compila en la etapa frontend-builder
RUN npm run build:backend
RUN npx prisma generate
# Opcional: Limpiar devDependencies si se quiere optimizar un poco más antes de la siguiente etapa,
# aunque la etapa 'production' reinstalará solo las de producción.
# RUN npm prune --production (si se quiere copiar node_modules desde aquí a producción)

# ---- Production Stage ----
# Usar una imagen más pequeña para producción final.
FROM node:18-slim AS production
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Copiar package.json y schema de Prisma antes de instalar para que el postinstall encuentre el schema
COPY package*.json ./
COPY prisma ./prisma
RUN npm install --omit=dev --no-optional
# Provide ts-node/typescript for Prisma seed in production
RUN npm install ts-node typescript --no-save

# Si npm prune --production se usó en la etapa 'builder', se podrían copiar los node_modules desde allí:
# COPY --from=builder /usr/src/app/node_modules ./node_modules

# Copiar los artefactos de build (código Javascript compilado) desde la etapa 'builder'.
COPY --from=builder /usr/src/app/dist ./dist

# (ya copiado arriba en esta etapa)

# Copiar el build del frontend (compilado en la etapa frontend-builder) como carpeta pública
COPY --from=frontend-builder /usr/src/app/frontend-dist ./public

# Copy entrypoint to run migrations then start server
COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x ./entrypoint.sh

# Exponer el puerto en el que corre la aplicación (según src/config.ts o .env).
# El valor por defecto es 3000.
EXPOSE 3000 

# Comando para ejecutar la aplicación.
# NODE_ENV=production es importante para optimizaciones.
# El .env en el host debe definir NODE_ENV=production para docker-compose.
ENTRYPOINT ["./entrypoint.sh"]

# Consideraciones para migraciones en producción:
# Un script entrypoint podría ejecutar 'npx prisma migrate deploy' antes del CMD.
# Ejemplo:
# COPY entrypoint.sh .
# RUN chmod +x entrypoint.sh
# ENTRYPOINT ["./entrypoint.sh"]
# (entrypoint.sh contendría: npx prisma migrate deploy && exec node dist/server.js)
# Por ahora, las migraciones se asumen manejadas externamente o como un comando exec.
