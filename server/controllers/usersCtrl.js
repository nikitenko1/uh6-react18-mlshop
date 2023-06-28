const Users = require("../models/Users");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const loginUsers = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Mising parameters!",
    });
  }

  const existUser = await Users.findOne({ email });
  if (!existUser) {
    return res.status(400).json({
      success: false,
      message: "User not found!",
    });
  }

  const verifyPassword = await argon2.verify(existUser.password, password);
  if (!verifyPassword) {
    return res.status(400).json({
      success: false,
      message: "Password was wrong!",
    });
  }

  const token = jwt.sign(
    {
      userId: existUser._id,
      roleId: existUser.roleId,
    },
    process.env.JWT_SECRET
  );

  return res.status(200).json({
    success: true,
    message: "Login success!",
    token,
  });
};

const registerUsers = async (req, res) => {
  const { name, password, email } = req.body;

  if (!email || !name || !password) {
    return res.status(400).json({
      success: false,
      message: "Mising parameters!",
    });
  }

  try {
    const hashPassword = await argon2.hash(password);

    const newUser = new Users({
      email,
      name,
      roleId: "user",
      password: hashPassword,
    });

    await newUser.save();

    const token = jwt.sign(
      {
        userId: newUser._id,
        roleId: newUser.roleId,
      },
      process.env.JWT_SECRET
    );

    return res.status(203).json({
      success: true,
      message: "Register success!",
      token,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "You are not allowing duplicate email addresses!",
    });
  }
};

const getUserInfo = async (req, res) => {
  const userId = req.userId;
  try {
    const userInfo = await Users.findOne({ _id: userId }).select("-password");
    if (!userInfo)
      return res.send(400).json({
        success: false,
        message: "User not found!",
      });
    return res.status(200).json({
      success: true,
      user: userInfo,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const editUser = async (req, res) => {
  const userId = req.userId;
  const idEdit = req.body._id;
  console.log(`userId: ${userId}`);
  console.log(`idEdit: ${idEdit}`);
  if (userId !== idEdit) {
    return res.status(400).json({
      success: false,
      message: "You can only edit your information!",
    });
  }
  try {
    const userInfo = await Users.findOne({ _id: idEdit });
    if (req.body.passwordOld && req.body.password) {
      const verifyPassword = await argon2.verify(userInfo.password, req.body.passwordOld);

      if (!verifyPassword) {
        return res.status(404).json({
          success: false,
          message: "Old password is wrong, please check again!",
        });
      }

      const hashPassword = await argon2.hash(req.body.password);
      await Users.findByIdAndUpdate(idEdit, {
        ...req.body,
        password: hashPassword,
      });
    } else {
      await Users.findByIdAndUpdate(idEdit, {
        name: req.body.name,
        email: req.body.email,
      });
    }

    return res.json({
      success: true,
      message: "Update successful!",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  loginUsers,
  registerUsers,
  getUserInfo,
  editUser,
};
