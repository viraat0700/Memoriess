import * as api from "../api/index.js";
import { AUTH } from "../constants/actionTypes";

export const signIn = (formData, history) => async (dispatch) => {
  try {
    // after loggin in the user

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};

export const signUp = (formData, history) => async (dispatch) => {
  try {
    // after Sign Up in the user

    history.push("/");
  } catch (error) {
    console.log(error);
  }
};
