
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