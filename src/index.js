import React from "react";
import ReactDOM from "react-dom/client";
// import reactDom from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";
import App from "./app/app";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
  </BrowserRouter>
);
