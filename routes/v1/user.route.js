const express = require("express");
const {
  getUsers,
  registerUser,
  loginUser,
} = require("../../controllers/user.controller");

const router = express.Router();

router.get("/users", getUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);
module.exports = router;
