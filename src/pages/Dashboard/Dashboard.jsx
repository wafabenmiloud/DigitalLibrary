import React from "react";
import "./Dashboard.css";
import Footer from "../../components/footer/Footer";

import { Link } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
export default function Dashboard() {
  return (
    <>
      <Navbar />

      <ul style={{ textAlign: "center", margin: "50px 0" }}>
        <li>      Student Dashboard
        </li>
        <li>go to books page
        </li>
        <li> Borrowed books list</li>
        <li>goto Profile settings (change password, update profile)</li>
       
        <li>goto notifications</li>
      </ul>

      <Footer />
    </>
  );
}
