import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { loggedIn, userData } = useContext(AuthContext);

  if (!loggedIn) {
    return <Navigate to="/SignIn" />;
  }
  if (loggedIn && userData && userData.role !== "student" ) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
