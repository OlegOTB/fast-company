import React from "react";
import UsersList from "./components/usersList";
import NavBar from "./components/navBar";
// import { Route, Switch } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/main";
import Login from "./components/login";
import UserCard from "./components/userCard";
import NotFound from "./components/not-found";

// console.log(match.match.params.userId)
// (match) => <UserCard id={match.params.userId} />
const App = () => {
  return (
    <>
      <NavBar />
      <Switch>
        <Route exact path="/" component={UsersList} />
        <Route exact path="/Users" component={UsersList} />
        <Route
          path="/Users/:userId?"
          component={(match) => <UserCard id={match.match.params.userId} />}
        />
        <Route path="/Main" component={Main} />
        <Route path="/Login" component={Login} />
        <Route path="/404" component={NotFound} />
        <Redirect to="404" />
      </Switch>
    </>
  );
};

export default App;
