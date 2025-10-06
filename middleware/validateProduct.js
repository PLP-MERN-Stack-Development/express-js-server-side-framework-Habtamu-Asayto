// Validate required fields for product creation and update
const validateProduct = (req, res, next) => {
  const { name, description, price, category, inStock } = req.body;

  // For creation: require name, price, category
  if (req.method === "POST") {
    if (!name || price === undefined || !category) {
      return res.status(400).json({
        message:
          "Missing required fields: name, price, and category are required",
      });
    }
  }

  // For update: at least one field must be provided
  if (req.method === "PUT") {
    if (
      name === undefined &&
      description === undefined &&
      price === undefined &&
      category === undefined &&
      inStock === undefined
    ) {
      return res.status(400).json({
        message:
          "At least one field (name, description, price, category, inStock) must be provided for update",
      });
    }
  }

  // Additional checks (optional)
  if (price !== undefined && typeof price !== "number") {
    return res.status(400).json({ message: "Price must be a number" });
  }

  if (inStock !== undefined && typeof inStock !== "boolean") {
    return res.status(400).json({ message: "inStock must be a boolean" });
  }

  next();
};

module.exports = validateProduct;
