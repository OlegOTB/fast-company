import React from "react";
import ReactDOM from "react-dom/client";
// import reactDom from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/app";
import { Router } from "react-router-dom";
import { createstore } from "./app/store/createStore";
import history from "./app/utils/history";
import { Provider } from "react-redux";

const store = createstore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router history={history}>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </Router>
  </Provider>
);
