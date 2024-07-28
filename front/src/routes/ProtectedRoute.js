import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useContext(AuthContext);

  if (!loggedIn) {
    return <Navigate to="/SignIn" />;
  }

  return children;
};

export default ProtectedRoute;
