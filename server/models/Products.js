const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },
    oldPrice: {
      type: Number,
    },
    image: {
      type: Array,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
    memories: {
      type: Array,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    vat: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.index({ name: "text" });
const Product = mongoose.model("Product", productSchema);
Product.createIndexes({ title: "text" });

module.exports = Product;
