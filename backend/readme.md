##

Run docker
`docker build`
`docker image ls`
`docker image ls`
gives image name
`docker build -t node-cms-image .`

give the container a name
- number we will send traffic on container,we port it from host machine to docker container
`docker run -p 3050:3050 --name backend-cms node-cms-image`


see running containers:
`docker ps`

force kill the container

`docker rm backend-cms -f`

interact with docker container in cli to see file system etc
`docker exec -it backend-cms bash`
`exit` to get out


make a volume bind mount to sync folders from local machine to container
-v pathtofolderonMachine:pathToFolderOnContainer
`docker run -v ./:/app -p 3050:3050 --name backend-cms node-cms-image`

`docker ps -a`


Docker logs
`docker logs <name>`

remove all unnessary volumes
docker volume prune
-fv for volumes
`docker rm backend-cms -fv`

# Docker compose

`docker-compose up`

brings it all down

`docker-compose down -v`

force docker to rebuild image
`docker-compose up -d --build`


## Nuclear option

if struggling to stop contain

`docker kill $(docker ps -q)`
`docker rm $(docker ps -a -q)`