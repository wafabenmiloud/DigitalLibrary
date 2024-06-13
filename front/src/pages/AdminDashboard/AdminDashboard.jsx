import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AdminDashboard.css";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function AdminDashboard({ userData }) {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
 
  const users = [
    {
      "id": "1",
      "card_num": "123456",
      "username": "student1",
      "email": "student1@gmail.com",
      "role": "student"

    },
    {
      "id": "2",
      "username": "librarian1",
      "email": "librarian1@gmail.com",
      "role": "librarian"

    },

  ]
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      setLoading(false)
      return;
    }
  }, []);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <div className="dashboard">
        {userData ? (
          <div className="user-info">
            <h2>Welcome, Admin !</h2>
            <p><strong>Username:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Role:</strong> {userData.role}</p>
          </div>
        ) : (
          <div className="user-info">
            <p>Loading...</p>
          </div>
        )}
        <div className="borrowed-books">
          <h3>Users</h3>
          <ul>
            {users.map(user => (
              <li key={user.id}>
                <div className="book-card">                  {user.role === 'student' && <h4>Student Card ID: {user.card_num}</h4>}

                  <h4>Username: {user.username}</h4>
                  <h4>Email: {user.email}</h4>
                  <h4>Role: {user.role}</h4>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "20px" }}>

                    {user.role === 'librarian' && <FaRegEdit size={15} />}   <MdDelete size={15} />
                  </div>
                </div>
              </li>
            ))}
            <IoMdAddCircle size={25} /> add librarian
          </ul>

        </div>

      </div>


    </>
  );
}
