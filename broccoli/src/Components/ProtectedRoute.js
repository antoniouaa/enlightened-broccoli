import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { isUserLoggedIn } from "../Actions/userSlice";

export const ProtectedRoute = ({ children, ...rest }) => {
  const loggedIn = useSelector(isUserLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        loggedIn ? children : <Redirect to="login" from={location} />
      }
    />
  );
};

export default ProtectedRoute;
