# Categories API Spec

## Get Categories API

Endpoint : /categories
<br />
Method : GET
<br />
Headers :

- Authorization : Bearer (token)
  <br />

Response Body Success:
<br />
Status Code : 200

```json
{
  "success": true,
  "status_code": 200,
  "data": [
    {
      "id": "testing id",
      "name": "testing name",
      "created_at": "testing created_at"
    },
    {
      "id": "testing id",
      "name": "testing name",
      "created_at": "testing created_at"
    }
  ]
}
```

## Create Categories API

Endpoint : /categories
<br />
Method : POST
<br />
Headers :

- Authorization : Bearer (token)
  <br />

Request Body :

```json
{
  "name": "testing name"
}
```

Response Body Success :
<br />
Status Code : 201

```json
{
  "success": true,
  "status_code": 201,
  "message": "Create categories successfully"
}
```

Response Body Error :
<br />
Status Code : 400 (example client error)

```json
{
  "success": false,
  "status_code": 400,
  "error": {
    "name": "BadRequestException",
    "message": "Categories already exists",
    "errors": null
  }
}
```

## Delete Categories API

Endpoint : /categories/:categories_id
<br />
Method : DELETE
<br />
Headers :

- Authorization : Bearer (token)
  <br />

Response Body Success :
<br />
Status Code : 200

```json
{
  "success": true,
  "status_code": 200,
  "message": "Delete categories successfully"
}
```

Response Body Error :
<br />
Status Code : 404 (example client error)

```json
{
  "success": false,
  "status_code": 404,
  "error": {
    "name": "NotFoundException",
    "message": "Categories not found",
    "errors": null
  }
}
```
