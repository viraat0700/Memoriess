import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers/index.js";
import "../src/index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="136381732010-t439vbjt092gsksovrak3lq8fg07mbr4.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </Provider>,
  document.getElementById("root")
);
