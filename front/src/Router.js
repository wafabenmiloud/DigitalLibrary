import React from "react";
import Home from "./pages/home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/signup/Signin";
import SignUp from "./pages/signup/Signup";
import Books from "./pages/books/Books";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Notifications from "./pages/Notifications/Notifications";
import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import PrivateRoute from "./routes/PrivateRoute";

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />

        <Route
          exact
          path="SignIn"
          element={
            <PublicRoute>
              <SignIn />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="SignUp"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          exact
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="books"
          element={
            <PrivateRoute>
              <Books />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="notif"
          element={
            <PrivateRoute>
              <Notifications />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
