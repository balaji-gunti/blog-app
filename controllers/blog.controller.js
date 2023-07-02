const blogModel = require("../models/blog.model");

const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find({});
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

const createBlog = async (req, res) => {
  try {
    const { title, description, image } = req.body;
    if (!title || !description || !image) {
      return res.status(400).send({
        message: "Please provide all fields",
      });
    }
    const newBlog = new blogModel({ title, description, image });
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
    const { title, description, image } = req.body;
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
    await blogModel.findOneAndDelete(id);
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

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlogById,
};
