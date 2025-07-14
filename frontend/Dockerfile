# frontend/Dockerfile
# 1) build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# 2) production stage
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/ ./
EXPOSE 3000
CMD ["npm", "run", "start"]

