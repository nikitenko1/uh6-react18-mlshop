const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const adminRoute = require("../routes/adminRoute");
const usersRoute = require("../routes/usersRoute");
const uploadRoute = require("../routes/uploadRoute");
const productRoute = require("../routes/productRoute");
const orderRoute = require("../routes/orderRoute");
const reviewRoute = require("../routes/reviewRoute");

const app = express();
app.use(express.static("public"));

const URL = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.x6poucy.mongodb.net/shop?retryWrites=true&w=majority`;
// connectDB
const connectDB = async () => {
  try {
    await mongoose.connect(URL);
    console.log("connect DB `shop` success!");
  } catch (error) {
    console.log(error);
    process.exit(-1);
  }
};

connectDB();

// config body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
// cors
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Hello word");
});
// config route
app.use("/api/admin", adminRoute);
app.use("/api/auth", usersRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/product", productRoute);
app.use("/api/order", orderRoute);
app.use("/api/review", reviewRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}!`);
});
