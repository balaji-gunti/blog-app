const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).send({
        message: "Please fill all fields",
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(401).send({
        message: "user already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new userModel({ username, email, password: hashedPassword });
    await user.save();
    return res.status(201).send({
      message: "New User Created",
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Error while registering",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send({
        message: "Please provide both email and password",
        sucess: false,
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(200).send({
        message: "email is not registerd",
        sucess: false,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({
        message: "Invalid username or password",
        sucess: false,
      });
    }

    return res.status(200).send({
      message: "Login success",
      user,
      sucess: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "error while logging in",
      sucess: false,
      err,
    });
  }
};

const getUsers = async (req, res) => {
  try {
    console.log("In controller  ");
    const users = await userModel.find({});
    return res.status(200).send({
      message: "All users data",
      users,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Couldn't get users details",
    });
  }
};

module.exports = {
  getUsers,
  registerUser,
  loginUser,
};
