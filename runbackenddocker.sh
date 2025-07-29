sudo docker container stop tcbackend || true
sudo docker container rm tcbackend || true
sudo docker run -d -p 8255:3800 --name tcbackend --network bridge -v $(pwd)/packages/config/dist:/config/workspace/vm/js/TCon360/packages/config/dist tcon360_backend
sudo docker ps -a