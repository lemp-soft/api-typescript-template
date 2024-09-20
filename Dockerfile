# Etapa 1: Construcción
FROM node:20 AS build

# Instalar pnpm
RUN npm install -g pnpm

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml antes para aprovechar la caché de Docker
COPY package.json pnpm-lock.yaml ./

# Instalar todas las dependencias (incluyendo las de desarrollo)
RUN pnpm install --frozen-lockfile

# Copiar el resto del código fuente
COPY . .

# Copiar el directorio prisma antes de ejecutar prisma generate
COPY prisma ./prisma

# Ejecutar prisma generate
RUN pnpm prisma generate || { echo "Error al ejecutar prisma generate"; exit 1; }

# Crear el archivo .env con las variables de entorno
RUN echo "DATABASE_URL=${DATABASE_URL}" >> .env && \
    echo "JWT_SECRET=${JWT_SECRET}" >> .env && \
    echo "PORT=${PORT}" >> .env && \
    echo "BCRYPT_SALT_ROUNDS=${BCRYPT_SALT_ROUNDS}" >> .env

# Etapa 2: Ejecución
FROM node:20

# Especificar las variables que necesitas
ARG DATABASE_URL
ARG JWT_SECRET
ARG PORT
ARG BCRYPT_SALT_ROUNDS

# Instalar pnpm
RUN npm install -g pnpm

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Instalar dependencias de producción
RUN pnpm install --prod

# Copiar el build de la etapa anterior
COPY --from=build /app/dist ./dist

# Copiar el archivo .env de la etapa de construcción
COPY --from=build /app/.env ./

# Exponer el puerto
EXPOSE ${PORT}

# Ejecutar las migraciones y la aplicación
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/index.js"]
