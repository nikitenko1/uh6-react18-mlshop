const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Schema;

const { generateRandomImage } = require("../utils/generateImage");

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max).toString();
};

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    roleId: {
      type: String,
      default: "User",
    },
    image: {
      type: String,
      default: generateRandomImage({ str: getRandomInt(10) }),
    },
    status: {
      type: String,
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;
