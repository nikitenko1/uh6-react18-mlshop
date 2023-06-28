const express = require("express");
const route = express.Router();
const { getReviews, postReview } = require("../controllers/reviewCtrl");
const checkLogin = require("../middlewares/checkLogin");

// GET
// /api/review:id
route.get("/:id", getReviews);

// POST
// /api/review
// Private
route.post("/", checkLogin, postReview);

module.exports = route;
