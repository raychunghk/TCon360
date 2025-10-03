#FROM node:18-alpine
#WORKDIR /app
#RUN npm install -g pnpm
#COPY package.json ./
#COPY . .


FROM node:18
WORKDIR /app
#RUN npm install -g pnpm@10.8.0 --force
RUN npm install -g pnpm@10.8.0 --force
COPY frontend/package.json frontend/pnpm-lock.yaml ./
RUN pnpm install && pnpm store prune
COPY baseconfig.js ../
#COPY ./frontend/frontendconfig.js ./frontend/
COPY frontend/frontendconfig.js ../frontend/
COPY frontend/ .
RUN pnpm install
RUN pnpm run build
EXPOSE 3000
CMD ["pnpm", "run", "start"]

#sudo docker build -f frontend/Dockerfile -t tcfrontend .
#sudo docker run -d -p 8255:3000 --name tcfrontend --network bridge tcfrontend