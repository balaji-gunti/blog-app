const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  createBlog,
  updateBlog,
  deleteBlogById,
} = require("../../controllers/blog.controller");

const router = express.Router();

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.post("/create", createBlog);

router.put("/update/:id", updateBlog);

router.delete("/delete/:id", deleteBlogById);

router.get("/user/:id", getUserBlogs);

module.exports = router;
