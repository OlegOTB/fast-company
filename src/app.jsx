import React from "react";
import UsersList from "./components/usersList";
import NavBar from "./components/navBar";
// import { Route, Switch } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./components/layouts/main";
import Login from "./components/layouts/login";
import Users from "./components/layouts/users";
// import UserCard from "./components/userCard";
// import NotFound from "./components/not-found";

const App = () => {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route
          path="/Users/:userId?"
          // component={(match) => <UserCard id={match.match.params.userId} />}
          component={Users}
        />
        <Route exact path="/Users" component={UsersList} />
        {/* <Route path="/Main" component={Main} /> */}
        <Route path="/Login" component={Login} />
        {/* <Route path="/404" component={NotFound} /> */}
        {/* <Redirect to="404" /> */}
        <Route path="/" exact component={Main} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
};

export default App;
