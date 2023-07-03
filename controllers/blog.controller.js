const mongoose = require("mongoose");
const blogModel = require("../models/blog.model");
const userModel = require("../models/user.model");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate("user");
    if (!blogs) {
      return res.status(200).send({
        message: " No blogs found",
      });
    }

    return res.status(200).send({
      message: "Blogs list",
      BlogCount: blogs.length,
      blogs,
    });
  } catch (err) {
    console.log(error);
    return res.status(500).send({
      message: "Error while getting blogs",
      err,
    });
  }
};

const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id);
    if (!blog) {
      return res.status(404).send({
        message: "Blog not found",
      });
    }
    return res.status(200).send({
      message: "Blog found",
      blog,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      message: "Error while getting the Blog",
    });
  }
};

const getUserBlogs = async (req, res) => {
  try {
    const { id } = req.params;
    const userBlogs = await userModel.findById(id).populate("blogs");
    if (!userBlogs) {
      return res.status(404).send({
        message: "Blogs not found ",
      });
    }
    return res.status(200).send({
      message: "User Blogs",
      userBlogs,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Error while fetching blogs of user",
      err,
    });
  }
};

const createBlog = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;
    if (!title || !description || !image || !user) {
      return res.status(400).send({
        message: "Please provide all fields",
      });
    }
    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        message: "User not found",
      });
    }
    const newBlog = new blogModel({ title, description, image, user });

    await newBlog.save();
    existingUser.blogs.push(newBlog);
    await existingUser.save();

    await newBlog.save();
    return res.status(201).send({
      message: "Blog created",
      newBlog,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Error while creating blog",
      err,
    });
  }
};

const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image, user } = req.body;
    const blog = await blogModel.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    return res.status(200).send({
      message: "Blog updated",
      blog,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Error while updating blog",
      err,
    });
  }
};

const deleteBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findByIdAndDelete(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
    return res.status(200).send({
      message: "Blog deleted",
    });
  } catch (err) {
    console.log(err);
    return res.status(400).send({
      message: "Error while deleting blog",
      err,
    });
  }
};

const changeLikes = async (req, res) => {
  // try {
  // }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getUserBlogs,
  createBlog,
  updateBlog,
  deleteBlogById,
  changeLikes,
};
