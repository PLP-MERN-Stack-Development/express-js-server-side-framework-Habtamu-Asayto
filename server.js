// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const logger = require("./logger");
const validateProduct = require("./middleware/validateProduct");
// Initialize Express app
const app = express();

const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());

// Sample in-memory products database
let products = [
  {
    id: "1",
    name: "Laptop",
    description: "High-performance laptop with 16GB RAM",
    price: 1200,
    category: "electronics",
    inStock: true,
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model with 128GB storage",
    price: 800,
    category: "electronics",
    inStock: true,
  },
  {
    id: "3",
    name: "Coffee Maker",
    description: "Programmable coffee maker with timer",
    price: 50,
    category: "kitchen",
    inStock: false,
  },
];

// Root route
app.get("/", (req, res) => {
  res.send(
    "Welcome to the Product API! Go to /api/products to see all products."
  );
});

// TODO: Implement the following routes:
// GET /api/products - Get all products
// GET /api/products/:id - Get a specific product
// POST /api/products - Create a new product
// PUT /api/products/:id - Update a product
// DELETE /api/products/:id - Delete a product

// Example route implementation for GET /api/products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// GET /api/products/:id: Get a specific product by ID
app.get("/api/products/:id", (req, res) => {
  const id = 2;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// POST /api/products - Create a new product
app.post("/api/products", (req, res) => {
  const { name, description, price, category, inStock } = req.body;

  // Validate required fields
  if (!name || !description || !price || !category || inStock === undefined) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const newP = {
    id: "4",
    name: "New Product",
    description: "Product Description",
    price: 21,
    category: "Product Category",
    inStock: true,
  };
  products.push(newP);
  res.status(201).json(newP);
});
// PUT /api/products/:id - Update a product
app.put("/api/products/:id", (req, res) => {
  const id = 1;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Merge updates
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

//DELETE /api/products/:id — Delete a product
app.delete("/api/products/:id", (req, res) => {
  const id = 1;
  const index = products.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  const deletedProduct = products.splice(index, 1);
  res.json(deletedProduct[0]);
});

// DELETE /api/products/:id - Delete a product

// TODO: Implement custom middleware for:
// - Request logging
app.use(logger);
app.use(express.json());
// - Authentication
// Middleware to check API key
const authenticateApiKey = (req, res, next) => {
  // Get the API key from request headers
  const apiKey = req.headers["x-api-key"]; // common header name

  // Check if the API key is correct
  const validApiKey = "key@123"; // replace with your real key

  if (!apiKey || apiKey !== validApiKey) {
    return res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }

  // If valid, proceed to the next middleware or route
  next();
};
// Check it
app.get("/api/productswithapi", authenticateApiKey, (req, res) => {
  res.json(products);
});
// Check it
//  Authentication middleware
app.put("/api/products/:id", validateProduct, (req, res) => {
  const id = parseInt(req.params.id);
  const index = products.findIndex((p) => p.id === id);

  if (index === -1)
    return res.status(404).json({ message: "Product not found" });

  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});
 
const errorHandler = require("./middleware/errorHandler");
const { NotFoundError, ValidationError } = require("./middleware/customErrors");
const asyncHandler = require("./middleware/asyncHandler");
// -Task 4: Error Handling
// Implement global error handling middleware
// Create custom error classes for different types of errors (e.g., NotFoundError, ValidationError)
// Add proper error responses with appropriate HTTP status codes
// Handle asynchronous errors using try/catch blocks or a wrapper function
app.get(
  "/api/asyproducts/:id",
  asyncHandler(async (req, res, next) => {
    const id = 211;

    // Simulate DB lookup
    const product = null;
    if (!product) throw new NotFoundError(`Product with id ${id} not found`);

    res.json(products);
  })
);

// Catch all
app.use((req, res, next) => {
  next(new NotFoundError(`Route ${req.originalUrl} not found`));
});
// Global error handler (MUST come last)
app.use(errorHandler);



// Task 5: Advanced Features
// Implement query parameters for filtering products by category
// Add pagination support for the product listing endpoint
// Create a search endpoint that allows searching products by name
// Implement route for getting product statistics (e.g., count by category)
const router = express.Router();
// GET /api/products - filtering, pagination, and search
router.get(
  "/checkhandler",
  asyncHandler(async (req, res) => {
    let { category, search, page = 1, limit = 2 } = req.query;

    page = parseInt(page);
    limit = parseInt(limit);

    let filtered = [...products];

    // Filter by category
    if (category) {
      filtered = filtered.filter(
        (products) => products.category.toLowerCase() === category.toLowerCase()
      );
    }

    // Search by name (case-insensitive)
    if (search) {
      filtered = filtered.filter((products) =>
        products.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Pagination logic
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    res.json({
      page,
      limit,
      totalProducts: filtered.length,
      totalPages: Math.ceil(filtered.length / limit),
      products: paginated,
    });
  })
)


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;
