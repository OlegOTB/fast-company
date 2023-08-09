import React from "react";
import reactDom from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";
import App from "./app";

reactDom.render(
  <BrowserRouter>
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode>, */}
  </BrowserRouter>,
  document.getElementById("root")
);
