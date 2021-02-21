import React from "react";
import { Route, Redirect } from "react-router-dom";

export const ProtectedRouter = ({ auth, component: Component, ...res }) => {
  return (
    <Route
      {...res}
      render={(...props) => {
        if (auth.isSignedIn === true) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/signin" />;
        }
      }}
    />
  );
};
