FROM node:24-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm@11.27.0

# Copy monorepo dependencies
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./

# Copy only the API source code into the image
COPY apps/api ./apps/api

# Install all workspace dependencies
RUN pnpm install --no-frozen-lockfile

# Set working directory for the API
WORKDIR /app/apps/api

EXPOSE 8080
CMD ["pnpm", "dev"]