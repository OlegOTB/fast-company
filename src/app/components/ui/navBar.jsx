import React from "react";
import { Link } from "react-router-dom";
// import { useAuth } from "../../hooks/useAuth";
import NavProfile from "./navProfile";
import { getIsLoggedIn } from "../../store/users";
import { useSelector } from "react-redux";

const NavBar = () => {
  // const { currentUser } = useAuth();
  const isLoggedIn = useSelector(getIsLoggedIn());
  return (
    <nav className="navbar bg-light mb-3">
      <div className="container-fluid">
        <ul className="nav">
          <li className="nav-item">
            <Link key={"link-main"} to={"/Main"} className={"nav-link"}>
              Main
            </Link>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <Link key={"link-users"} to={"/Users"} className={"nav-link"}>
                Users
              </Link>
            </li>
          )}
        </ul>
        <div className="d-flex">
          {isLoggedIn ? (
            <NavProfile />
          ) : (
            <Link key={"link-login"} to={"/Login"} className={"nav-link"}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
