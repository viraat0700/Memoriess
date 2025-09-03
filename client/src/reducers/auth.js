import { AUTH, LOGOUT } from "../constants/actionTypes";

const initialState = { authData: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      console.log(
        "action data from file path client/src/reducers/auth.js : ",
        action?.data
      );

      // Save to localStorage (optional)
      localStorage.setItem("profile", JSON.stringify({ ...action?.data }));

      return { ...state, authData: action?.data };

    case LOGOUT:
      localStorage.clear();
      return { ...state, authData: null };

    default:
      return state;
  }
};

export default authReducer;
