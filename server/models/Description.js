const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const descriptionSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "product",
    },
    contentHtml: {
      type: String,
    },
    contentMarkdown: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Description = mongoose.model("Description", descriptionSchema);

module.exports = Description;
