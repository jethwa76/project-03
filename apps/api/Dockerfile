FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
COPY apps/api/package.json apps/api/package.json
RUN npm install --workspace @project3/api
COPY apps/api ./apps/api
WORKDIR /app/apps/api
RUN npx prisma generate && npm run build
EXPOSE 4000
CMD ["sh","-c","npx prisma migrate deploy && node dist/server.js"]
