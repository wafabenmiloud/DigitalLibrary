import React from "react";
import Home from "./pages/home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import LibrarianDashboard from "./pages/LibrarianDashboard/LibrarianDashboard";
import SignIn from "./pages/signup/Signin";
import SignUp from "./pages/signup/Signup";
import Books from "./pages/books/Books";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import PrivateRoute from './PrivateRoute'
import AuthRoute from './AuthRoute'
import Notifications from "./pages/Notifications/Notifications";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="SignIn"
            element={
              <PrivateRoute>
                <SignIn />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="SignUp"
            element={
              <PrivateRoute>
                <SignUp />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="books"
            element={
              <AuthRoute>
                <Books />
              </AuthRoute>
            }
          />
          <Route
            exact
            path="dashboard"
            element={
              <AuthRoute>
                <Dashboard />
              </AuthRoute>
            }
          />
        
          <Route
            exact
            path="notif"
            element={
              <AuthRoute>
                <Notifications />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
