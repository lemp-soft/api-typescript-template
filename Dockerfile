# Dockerfile.railway.template

# Etapa 1: Construcción
FROM node:20 AS build

# Especificar las variables que necesitas
ARG DATABASE_URL
ARG JWT_SECRET
ARG PORT
ARG BCRYPT_SALT_ROUNDS

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

# Construir el proyecto TypeScript
RUN pnpm build

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

# Copiar los archivos de Prisma
COPY prisma ./prisma

# Usar las variables de entorno en el archivo .env
RUN echo "DATABASE_URL=${DATABASE_URL}" >> .env && \
    echo "JWT_SECRET=${JWT_SECRET}" >> .env && \
    echo "PORT=${PORT}" >> .env && \
    echo "BCRYPT_SALT_ROUNDS=${BCRYPT_SALT_ROUNDS}" >> .env

# Exponer el puerto
EXPOSE 3000

# Ejecutar la aplicación
CMD ["node", "dist/index.js"]
