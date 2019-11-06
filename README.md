 A simple CRUD RESTful api, adhering to json api guidelines, using Express, Mongo, and Mongoose.


## Quickstart

Ensure you have mongodb installed and running.

Clone the repo
```
git clone https://github.com/alexanderpharwood/express-api.git
```

Start the api

```
npm run api
```

REST endpoints are:
```
GET http://localhost:3000/api/v1/books
POST http://localhost:3000/api/v1/books
GET http://localhost:3000/api/v1/books/{id}
PUT http://localhost:3000/api/v1/books/{id}
DELETE http://localhost:3000/api/v1/books/{id}
```

To create or update a book resource, the posted json object should look like this:

```
{
	"title": "Moby Dick",
	"slug": "moby-dick",
	"author": "Herman Melville"
}
```

You can use the Postman collection to test the endpoints.
