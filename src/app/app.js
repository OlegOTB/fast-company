import React from "react";
// import UsersList from "./components/usersList";
import NavBar from "./components/ui/navBar";
// import { Route, Switch } from "react-router-dom";
import { Route, Switch, Redirect } from "react-router-dom";
import Main from "./layouts/main";
import Login from "./layouts/login";
import Users from "./layouts/users";
import { ToastContainer } from "react-toastify";
import ProfessionProvider from "./hooks/useProfession";
import QualitiesProvider from "./hooks/useQualities";
// import UserCard from "./components/userCard";
// import NotFound from "./components/not-found";

const App = () => {
  return (
    <div>
      <NavBar />
      <QualitiesProvider>
        <ProfessionProvider>
          <Switch>
            <Route path="/Users/:userId?/:edit?" component={Users} />
            <Route
              path="/Users/:userId?"
              component={Users}
              // component={(match) => <UserCard id={match.match.params.userId} />}
            />
            {/* <Route exact path="/Users" component={UsersList} /> */}
            {/* <Route path="/Main" component={Main} /> */}
            <Route path="/Login:type?" component={Login} />
            {/* <Route path="/404" component={NotFound} /> */}
            {/* <Redirect to="404" /> */}
            <Route path="/" exact component={Main} />
            <Redirect to="/" />
          </Switch>
        </ProfessionProvider>
      </QualitiesProvider>
      <ToastContainer />
    </div>
  );
};

export default App;
