### Architectiure Overview  

![Architecture Diagram](architecture.jpeg)
### Architectiure Choices


1. **Microservices and Event based architecture**: Have split the solution in to two different services, keeping in mind the single responsibility principle. 
   
   a) **Email Gateway**: This service is responsible for user facing REST api's related to emails submitted. As soon as the email is submitted via POST an email *id* is sent to user with HTTP status code 202 i.e. email has been accepted for processing.

   This way we avoid req/resp latency and timout issues which a user would have faced. The service exposes additional GET endpoints for user to check for email processing status.  
   The processing is delegated via AWS SQS events to email processor microservice.  

   b) **Email Processor**: This service listens to email related events on the AWS SQS queue.  
   When it receives the messages it tries to sends the message via a primary mail provider (ElasticEmail), and fallbacks to a secondary email provider (Sendgrid) in case of failures.  

2. **Scalability**: The solution is highly scalable as both the gateway and processor services are stateless, which mean we can horizontally scale both the services independently.    
AWS RDS can be scaled by adding read replicas which will allow us to distribute read queries to multiple database instances.  
AWS SQS is a distributed scalable messaging queue.  
Adding AWS elastic cache layer further improves the system performance.

1. **Availability/Reliability**: The solution is highly available, both microservice are deployed across multiple data centers/availability zones, and AWS ELB will manage the failover if needed.  
AWS RDS promotes a replica as master in event of a failure.  
AWS SQS is highly scalable messaging platform.  
   

2. **Data loss/Durability**: The system ensures that valid data is persisted. As part of `POST /submitEmail`  the data is validated and then persisted in the database. The processing for sending of email happens after this step, this ensures that any email processing related errors does not cause any data loss.  The database is setup with replicas to avoid any data loss due to master failure.   
To further prevent any data corruption issues transactions can be used where necessary.  
AWS SQS ensure at least once delivery so data loss is not there at the message broker level. 
For emails which goes to FAILED status a periodic job can be scheduled to trigger there processing.  
To clean up old records from the database a Lambda may be scheduled say to remove 6 months old records.  
A back up of these deleted records can be maintained on S3 if needed for compliance purposes.  

3. **Resiliency**: The solution is resilient as every interaction with the external email provider has a timeout of 3 seconds, this is to avoid performance degradation in case of downtime of external email services.  
Each of the microservice should be able to scale horizontaly as the traffic increases.

1. **Maintainability**: Both the services *email-gateway* and *email-processor* can be deployed and scaled independently.   
   The code internally uses an interface `IEmailService` so that email providers can be replaced easily without much effort as it would only need implementation of this interface.  
   The monorepo has a `commons` package for resuable databes related code to avoid code duplication.  
   The microservices are containerized using docker which makes it easy to run them locally and in multiple cloud providers

2. **Auditing**: A complete audit trail of each email processing is being maintained in the ``EmailHistores`` table.   
   This is an append only table which means for any change in the processing status of the email a new record for that emailId is added to this table with status as PROCESSING/SENT/FAILED.  
   Along with the status this table also keep tracks of the email provider (Sendgrid/ElasticEmail) responsible for that status.  
   As part of `POST \submitEmail` the request JSON payload is also stored in the database for auditing and support purposes to see the original request which was sent by the user.  
   The success/error resposes from external email service providers is also stored in database for auditing purposes.  

6. **Error Handling**: For bad POST input request an aggregated response with all the errors is sent back to the user, this leads to better user experience, as user get to know all the errors.    
   Appropriate error codes like 404: Not Found for invalid email id when doing GET are used in error responses.  
   The microservices can be integrated with error tracking tools like Sentry to report errors.  
   The processing errors of emails is also tracked in database.  

7. **Monitoring**: The logs can be sent to a log indexing solution like Datadog for monitoring and quick discovery.  
   A correlation id can be associated with each request and sent across to every service to monitor the request flow in the system, also an open tracing solution like Jaeger can be used, to trace the flow of HTTP request through the microservices.  

8. **Constraints/Tradeoffs**:  
   a) Both the services share a common database schema which leads to some level of coupling between the two. In case of two isolated teams managing the services, there are chances of a breaking change being made to the DB. But if we have a single team working on the project a single db schema can lead to simplicity and ease of development.    
   b) In case of failures from both email service providers there can be high delay in delivery of emails. For emails which goes to FAILED status a periodic job can be scheduled to trigger there processing.  
   c)AWS SQS can send duplicated messages to prevent sending duplicate email we need to ensure that messaging processing logic is idempotent.  
   d) The REST api's are not secured. We can look to add JWT based security.  
   e) For multiple emails like in cc list, the system currently only supports semicolon seperated emails, this is to ensure that system has a stable and consitent behaviour, more seperators like comma can be added when needed.  




     
