import * as api from "../api/index.js";
import { CREATE, FETCH_ALL,UPDATE } from "../constants/actionTypes.js";

export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log("ACTION -> posts.js -> getPosts(Error) : ", error.message);
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
 
export const updatePost = (id,post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id,post);
    dispatch({type: UPDATE, payload: data});
  } catch (error) {
    console.log(error);
  }
};