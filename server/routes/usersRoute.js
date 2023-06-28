const express = require("express");
const { getUserInfo, loginUsers, registerUsers, editUser } = require("../controllers/usersCtrl");
const checkLogin = require("../middlewares/checkLogin");

const route = express.Router();

// GET
// /api/auth
route.get("/", checkLogin, getUserInfo);

// POST
// /api/auth/login
route.post("/login", loginUsers);

// POST
// /api/auth/register
route.post("/register", registerUsers);

// POST
// /api/auth
route.put("/", editUser);

module.exports = route;
