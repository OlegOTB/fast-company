import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <Link key={"link-main"} to={"/Main"} className={"nav-link"}>
        Main
      </Link>
      <Link key={"link-login"} to={"/Login"} className={"nav-link"}>
        Login
      </Link>
      <a className={"nav-link"} href={"/Users"}>
        Users
      </a>
      {/* <Link key={"link-users"} to={"/Users"} className={"nav-link"}> */}
      {/* Users */}
      {/* </Link> */}
    </nav>
  );
};

export default NavBar;
