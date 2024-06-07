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

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="SignIn" element={<SignIn />} />
        <Route exact path="SignUp" element={<SignUp />} />
        <Route exact path="books" element={<Books />} />
        <Route exact path="dashboard" element={<Dashboard />} />
        <Route exact path="admin" element={<AdminDashboard />} />
        <Route exact path="librarian" element={<LibrarianDashboard />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
