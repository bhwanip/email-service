
### REST API

The REST API usage is described below.

### Health Check

`GET /api/health`

Responds with OK and status code 200 when healthy.

## Submit an email

`POST /api/submitEmail`

### Request

For multiple emails, Supports only semicolon separated emails

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
    "body": "Test Body",
    "subject": "Test Subject"
}
```

### Response

For invalid input responds with aggregated errors and status code 422.

```
{
    "errors": [
        {
            "msg": "From email is required.",
            "param": "from",
            "location": "body"
        },
        {
            "value": "smtest00yahoo.com",
            "msg": "Invalid emails in the list: 'smtest00yahoo.com'.",
            "param": "to",
            "location": "body"
        },
        {
            "value": "smtest22yahoo.com",
            "msg": "Invalid emails in the list: 'smtest22yahoo.com'.",
            "param": "cc",
            "location": "body"
        },
        {
            "msg": "Email body is required.",
            "param": "body",
            "location": "body"
        }
    ]
}
```

Success Response

```
{
    "id": "dd7e7b6d-4f23-46d1-8d69-47b88afc6c9a"
}
```

## GET email

`GET /api/email/:id`

Responds with 404 for invalid id

### Success Response

```
{
    "id": "cd2c923b-4344-44b7-ae50-8f6d4fb32b45",
    "from": "puneet11.dce@gmail.com",
    "to": "smtest00@yahoo.com",
    "bcc": null,
    "cc": "smtest22@yahoo.com",
    "subject": "Test Subject",
    "body": "Test Body",
    "status": "SENT",
    "payload": "{\"to\":\"smtest00@yahoo.com\",\"cc\":\"smtest22@yahoo.com\",\"from\":\"puneet11.dce@gmail.com\",\"body\":\"Test Body\",\"subject\":\"Test Subject\"}",
    "createdAt": "2021-10-16T02:46:08.000Z",
    "updatedAt": "2021-10-16T02:46:16.000Z"
}
```

## GET email hisotry

`GET /api/email/:id/hisotry`

Responds with 404 for invalid id

### Success Response

```
[
    {
        "id": "3685ba52-4673-4123-885f-7a5ed31a194a",
        "emailId": "cd2c923b-4344-44b7-ae50-8f6d4fb32b45",
        "provider": "ELASTIC_EMAIL",
        "status": "SUCCESS",
        "response": "\"1c14117c-499c-013b-e07c-ad6d73dcf194\"",
        "createdAt": "2021-10-16T02:46:16.000Z",
        "updatedAt": "2021-10-16T02:46:16.000Z"
    },
    {
        "id": "b1f3d027-9c86-407b-9c33-eb8e9e763ccf",
        "emailId": "cd2c923b-4344-44b7-ae50-8f6d4fb32b45",
        "provider": null,
        "status": "PROCESSING",
        "response": null,
        "createdAt": "2021-10-16T02:46:14.000Z",
        "updatedAt": "2021-10-16T02:46:14.000Z"
    }
]
```
