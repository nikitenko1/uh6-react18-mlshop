const express = require("express");
const route = express.Router();
const { getAllUsers, deleteUsers, updateUsers, getUser } = require("../controllers/adminCtrl");
const checkAdmin = require("../middlewares/checkAdmin");

// GET
// /api/admin/user
// Get users info
// Private
route.get("/user/:id", getUser);

// GET
// /api/admin/users
// Get all users
// Private
route.get("/users", checkAdmin, getAllUsers);

// DELETE
// /api/admin/users
// Delete users
// Private
route.delete("/users", checkAdmin, deleteUsers);

// PUT
// /api/admin/users
// Edit users information
// Private
route.put("/users", checkAdmin, updateUsers);

module.exports = route;
