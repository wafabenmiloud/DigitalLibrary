import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./LibrarianDashboard.css";
import { IoMdAddCircle } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import AddBookPopup from "../../components/Popups/AddBookPopup";
import Card from "../books/Card";

export default function LibrarianDashboard({ userData }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };
  useEffect(() => {
    if (!token) {
      navigate("/SignIn");
      return;
    }

    const fetchBooks = async () => {
      try {
        const response = await axios.get(
          "http://localhost/DigitalLibrary/back/user/getBooks.php",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, [token, navigate]);

  const deleteBook = async (bookId) => {
    try {
      const response = await axios.post(
        "http://localhost/DigitalLibrary/back/librarian/deleteBook.php",
        new URLSearchParams({ id: bookId }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setBooks(books.filter((book) => book.id !== bookId));
        window.location.reload();
      } else {
        console.error("An error occurred while deleting the book.");
      }
    } catch (error) {
      console.error("An error occurred while deleting the nook:", error);
    }
  };
  const NotifyUser = async (userId, bookRef) => {
    try {
      const response = await axios.post(
        "http://localhost/DigitalLibrary/back/librarian/addNotif.php",
        new URLSearchParams({ id: userId, bookRef:bookRef }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    
    } catch (error) {
      console.error("An error occurred while deleting the nook:", error);
    }
  };
  const addBook = async (bookData) => {
    try {
      const response = await axios.post(
        "http://localhost/DigitalLibrary/back/librarian/addBook.php",
        new URLSearchParams(bookData),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
        setPopupMessage(
          error.response.data.error ||
            "An error occurred while submitting the form."
        );
      } else if (error.request) {
        setPopupMessage("No response received from the server.");
      } else {
        setPopupMessage("An error occurred while submitting the form.");
      }
    }
  };
  return (
    <>
      <div className="dashboard">
        {userData ? (
          <div className="user-info">
            <h2>Welcome, Librarian !</h2>
            <p>
              <strong>Username:</strong> {userData.username}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
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

        <div className="borrowed-books">
          <h3>Books</h3>
          {books.map((book) => (
            <li key={book.ID_livre}>
              <Card book={book} onDelete={() => deleteBook(book.ID_livre)} onNotif={() => NotifyUser(book.id, book.ISBN)}/>
            </li>
          ))}
          <IoMdAddCircle
            size={25}
            onClick={openPopup}
            style={{ cursor: "pointer" }}
          />{" "}
          add book
        </div>
      </div>

      {showPopup && (
        <AddBookPopup
          message={popupMessage}
          onCancel={closePopup}
          onConfirm={addBook}
        />
      )}
    </>
  );
}
