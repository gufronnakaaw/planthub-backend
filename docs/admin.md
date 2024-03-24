# Admin API Spec

## Login API Spec

Endpoint : /admin/login
<br />
Method : POST
<br />

Request Body :

```json
{
  "email": "testing@mail.com",
  "password": "testingpassword"
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

Endpoint : /admin/register
<br />
Method : POST
<br />
Headers :

- Authorization : Bearer (token)
  <br />

Request Body :

```json
{
  "name": "Testing Admin",
  "email": "testing@mail.com",
  "password": "testingpassword"
}
```

Response Body Success:
<br />
Status Code : 201

```json
{
  "success": true,
  "status_code": 201,
  "message": "Register admin successfully"
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
