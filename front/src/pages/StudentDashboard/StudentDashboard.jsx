import React, { useEffect, useState } from "react";
import axios from "axios";
import "./StudentDashboard.css";
import Card3 from "../books/Card3";

const StudentDashboard = ({ userData }) => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    axios
      .post(
        "http://localhost/DigitalLibrary/back/student/changePassword.php",
        new URLSearchParams({
          oldPassword: oldPassword,
          newPassword: newPassword,
        }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setMessage(response.data.message);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          setMessage(error.response.data.error);
        } else {
          setMessage("There was an error changing the password!");
          console.error("There was an error!", error);
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "oldPassword":
        setOldPassword(value);
        break;
      case "newPassword":
        setNewPassword(value);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost/DigitalLibrary/back/student/getBorrowedBooks.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBorrowedBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }
  const returnBook = async (bookId) => {
    try {
      await axios.post(
        "http://localhost/DigitalLibrary/back/student/returnBook.php",
        new URLSearchParams({ id: bookId }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBooks();
    } catch (error) {
      console.error("An error occurred while returning the book:", error);
    }
  };
  return (
    <>
      <div className="dashboard">
        <div style={{ gap: "10px", display: "flex", flexDirection: "column" }}>
          {userData ? (
            <div className="user-info">
              <h2>Welcome, {userData.username}!</h2>
              <p>
                <strong>Email:</strong> {userData.email}
              </p>
              <p>
                <strong>Student Card:</strong> {userData.card_num}
              </p>
              <p>
                <strong>Role:</strong> {userData.role}
              </p>
            </div>
          ) : (
            <div className="user-info">
              <p>Loading...</p>
            </div>
          )}
          <div className="change-password">
            <h3>Change Password</h3>
            <form onSubmit={handleChangePassword}>
              <label>
                Old Password:
                <input
                  type="password"
                  name="oldPassword"
                  value={oldPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                New Password:
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Confirm Password:
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Change Password</button>
            </form>
            {message && <p className="message">{message}</p>}
          </div>
        </div>
        <div className="borrowed-books">
          <h3>Borrowed Books</h3>
          <ul>
            {borrowedBooks.map((book) => (
              <li key={book.ID_livre}>
               <Card3 book={book} onReturn={() => returnBook(book.ID_livre)}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
