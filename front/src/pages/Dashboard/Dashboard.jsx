import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signIn');
    } else {
      axios.get('http://localhost/DigitalLibrary/back/userData.php', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          localStorage.removeItem('token');
          setTimeout(() => navigate('/signIn'), 3000);
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the token from local storage
    localStorage.removeItem('token');
    // Redirect to login page
    navigate('/signIn');
  };
  return (
    <>
      <Navbar />

      <div>
        {userData ? (
          <div>
            <h2>Welcome, {userData.username}!</h2>
            <p>Email: {userData.email}</p>
            <p>ID: {userData.card_num}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ul style={{ textAlign: "center", margin: "50px 0" }}>
        <li>Student Dashboard</li>
        <li>Go to books page</li>
        <li>Borrowed books list</li>
        <li>Go to Profile settings (change password, update profile)</li>
        <li>Go to notifications</li>
      </ul>
      <Footer />
    </>
  );
}
