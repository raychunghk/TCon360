# Stage 1: Builder
FROM node:18 AS builder

# Install pnpm globally
RUN npm install -g pnpm@10.12.1 --force

# Set working directory to workspace root
WORKDIR /app

# Copy workspace configuration files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Copy config package source
COPY packages/config ./packages/config

# Copy frontend package files
COPY frontend/package.json frontend/pnpm-lock.yaml ./frontend/

# Install dependencies for the entire workspace
RUN pnpm install

# Build the config package
RUN cd packages/config && pnpm build

# Copy the rest of the frontend source code
COPY frontend/ ./frontend/

# Set build-time environment variables
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG JWT_SECRET
ENV JWT_SECRET=${JWT_SECRET}
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
ARG BACKEND_PORT
ENV BACKEND_PORT=${BACKEND_PORT}
ARG TOKEN_MAX_AGE
ENV TOKEN_MAX_AGE=${TOKEN_MAX_AGE}
ARG NEXT_PUBLIC_BASEPATH
ENV NEXT_PUBLIC_BASEPATH=${NEXT_PUBLIC_BASEPATH}
ENV FRONTEND_PORT=3000
ENV USE_REVERSE_PROXY=false
ENV PROXY_PATH=/absproxy

# Build the frontend Next.js application
RUN cd frontend && pnpm build

# Stage 2: Runtime
FROM node:18-alpine AS runner

# Install pnpm globally for runtime
RUN npm install -g pnpm@10.12.1 --force

# Set working directory to frontend
WORKDIR /app/frontend

# Copy package files for production install
COPY --from=builder /app/frontend/package.json /app/frontend/pnpm-lock.yaml ./

# Install only production dependencies
RUN pnpm install --prod

# Copy built artifacts from builder
COPY --from=builder /app/frontend/.next ./.next
COPY --from=builder /app/frontend/public ./public
COPY --from=builder /app/frontend/next.config.mjs ./next.config.mjs

# Copy the entire node_modules to preserve workspace symlinks
COPY --from=builder /app/node_modules ./node_modules

# Set runtime environment variables
ENV NODE_ENV=${NODE_ENV}
ENV JWT_SECRET=${JWT_SECRET}
ENV DATABASE_URL=${DATABASE_URL}
ENV BACKEND_PORT=${BACKEND_PORT}
ENV TOKEN_MAX_AGE=${TOKEN_MAX_AGE}
ENV FRONTEND_PORT=3000
ENV USE_REVERSE_PROXY=false
ENV PROXY_PATH=/absproxy
ENV NEXT_PUBLIC_BASEPATH=${NEXT_PUBLIC_BASEPATH}

# Expose the port
EXPOSE 3000

# Start the Next.js application
CMD ["pnpm", "start"]