### Description

This is a **monorepo** with solution to build an email service which abstracts away two different email service providers. 
* Sendgrid
* ElasticEmail

It utilizes advanced NodeJS concepts like `EventEmitter` and `async/await`, and is a distributed system based on Microservices and Event driven architecture.
  
## Architecture Overview
[Architecture Overview](ARCHITECTURE.md)

### REST API USAGE
[REST API](RESTAPI.md)

## Getting Started

### Dependencies
The solution uses these frameworks and platforms.

* Typescript, nodejs and yarn
* Express
* docker and docker-compose
* AWS Cloud
### Running the solution
```sh
docker-compose build
docker-compose up
```

The REST api's would be available at http://localhost:3000/api

### Deployemnt

* The solution REST endpoints are available at:

   http://ec2-3-25-137-103.ap-southeast-2.compute.amazonaws.com:3000/api/health

* There are two microservices `email-gateway` and `email-processor`
* It uses AWS RDS as data base.
* It uses AWS SQS for messaging and events.
* The *email-gateway* and *email-processor* microservices containers are deployed on EC2.

### Running Tests

```
yarn install
yarn test
```
### TODO

The solution can be further improved with below:

* Move api keys, RDS url, Queue url etc to a secure config store. 
* Setup HTTPS.  
* Add SWAGGER docs for REST endpoints
* Implement a caching layer using AWS elastic cache
* Look to add database transactions where needed. 
* Improve Test coverage. 
* Other aspects outlined in Architecture Overview doc.
  




  
