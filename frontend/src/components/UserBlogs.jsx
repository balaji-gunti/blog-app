import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { config } from "../App";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  //get user blogs
  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      console.log(id);
      const { data } = await axios.get(
        `${config.endpoint}/v1/blogs/user/${id}`
      );
      console.log(data);
      const userblogs = data.userBlogs.blogs;
      console.log(userblogs);
      setBlogs(userblogs);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(blogs);

  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog, idx) => (
          <BlogCard
            id={blog._id}
            isUser={true}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user.username}
            time={blog.createdAt}
          />
        ))
      ) : (
        <h1>You Havent Created a blog</h1>
      )}
    </div>
  );
};

export default UserBlogs;
