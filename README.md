### Product API — Express.js Server (Week 2 Assignment)

This is RESTful Product API built with Express.js.

It demonstrates key concepts including middleware, authentication, error handling, validation, and

advanced features like filtering, pagination, and search.

Getting Started

# 1. Prerequisites

Make sure to install the below:

- Node.js (v16 or higher)

- npm (comes with Node.js)

# 2. Installation required libraris

npm install

# 3. # Run the Server

node server.js
The server will start at: http://localhost:3000

## API Documentation

Base URL

- http://localhost:3000/api/products

Available Endpoints

- GET / (welcome page)

  Example

- GET http://localhost:3000/api/products?category=electronics&search=laptop&page=1&limit=1

- Example of its Response:

{
"page": 1,
"limit": 1,
"totalProducts": 1,
"totalPages": 1,
"products": [

{
"id": "1",
"name": "Laptop",
"description": "High-performance laptop with 16GB RAM",
"price": 1200,
"category": "electronics",
"inStock": true
}
]
}

- # GET /api/products/:id ->Get details of a specific product by its ID.

  Example Request: GET http://localhost:3000/api/products/1

  Response:
  {
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
  }

- # POST /api/products(Create a new product)

  Example Request:

  POST http://localhost:3000/api/products

  Content-Type: application/json

Request Body:

{
"name": "Tablet",
"description": "10-inch screen tablet",
"price": 300,
"category": "electronics",
"inStock": true
}

Response:

{
"id": "4",
"name": "New Product",
"description": "Product Description",
"price": 21,
"category": "Product Category",
"inStock": true
}

- # DELETE /api/products/:id -> Delete a product by its ID.

  Example Request: DELETE http://localhost:3000/api/products/1

  Response:
  {
  "id": "1",
  "name": "Laptop",
  "description": "High-performance laptop with 16GB RAM",
  "price": 1200,
  "category": "electronics",
  "inStock": true
  }

- # GET /api/asyproducts/:id- > asynchronous error handling with custom error classes.

  Example Request: GET http://localhost:3000/api/asyproducts/123

  Response:

  {
  "success": false,
  "error": {
  "name": "NotFoundError",
  "message": "Product with id 211 not found"
  }
  }

- # GET /api/checkhandler -> Advanced endpoint with filtering, search, and pagination combined.

  Example Request: GET http://localhost:3000/api/checkhandler?category=electronics&search=phone&page=1&limit=2

  Response:
  {

  "page": 1,
  "limit": 2,
  "totalProducts": 1,
  "totalPages": 1,
  "products": [
  {
  "id": "2",
  "name": "Smartphone",
  "description": "Latest model with 128GB storage",
  "price": 800,
  "category": "electronics",
  "inStock": true
  }
  ]
  }

- # Error Handling

Global error handler catches all errors and returns structured JSON:

{
"success": false,
"error": {
"name": "ValidationError",
"message": "All fields are required"
}
}

- # Authentication

Some routes require an API key for access.

Header Value Description

x-api-key key@123 Valid API key

If the API key is missing or invalid, the server responds with:

{ "message": "Unauthorized: Invalid API key" }

- Product Statistics (Bonus Feature)

(Can be added as /api/products/stats)

This would return category-wise counts:

{
"totalProducts": 5,
"countByCategory": {
"electronics": 2,
"kitchen": 1
}
}

- # Testing

  Test the API using:

  Postman or other related tools

- # Tech Stack

  Node.js

  Express.js

  body-parser for JSON parsing

  uuid for unique IDs

  Custom middlewares: logger, validateProduct, authentication

  Global error handling (Task 4)

  Advanced features (Task 5)

- # Author

  Habtamu Asayto
  MERN Week 2 Assignment — Express.js Server-Side Framework
