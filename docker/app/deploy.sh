docker rmi -f $(docker images -q)
docker tag bmg_admin:latest bmg_admin:previous
docker-compose up -d --build