# Use Node 20 (LTS, recommended for Next.js 14)
FROM node:20-alpine

WORKDIR /app

# Copy only package files first (better caching)
COPY package*.json ./

RUN npm install --only=production

# Now copy the rest of the code
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
