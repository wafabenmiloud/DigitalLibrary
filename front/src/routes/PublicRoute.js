import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);

  if (loggedIn) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
