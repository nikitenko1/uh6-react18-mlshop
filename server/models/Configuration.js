const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const configurationSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    display: {
      type: String,
    },
    resolution: {
      type: String,
    },
    operatingSystem: {
      type: String,
    },
    chipset: {
      type: String,
    },
    ram: {
      type: String,
    },
    mobileNetwork: {
      type: String,
    },
    pin: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Configuration = mongoose.model("Configuration", configurationSchema);

module.exports = Configuration;
