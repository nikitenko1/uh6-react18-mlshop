const express = require("express");
const route = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");
const {
  addProduct,
  getProducts,
  getProduct,
  deleteProducts,
  updateProduct,
  getConfiguration,
  getDescription,
  searchProduct,
} = require("../controllers/productCtrl");

// POST
// /api/product
// Description: more products
// Private
route.post("/", checkAdmin, addProduct);

// GET
// /api/product
// Description: Get all products
// Public
route.get("/", getProducts);

// GET
// /api/product
// Description: Get products by id
// Public
route.get("/:id", getProduct);

// DELETE
// /api/product/:id
// Description: Delete product
// Private
route.delete("/:id", checkAdmin, deleteProducts);

// PUT
// /api/product/:id
// Description: Editing products
// Private
route.put("/:id", checkAdmin, updateProduct);

// GET
// /api/product/configuration/:productId
// Description: Get the products configuration
route.get("/configuration/:productId", getConfiguration);

// GET
// /api/product/description/:productId
route.get("/description/:productId", getDescription);

// GET
// /api/product/search/find
route.get("/search/find", searchProduct);

module.exports = route;
