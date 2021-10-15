### Description

This is a **monorepo** with solution to build an email service which abstracts away two different email service providers. 
* Sendgrid
* ElasticEmail
  
## Architecture Overview
[Architecture Overview](ARCHITECTURE.md)
  
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

* There are two microservices `email-gateway` and `email-processor`
* It uses AWS RDS as data base.
* It uses AWS SQS for messaging and events.
* The *email-gateway* and *email-processor* microservices containers are deployed on EC2.

### REST API

The REST API usage is described below.

### Health Check

`GET /health`

Responds with OK and status code 200 when healthy.

## Submit an email

`POST /submitEmail`

### Request

Suppports only semicolon seperated emails

#### Validations
* `from` is mandatory. 
* `to` is mandatory.  
* `to`, `cc` and `bcc` inputs should not have any white spaces.  
* `body` is mandatory.

```
{
    "to": <MULTIPLE_EMAILS_SEMICOLON_SEPERATED>,
    "cc": <MULTIPLE_EMAILS_SEMICOLON_SEPERATED>,
    "bcc": <MULTIPLE_EMAILS_SEMICOLON_SEPERATED>,
    "from": <SINGLE_EMAIL>,
    "body": <BODY_TEXT>,
    "subject": <SUBJECT_TEXT>
}

{
    "to": "smtest00@yahoo.com;smtest22@yahoo.com",
    "from": "puneet11.dce@gmail.com",
    "body": "RANGELA16",
    "subject": "RANGELA16"
}
```

### Response

For invalid input reponds with aggregated errors and status code 422.

```
{
  id: <EMAIL_ID>
}
```

## GET email

`GET /email/:id`

Responds with 404 for invalid id

### Response

```
{
  id: <EMAIL_ID>
}
```

## GET email hisotry

`GET /email/:id/hisotry`

Responds with 404 for invalid id

### Response

```
{
  id: <EMAIL_ID>
}
```

### TODO

The solution can be further improved with below:

* Add SWAGGER docs for REST endpoints
* Implement a caching layer using AWS elastic cache
* Look to add database transactions where needed. 
  




  
