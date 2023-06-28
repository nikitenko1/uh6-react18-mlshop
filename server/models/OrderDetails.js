const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderDetailsSchema = new Schema(
  {
    oderId: { type: Schema.Types.ObjectId, required: true },
    products: { type: Array, required: true },
  },
  {
    timestamps: true,
  }
);

const OrderDetails = mongoose.model("OrderDetails", orderDetailsSchema);

module.exports = OrderDetails;
