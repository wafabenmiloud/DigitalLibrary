import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import SignIn from "./pages/signup/Signin";
import SignUp from "./pages/signup/Signup";
import Books from "./pages/books/Books";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Notifications from "./pages/Notifications/Notifications";
import { AuthContextProvider } from "./context/AuthContext";
import AuthContext from "./context/AuthContext";

function App() {
  const { loggedIn, userData } = useContext(AuthContext);

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          {" "}
          <Route exact path="/" element={<Home />} />
          {loggedIn && userData && userData.role === "student" && (
            <>
              <Route exact path="books" element={<Books />} />

              <Route exact path="notif" element={<Notifications />} />
            </>
          )}
          {!loggedIn && (
            <>
              <Route exact path="SignIn" element={<SignIn />} />
              <Route exact path="SignUp" element={<SignUp />} />{" "}
            </>
          )}
          {loggedIn && (
            <>
              <Route exact path="dashboard" element={<Dashboard />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
