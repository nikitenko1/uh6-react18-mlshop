const express = require("express");
const route = express.Router();
const checkAdmin = require("../middlewares/checkAdmin");
const checkLogin = require("../middlewares/checkLogin");
const {
  getAllOrder,
  createOrder,
  getMyOrder,
  deleteOrder,
  getOrderbyId,
  editOderbyId,
} = require("../controllers/orderCtrl");

// GET
// /api/order
// My order
// Private token user
route.get("/my-order", checkLogin, getMyOrder);

// GET
// /api/order
// Get the entire order
// Private Admin Role
route.get("/", checkAdmin, getAllOrder);

// POST
// /api/order
// Create a new order
// Private token user
route.post("/", checkLogin, createOrder);

// DELETE
// /api/order/:id
// Delete order
// Private Admin Role
route.delete("/:id", checkAdmin, deleteOrder);

// GET
// api/order/:id
// Get order details
// Private token user
route.get("/:id", checkLogin, getOrderbyId);

// GET
// api/order
// Edit order details
// Private Admin Role
route.put("/", checkAdmin, editOderbyId);

module.exports = route;
