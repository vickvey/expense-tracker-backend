FROM node:20-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy and install only production deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile --prod

# Copy all code
COPY . .

# Build the TypeScript code
RUN pnpm build

# App listens on this port
EXPOSE 5500

# Run the compiled app
CMD ["node", "dist/index.js"]
