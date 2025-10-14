
#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi

# Set default values if not provided in .env
JWT_SECRET=${JWT_SECRET:-aBcDeFgHiJkLmNoPqRsTuVwXyZ0123456789}
DATABASE_URL=${DATABASE_URL:-file:./TCon360.db}
BACKEND_PORT=${BACKEND_PORT:-3800}
TOKEN_MAX_AGE=${TOKEN_MAX_AGE:-113000}
NODE_ENV=${NODE_ENV:-production}
NEXT_PUBLIC_BASEPATH=${NEXT_PUBLIC_BASEPATH:-/tcon360}

# Log JWT_SECRET and file presence
echo "dockerbldfrontend.sh: JWT_SECRET=$JWT_SECRET"
echo "dockerbldfrontend.sh: JWT_SECRET length=${#JWT_SECRET}"
echo "dockerbldfrontend.sh: Frontend package.json exists: $(test -f frontend/package.json && echo yes || echo no)"
echo "dockerbldfrontend.sh: Config package.json exists: $(test -f packages/config/package.json && echo yes || echo no)"
echo "dockerbldfrontend.sh: Frontend pnpm-workspace.yaml exists: $(test -f frontend/pnpm-workspace.yaml && echo yes || echo no)"
echo "dockerbldfrontend.sh: Frontend pnpm-lock.yaml exists: $(test -f frontend/pnpm-lock.yaml && echo yes || echo no)"

# Build the frontend image with aligned environment variables
sudo docker build -f frontend/Dockerfile \
  -t tcon360_frontend \
  --build-arg NODE_ENV=${NODE_ENV} \
  --build-arg JWT_SECRET=${JWT_SECRET} \
  --build-arg DATABASE_URL=${DATABASE_URL} \
  --build-arg BACKEND_PORT=${BACKEND_PORT} \
  --build-arg TOKEN_MAX_AGE=${TOKEN_MAX_AGE} \
  --build-arg NEXT_PUBLIC_BASEPATH=${NEXT_PUBLIC_BASEPATH} \
  .

# Check if the build was successful
if [ $? -eq 0 ]; then
  echo "Frontend Docker image built successfully."
else
  echo "Frontend Docker build failed."
  exit 1
fi
