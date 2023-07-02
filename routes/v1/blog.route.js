const express = require("express");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlogById,
} = require("../../controllers/blog.controller");

const router = express.Router();

router.get("/", getAllBlogs);

router.get("/:id", getBlogById);

router.post("/create", createBlog);

router.put("/:id", updateBlog);

router.delete("/:id", deleteBlogById);

module.exports = router;
