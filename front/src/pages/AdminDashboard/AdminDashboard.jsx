import React from "react";
import "./AdminDashboard.css";
import Footer from "../../components/footer/Footer";

import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
export default function AdminDashboard() {
  return (
    <>
      <Navbar />

      <ul style={{ textAlign: "center", margin: "50px 0" }}>
        <li>      admin form login 
        </li>
        <li> link to admin dashboard</li>
        <li>Admin Dashboard</li>
        <li>Manage users (add, remove)</li>
        <li>Manage librarian profiles (create, modify)</li>
      </ul>

      <Footer />
    </>
  );
}
