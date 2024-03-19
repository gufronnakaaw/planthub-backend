# Auth API Spec

## Login API Spec

Endpoint : /auth/login
<br />
Method : POST
<br />

Request Body :

```json
{
  "email": "testing@mail.com",
  "password": "testingpassword",
  "provider": "credential"
}
```

Response Body Success:
<br />
Status Code : 200

```json
{
  "success": true,
  "status_code": 200,
  "data": {
    "name": "Testing Name",
    "picture": "picture url",
    "access_token": "jwttoken"
  }
}
```

Response Body Error:
<br />
Status Code : 400 (example client error)

```json
{
  "success": true,
  "status_code": 400,
  "error": {
    "name": "BadRequestExeption",
    "message": "Validation failed",
    "errors": [
      {
        "field": ["email"],
        "message": "required"
      }
    ]
  }
}
```

## Register API Spec

Endpoint : /auth/register
<br />
Method : POST
<br />

Request Body :

```json
{
  "fullname": "Testing User",
  "email": "testing@mail.com",
  "password": "testingpassword",
  "provider": "credential"
}
```

Response Body Success:
<br />
Status Code : 201

```json
{
  "success": true,
  "status_code": 201,
  "message": "Register successfully"
}
```

Response Body Error:
<br />
Status Code : 400 (example client error)

```json
{
  "success": true,
  "status_code": 400,
  "error": {
    "name": "BadRequestException",
    "message": "Validation failed",
    "errors": [
      {
        "field": ["email"],
        "message": "required"
      }
    ]
  }
}
```

## Google API Spec

Endpoint : /auth/google
<br />
Method : POST
<br />

Request Body :

```json
{
  "token": "idtoken google",
  "provider": "google"
}
```

Response Body Success:
<br />
Status Code : 200

```json
{
  "success": true,
  "status_code": 200,
  "data": {
    "name": "Testing Name",
    "picture": "picture url",
    "access_token": "jwttoken"
  }
}
```

Response Body Error:
<br />
Status Code : 400 (example client error)

```json
{
  "success": true,
  "status_code": 400,
  "error": {
    "name": "BadRequestExeption",
    "message": "Validation failed",
    "errors": [
      {
        "field": ["provider"],
        "message": "required"
      }
    ]
  }
}
```
