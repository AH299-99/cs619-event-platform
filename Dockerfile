FROM node:22-alpine

WORKDIR /app

# native build tools for better-sqlite3
RUN apk add --no-cache python3 make g++

COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend/ ./

ENV NODE_ENV=production \
    HOST=0.0.0.0 \
    PORT=7860

RUN npm run build

EXPOSE 7860

CMD ["npm", "run", "start"]
