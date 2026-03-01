import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { makeStyles } from "@mui/styles";
import config from "../config";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "20px auto",
    width: "80%",
  },
}));

const UserBlogs = () => {
  const classes = useStyles();
  const [user, setUser] = useState();
  const id = localStorage.getItem("userId");

  const sendRequest = async () => {
    try {
      const res = await axios.get(`${config.BASE_URL}/api/blogs/user/${id}`);
      return res.data.data;
    } catch (err) {
      console.log("Error in sendRequest (UserBlogs):", err);
      throw err;
    }
  };

  const handleRefresh = () => {
    sendRequest().then((data) => setUser(data.user));
  };

  useEffect(() => {
    handleRefresh();
  }, []);

  return (
    <div className={classes.container}>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={user.name}
            onDelete={handleRefresh}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
