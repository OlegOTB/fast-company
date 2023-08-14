import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <li className="nav-item">
        <Link key={"link-main"} to={"/Main"} className={"nav-link"}>
          Main
        </Link>
      </li>
      <li className="nav-item">
        <Link key={"link-login"} to={"/Login"} className={"nav-link"}>
          Login
        </Link>
      </li>
      <li className="nav-item">
        {/* <a className={"nav-link"} href={"/Users"}>
          Users
        </a> */}
        <Link key={"link-users"} to={"/Users"} className={"nav-link"}>
          Users
        </Link>
      </li>
    </nav>
  );
};

export default NavBar;
