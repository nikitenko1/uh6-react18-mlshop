const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    note: {
      type: String,
    },
    totalOrder: {
      type: Number,
      required: true,
    },
    statusOrder: {
      type: String,
      enum: ["Confirming", "Confirmed", "Delivery in progress", "Delivered"],
      required: true,
    },
    payments: {
      type: String,
      // cash on delivery (COD)
      emum: ["Ship COD", "Bank card"],
      required: true,
    },
    isPaid: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
