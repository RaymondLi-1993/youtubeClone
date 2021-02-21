import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import Videos from "./videos";
import Header from "./header";
import Login from "./login";
import SignUp from "./signUp";
import Landing from "./landing";

import History from "../history";
import { ProtectedRouter } from "./protectedRoute";

let App = () => {
  const user = useSelector(state => state.auth) || null;

  return (
    <div className="w-full h-screen m-0 p-0 font-Nunito">
      <Header />
      <div className="w-full h-full m-0 p-0">
        <Router history={History}>
          <Switch>
            <Route path="/signin" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/" exact component={Landing} />
            <ProtectedRouter
              path="/videos"
              auth={user}
              exact
              component={Videos}
            />
          </Switch>
        </Router>
      </div>
    </div>
  );
};

export default App;
