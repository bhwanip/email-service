### Description

This is **monorepo** with solution to build an email service which abstracts away two different email service providers. 
* Sendgrid
* ElasticEmail
  
  
## Getting Started

### Dependencies
The solution uses these frameworks and platforms.

* nodejs and yarn
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

   http://ec2-3-26-54-26.ap-southeast-2.compute.amazonaws.com:3000/api

* It uses AWS RDS as data base.
* It uses AWS SQS for messaging and events.
* The *email-gateway* and *email-processor* microservices containers are deployed on EC2.




  