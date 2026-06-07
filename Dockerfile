# Multi-stage Dockerfile for building and serving the Angular app

# --- Builder stage ---
FROM node:22-alpine AS builder
WORKDIR /app

# Install dependencies (needs devDependencies for the Angular build)
COPY package.json package-lock.json ./
RUN npm ci

# Copy sources and build (production is the default configuration)
COPY . .
RUN npm run build -- --configuration production

# --- Production stage ---
FROM nginx:stable-alpine

# Replace default nginx config to enable SPA fallback (index.html)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built artifacts from builder
COPY --from=builder /app/dist/products-warehouse/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

