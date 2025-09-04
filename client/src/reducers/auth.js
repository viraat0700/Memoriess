import { AUTH, LOGOUT } from "../constants/actionTypes";

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case AUTH:
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
      console.log(
        "action data fom file path  client/src/reducers/auth.js : ",
        action?.data
      );
      return { ...state, authData: action?.data };
    case LOGOUT:
      localStorage.clear();
      console.log(
        "Logout from file path  client/src/reducers/auth.js : ",
        action?.data
      );
      return { ...state, authData: null };
    default:
      return state;
  }
};
export default authReducer;
