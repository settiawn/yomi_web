# yomi API Docs

&nbsp;

## Endpoints :

List of available endpoints :

- `POST /register`
- `POST /login`
- `GET /profile/:id`

Routes below need authentication & authorization :

- `PUT /profile/:id`
- `POST /index/:mangaId`
- `PUT /mylist/:listId`
- `DELETE /mylist/:listId`

&nbsp;

## 1. POST /register

Request:

- body:
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email already registered"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_

```json
{
  "access_token": "string"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Please input your email"
}
OR
{
  "message": "Please input your password
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Wrong Email/Password"
}
```

&nbsp;

## 3. GET /profile/:id

Description:
- Fetch a profile from an user

Request:
- none

_Response (200 - OK)_
```json
{
  "id": 3,
  "userId": 12,
  "name": "Taiga",
  "picture": "a.png",
  "bio": "Read Frieren",
  "status": "supporter",
  "createdAt": "2024-02-13T07:57:19.412Z",
  "updatedAt": "2024-02-13T07:59:03.336Z",
  "Lists": [
    {
      "id": 2,
      "profileId": 3,
      "mangaId": "feff4eaf-01df-4a05-83f4-68bb5cdf4fad",
      "coverId": "03c8e249-f446-4f6c-b859-9d60eada9603",
      "comments": "I like the main character!",
      "rating": 9,
      "createdAt": "2024-02-13T07:59:41.478Z",
      "updatedAt": "2024-02-13T07:59:41.478Z"
    },
    {
      "id": 3,
      "profileId": 3,
      "mangaId": "e160a8e3-304f-4dca-838b-ee1821c490d8",
      "coverId": "06e2c424-ad6f-451e-b0ae-b2a8c948a747",
      "comments": "This title is so good!",
      "rating": 8,
      "createdAt": "2024-02-13T08:00:01.958Z",
      "updatedAt": "2024-02-13T08:00:01.958Z"
    },
    ...
  ]
}
```

&nbsp;

## 4. PUT /profile/:id

Description:
- User that has logged in can update their profile

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "id": "integer (required)"
}
```

- body:
```json
{
  "name" : "Mika",
  "picture" : "a.png",
  "bio" : "Trinity is the best!"
}
```

_Response (200 - OK)_
```json
{
  "message": "Profile has been updated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Profile Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 5. POST /index/:mangaId

Description:
- Add entry to your list with MangaDex's manga id

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "mangaId": "integer (required)"
}
```

_Response (201 - Created)_
```json
{
  "message": "Added \"<Added manga title>\" to your manga list"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Title not found in database"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Title already in your list"
}
OR
{
  "message": "You have reached the maximum entry available. Please manage your list."
}
```

_Response (403 - Forbidden)_
```json
{
  "message": "Be a supporter of this project to add more entry to your list"
}
```

&nbsp;

## 4. PUT /mylist/:listId

Description:
- User can update their Manga entry

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- params:

```json
{
  "listId": "integer (required)"
}
```

- body:
```json
{
  "comments" : "Peaked",
  "rating" : 8
}
```

_Response (200 - OK)_
```json
{
  "message": "Entry has been updated"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Entry Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## 7. DELETE /mylist/:listId

Description: 
- Delete user's entry

Request:

- headers: 
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "listId": "integer (required)"
}
```

_Response (200 - OK)_
```json
{
  "message": "Entry has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Entry Not Found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "Forbidden Access"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token, Please log in first"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```