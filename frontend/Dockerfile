
# Stage 1: Builder
FROM node:18 AS builder

# Install pnpm globally
RUN npm install -g pnpm@10.12.1 --force

# Set working directory to frontend (workspace root)
WORKDIR /app/frontend

# Copy workspace configuration files
COPY frontend/pnpm-workspace.yaml ./
COPY frontend/package.json ./
COPY packages/config ../packages/config

# Copy pnpm-lock.yaml if it exists
RUN if [ -f frontend/pnpm-lock.yaml ]; then cp frontend/pnpm-lock.yaml /app/frontend/pnpm-lock.yaml; fi

# Log presence of files
RUN echo "builder: Listing frontend directory" && \
    ls -la /app/frontend && \
        echo "builder: pnpm-workspace.yaml exists: $(test -f /app/frontend/pnpm-workspace.yaml && echo yes || echo no)" && \
            echo "builder: Frontend package.json exists: $(test -f /app/frontend/package.json && echo yes || echo no)" && \
                echo "builder: Config package.json exists: $(test -f /app/packages/config/package.json && echo yes || echo no)" && \
                    echo "builder: pnpm-lock.yaml exists: $(test -f /app/frontend/pnpm-lock.yaml && echo yes || echo no)"

                    # Install all dependencies (including devDependencies)
                    RUN NODE_ENV=development pnpm install

                    # Log presence of critical dependencies
                    RUN echo "builder: zustand installed: $(test -d /app/frontend/node_modules/zustand && echo yes || echo no)" && \
                        echo "builder: react-hook-form installed: $(test -d /app/frontend/node_modules/react-hook-form && echo yes || echo no)"

                        # Build the config package
                        RUN cd /app/packages/config && pnpm build

                        # Copy the rest of the frontend source
                        COPY frontend/ ./

                        # Log environment variables before setting
                        RUN echo "builder: JWT_SECRET=$JWT_SECRET"

                        # Set build-time environment variables
                        ARG NODE_ENV=production
                        ENV NODE_ENV=${NODE_ENV}
                        ARG NEXT_PUBLIC_BASEPATH=/tcon360
                        ENV NEXT_PUBLIC_BASEPATH=${NEXT_PUBLIC_BASEPATH}
                        ARG JWT_SECRET
                        ENV JWT_SECRET=${JWT_SECRET}

                        # Log JWT_SECRET and its length after setting
                        RUN echo "builder: JWT_SECRET=$JWT_SECRET" && \
                            echo "builder: JWT_SECRET length=$(expr length "$JWT_SECRET")"

                            # Build the frontend Next.js application
                            RUN pnpm build

                            # Stage 2: Runner
                            FROM node:18-alpine AS runner

                            # Install pnpm globally for runtime
                            RUN npm install -g pnpm@10.12.1 --force

                            # Set working directory to frontend (workspace root)
                            WORKDIR /app/frontend

                            # Copy workspace configuration files for production install
                            COPY --from=builder /app/frontend/pnpm-workspace.yaml ./pnpm-workspace.yaml
                            COPY --from=builder /app/frontend/package.json ./package.json
                            COPY --from=builder /app/packages/config ../packages/config
                            RUN if [ -f /app/frontend/pnpm-lock.yaml ]; then cp /app/frontend/pnpm-lock.yaml /app/frontend/pnpm-lock.yaml; fi

                            # Log copied files
                            RUN echo "runner: Copied pnpm-workspace.yaml exists: $(test -f /app/frontend/pnpm-workspace.yaml && echo yes || echo no)" && \
                                echo "runner: Copied frontend/package.json exists: $(test -f /app/frontend/package.json && echo yes || echo no)" && \
                                    echo "runner: Copied config package.json exists: $(test -f /app/packages/config/package.json && echo yes || echo no)" && \
                                        echo "runner: Copied pnpm-lock.yaml exists: $(test -f /app/frontend/pnpm-lock.yaml && echo yes || echo no)"

                                        # Install only production dependencies
                                        RUN pnpm install --prod

                                        # Copy built artifacts from builder
                                        COPY --from=builder /app/frontend/.next ./.next
                                        COPY --from=builder /app/frontend/public ./public
                                        COPY --from=builder /app/frontend/next.config.mjs ./next.config.mjs

                                        # Copy the node_modules to preserve dependencies
                                        COPY --from=builder /app/frontend/node_modules ./node_modules
                                        COPY --from=builder /app/packages/config ../packages/config

                                        # Log environment variables before setting in runner
                                        RUN echo "runner: JWT_SECRET before setting=$JWT_SECRET"

                                        # Set runtime environment variables
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
                                        ARG NEXT_PUBLIC_BASEPATH=/tcon360
                                        ENV NEXT_PUBLIC_BASEPATH=${NEXT_PUBLIC_BASEPATH}
                                        ENV FRONTEND_PORT=3000
                                        ENV USE_REVERSE_PROXY=false
                                        ENV PROXY_PATH=/absproxy

                                        # Log JWT_SECRET and its length in runner stage
                                        RUN echo "runner: JWT_SECRET=$JWT_SECRET" && \
                                            echo "runner: JWT_SECRET length=$(expr length "$JWT_SECRET")"

                                            # Expose the port
                                            EXPOSE 3000

                                            # Start the Next.js application
                                            CMD ["pnpm", "start"]
                                            