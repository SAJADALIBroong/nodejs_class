const hashPassword = require("../helpers/hashPassword");
const JWT_SECRET = require("../helpers/secret");
const userModel = require("./../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isUser = await userModel.findOne({ email });

  if (isUser) {
    return res.status(400).send({
      message: "user already exists",
    });
  }

  const user = new userModel({
    name: name,
    email: email,
    password: hashPassword(password),
  });

  await user.save();

  const payload = {
    id: user.id
  }

  const token = jwt.sign(payload,JWT_SECRET)


  res.send({
    message: "user registered successfully",
    result: user,
    token: token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const isUser = await userModel.findOne({ email });

  if (!isUser) {
    return res.status(400).send({
      message: "user not found",
    });
  }

  const isMatch = bcrypt.compareSync(password, isUser.password);
  if (!isMatch) {
    return res.status(400).send({
      message: "password is incorrect",
    });
  }
  const payload = {
    id: isUser.id
  }

  const token = jwt.sign(payload,JWT_SECRET)

  res.send({
    message: "user login successfull",
    isUser,
    token: token,
  });
};

module.exports = {
  register,
  login,
};
