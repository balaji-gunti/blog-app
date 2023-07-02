const express = require("express");
const userRoute = require("./user.route");
const blogRouter = require("./blog.route");

const router = express.Router();

router.use("/user", userRoute);
router.use("/blogs", blogRouter);

module.exports = router;
