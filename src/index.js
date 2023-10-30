import React from "react";
import ReactDOM from "react-dom/client";
// import reactDom from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/app";
import { BrowserRouter } from "react-router-dom";
import { createstore } from "./app/store/createStore";
import { Provider } from "react-redux";

const store = createstore();
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <React.StrictMode> */}
      <App />
      {/* </React.StrictMode> */}
    </BrowserRouter>
  </Provider>
);
