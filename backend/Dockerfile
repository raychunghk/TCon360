FROM node:18
WORKDIR /config/workspace/vm/js/TCon360/backend
RUN npm install -g pnpm@10.12.1 --force
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml /config/workspace/vm/js/TCon360/
COPY backend/package.json backend/pnpm-lock.yaml /config/workspace/vm/js/TCon360/backend/
COPY backend/prisma /config/workspace/vm/js/TCon360/backend/prisma
COPY packages/config /config/workspace/vm/js/TCon360/packages/config
RUN ls -la /config/workspace/vm/js/TCon360 && cat /config/workspace/vm/js/TCon360/package.json
RUN if ! grep -q '"build":' /config/workspace/vm/js/TCon360/backend/package.json; then \
      echo 'Error: "build" script not found in backend/package.json'; \
      exit 1; \
    fi
RUN cd /config/workspace/vm/js/TCon360 && pnpm install --filter backend
RUN npx prisma generate
COPY backend/ /config/workspace/vm/js/TCon360/backend/
RUN pnpm run build
EXPOSE 3800
CMD ["pnpm", "run", "start:prod"]