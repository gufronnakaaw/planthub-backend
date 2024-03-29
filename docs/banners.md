# Banners API Spec

## Get Banners API

Endpoint : /banners
<br />
Method : GET
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
      "url": "testing url",
      "alt": "testing alt",
      "created_at": "testing created_at"
    },
    {
      "id": "testing id",
      "url": "testing url",
      "alt": "testing alt",
      "created_at": "testing created_at"
    }
  ]
}
```

## Create Banners API

Endpoint : /banners
<br />
Method : POST
<br />
Headers :

- Authorization : Bearer (token)
  <br />

Request Body :

```json
{
  "alt": "testing alt",
  "image": <image>,
}
```

Response Body Success :
<br />
Status Code : 201

```json
{
  "success": true,
  "status_code": 201,
  "data": {
    "id": "testing id",
    "url": "testing url",
    "alt": "testing alt"
  }
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
    "message": "invalid file extension",
    "errors": null
  }
}
```

## Delete Banners API

Endpoint : /banners/:image_id
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
  "message": "delete banner successfully"
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
    "message": "image not found",
    "errors": null
  }
}
```
