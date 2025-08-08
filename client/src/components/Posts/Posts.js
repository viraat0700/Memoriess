import React from "react";
import Post from "./Post/Post.js";
import useStyles from "./styles.js";
import { useSelector } from "react-redux";
const Posts = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  console.log("SRC -> Components -> Posts -> Posts.js: POST(DATA) : ", posts);
  return (
    <>
      <div>POSTS</div>
      <Post />
    </>
  );
};

export default Posts;
