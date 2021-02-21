import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const Landing = () => {
  const user = useSelector(state => state.auth) || null;

  if (user) {
    return <Redirect to="/videos" />;
  }
  if (!user) {
    return <Redirect to="/signin" />;
  }

  return <div>...Loading</div>;
};

export default Landing;
