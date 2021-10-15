docker pull roribio16/alpine-sqs
docker pull mysql:latest

docker run -p 13306:3306 --name mysql-docker-local -e MYSQL_ROOT_PASSWORD=Password -d mysql:latest

mysql --host=127.0.0.1 --port=13306 -u root -p

docker run --name alpine-sqs -p 9324:9324 -p 9325:9325 -d roribio16/alpine-sqs:latest

EC2 setup: run using npm and docker, need SES connection
EC2 image for quick restart

Documentation

