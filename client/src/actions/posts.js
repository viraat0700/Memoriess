import * as api from "../api/index.js";
import {
  CREATE,
  DELETE,
  FETCH_ALL,
  LIKE,
  UPDATE,
} from "../constants/actionTypes.js";

export const getPosts = () => async (dispatch) => {
  try {
    console.log("getPosts triggered file Path: client/src/actions/posts.js");
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(
      "getPosts giving error file path client/src/actions/posts.js : ",
      error.message
    );
  }
};

export const createPost = (post) => async (dispatch) => {
  console.log("ACTIONS -> posts.js -> Post in createPost : ", post);
  try {
    const { data } = await api.createPost(post);
    console.log("ACTIONS -> posts.js -> createPost : ", data);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log("ACTIONS -> post.js -> createPost(Error) : ", error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
