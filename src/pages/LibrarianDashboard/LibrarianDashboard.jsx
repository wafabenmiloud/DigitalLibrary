import React from "react";
import "./LibrarianDashboard.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
export default function LibrarianDashboard() {
  return (
    <>
      <Navbar />

      <ul style={{ textAlign: "center", margin: "50px 0" }}>

        <li>Librarian form login</li>
        <li>Librarian Dashboard</li>
        <li>Add new book form
        </li>
        <li>Remove book option
        </li>
        <li>Mark book as returned
        </li>
        <li>List of overdue books
        </li>
        <li>Send reminder messages to students
        </li>

      </ul>

      <Footer />
    </>
  );
}
