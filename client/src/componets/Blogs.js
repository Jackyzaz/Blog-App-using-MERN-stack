import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import config from "../config";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs`);
      return res.data.data;
    } catch (err) {
      console.log("Error in sendRequest (Blogs):", err);
      throw err;
    }
  };
  const handleRefresh = () => {
    sendRequest().then((data) => setBlogs(data.blogs));
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={localStorage.getItem("userId") === (blog.user?._id || blog.user)}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user?.name || "Unknown"}
            onDelete={handleRefresh}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
