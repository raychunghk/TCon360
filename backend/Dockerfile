#FROM node:18-alpine
FROM node:18
WORKDIR /app
RUN npm install -g pnpm@10.8.0 --force
COPY backend/package.json ./
COPY baseconfig.js ../
COPY frontend/frontendconfig.js ../frontend/
COPY backend/ .
#RUN pnpm install --ignore-scripts
RUN pnpm install  # Remove --ignore-scripts to allow native compilation
RUN pnpm run build
EXPOSE 3800
CMD ["pnpm", "run", "start:prod"]
#docker build -f backend/Dockerfile -t tcon360_backend .


 #sudo docker run -d -p 8255:3800 --name tcbackend --network bridge tcon360_backend
#sudo docker container stop tcbackend
#sudo docker container rm tcbackend