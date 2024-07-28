import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./AdminDashboard.css";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import AddLibrarianPopup from "../../components/Popups/AddLibrarianPopup";
import UpdateLibrarianPopup from "../../components/Popups/UpdateLibrarianPopup";

export default function AdminDashboard({ userData }) {
  const [users, setUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');
  const [popupMessage2, setPopupMessage2] = useState('');
  const [selectedLibrarian, setSelectedLibrarian] = useState(null);

  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get
          ('http://localhost/DigitalLibrary/back/admin/getUsers.php', {
            headers: { Authorization: `Bearer ${token}` }
          });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [token, navigate]);


  const addLibrarian = async (libData) => {
    try {
      const response = await axios.post(
        'http://localhost/DigitalLibrary/back/admin/addLibrarian.php',
        new URLSearchParams(libData), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      if (response.status === 200) {
        setShowPopup(false);
        window.location.reload();

      } else {

        setPopupMessage("An error occurred while submitting the form.");
      }
    } catch (error) {
      if (error.response) {

        setPopupMessage(error.response.data.error || "An error occurred while submitting the form.");
      } else if (error.request) {

        setPopupMessage("No response received from the server.");
      } else {

        setPopupMessage("An error occurred while submitting the form.");
      }
    }
  }
  const updateLibrarian = async (libData) => {
    try {
      const response = await axios.post(
        'http://localhost/DigitalLibrary/back/admin/updateLibrarian.php',
        new URLSearchParams(libData), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
      );
      if (response.status === 200) {
        setShowPopup2(false);
       

      } else {

        setPopupMessage2("An error occurred while submitting the form.");
      }
    } catch (error) {
      if (error.response) {

        setPopupMessage2(error.response.data.error || "An error occurred while submitting the form.");
      } else if (error.request) {

        setPopupMessage2("No response received from the server.");
      } else {

        setPopupMessage2("An error occurred while submitting the form.");
      }
    }
  }
  const deleteUser = async (userId) => {
    try {
      const response = await axios.post(
        'http://localhost/DigitalLibrary/back/admin/deleteUser.php',
        new URLSearchParams({ id: userId }), {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error("An error occurred while deleting the user.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the user:", error);
    }
  };
  const openAddLibrarianPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  }; 
  const openPopup2 = (librarian) => {
    setSelectedLibrarian(librarian);
    setShowPopup2(true);
  };

  const closePopup2 = () => {
    setShowPopup2(false);
    setSelectedLibrarian(null);
  };

  const students = users.filter(user => user.role === 'student');
  const librarians = users.filter(user => user.role === 'librarian');
  return (
    <>
      <div className="dashboard">
        {userData ? (
          <div className="user-info">
            <h2>Welcome, Admin!</h2>
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
          <h3>Students</h3>
          <ul>
          {students.map(student => (
              <li key={student.id}>
                <div className="book-card">
                  <h4>Student Card ID: {student.card_num}</h4>
                  <h4>Username: {student.username}</h4>
                  <h4>Email: {student.email}</h4>
                  <h4>Role: {student.role}</h4>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                    <MdDelete size={15} style={{cursor:"pointer"}} onClick={() => deleteUser(student.id)}/>
                  </div>
                </div>
              </li>
            ))}
                      <h3>Librarians</h3>

            {librarians.map(librarian => (
              <li key={librarian.id}>
                <div className="book-card">
                  <h4>Username: {librarian.username}</h4>
                  <h4>Email: {librarian.email}</h4>
                  <h4>Role: {librarian.role}</h4>
                  <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", gap: "20px" }}>
                    <FaRegEdit size={15} style={{cursor:"pointer"}} onClick={() => openPopup2(librarian)}/>
                    <MdDelete size={15} style={{cursor:"pointer"}} onClick={() => deleteUser(librarian.id)}/>
                  </div>
                </div>
              </li>
            ))}
            <IoMdAddCircle size={25} onClick={openAddLibrarianPopup} style={{cursor:"pointer"}}/> add librarian
          </ul>
        </div>
      </div>
      {showPopup && (
        <AddLibrarianPopup
          message={popupMessage}
          onCancel={closePopup}
          onConfirm={addLibrarian}
        />
      )}
      {showPopup2 && (
        <UpdateLibrarianPopup
        librarian={selectedLibrarian}
          message={popupMessage2}
          onCancel={closePopup2}
          onConfirm={updateLibrarian}
        />
      )}
    </>
  );
}
