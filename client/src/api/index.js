import axios from "axios";

const url = "http://localhost:8080/posts";

export const fetchPosts = async () => {
  const data = await axios.get(url);
};

export const createPost = (newPost) =>  axios.post(url, newPost);
