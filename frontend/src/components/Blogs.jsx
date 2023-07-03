import React, { useState, useEffect } from "react";
import axios from "axios";
import { config } from "../App";
import BlogCard from "../components/BlogCard";
const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  //get blogs
  const isUser = localStorage.getItem("userId");
  console.log(isUser);
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${config.endpoint}/v1/blogs/`);
      console.log(data.blogs);
      setBlogs(data?.blogs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog, idx) => (
          <BlogCard
            id={blog?._id}
            isUser={localStorage.getItem("userId") === blog.user?._id}
            title={blog?.title}
            description={blog?.description}
            image={blog?.image}
            username={blog?.user?.username}
            time={blog.createdAt}
          />
        ))}
    </div>
  );
};

export default Blogs;
