### Architectiure Overview  

![Architecture Diagram](architecture.jpeg)
### Architectiure Choices


1. **Microservices and Event based architecture**: Have split the solution in to two different services.  
   
   a) **Email Gateway**: This service is responsible to for user facing REST api's related to emails submitted. As soon as the email is submitted via POST an email *id* is sent to user with HTTP status code 202 i.e. email has been accepted for processing.

   This way we avoid req/resp latency issues which a user would have faced. The service exposes additional GET endpoints for user to check for email processing status. 

   b) **Email Processor**: This service listens to email related events on the AWS SQS queue.  
   When it receives the messages it tries to sends the message via a primary mail provider (ElasticEmail), and fallbacks to a secondary email provider (Sendgrid) in case of failures.  

2. **Scalability**: The solution is highly scalable as both the gateway and processor services are stateless, which mean we can horizontally scale both the services independently.    
AWS RDS can be scaled by adding read replicas which will allow us to distribute read queries to multiple database instances.
Adding AWS elastic cache layer further improves the system performance.

1. **Availability/Reliability/Resiliency**: The solution is highly available, both microservice are deployed across multiple data centers/availability zones, and AWS ELB will manage the failover if needed.  
   Every interaction with the external email provider has a timeout of 3 seconds, this is to avoid performance degradation in case of downtime of external email services.

2. **Data loss/Durability**: The system ensures that valid data is persisted. As part of `POST /submitEmail`  the data is validated and then persisted in the database. The processing for sending of email happens after this step, this ensures that any external email services related errors does not cause any data loss.  
A database is setup with replicas to avoid any data loss due to master failure. 

     