import React from "react";
import "./LibrarianDashboard.css";
import { IoMdAddCircle } from "react-icons/io";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
export default function LibrarianDashboard({ userData }) {
  const books = [
    {
      "ID_livre": "1",
      "titre": "Le Petit Prince",
      "auteur": "Antoine de Saint-Exupéry",
      "ISBN": "978-0156012195",
      "theme": "Fiction",
      "estDisponible": true
    },
    {
      "ID_livre": "2",
      "titre": "1984",
      "auteur": "George Orwell",
      "ISBN": "978-0451524935",
      "theme": "Dystopian",
      "estDisponible": true
    },
    {
      "ID_livre": "3",
      "titre": "To Kill a Mockingbird",
      "auteur": "Harper Lee",
      "ISBN": "978-0061120084",
      "theme": "Classic",
      "estDisponible": false
    },
    {
      "ID_livre": "4",
      "titre": "The Great Gatsby",
      "auteur": "F. Scott Fitzgerald",
      "ISBN": "978-0743273565",
      "theme": "Classic",
      "estDisponible": true
    },
    {
      "ID_livre": "5",
      "titre": "Moby Dick",
      "auteur": "Herman Melville",
      "ISBN": "978-1503280786",
      "theme": "Adventure",
      "estDisponible": true
    }
    ,
    {
      "ID_livre": "6",
      "titre": "War and Peace",
      "auteur": "Leo Tolstoy",
      "ISBN": "978-1420958611",
      "theme": "Historical",
      "estDisponible": true
    }
    , {
      "ID_livre": "7",
      "titre": "Pride and Prejudice",
      "auteur": "Jane Austen",
      "ISBN": "978-1503290563",
      "theme": "Romance",
      "estDisponible": false
    }
    ,
    {
      "ID_livre": "8",
      "titre": "The Catcher in the Rye",
      "auteur": "J.D. Salinger",
      "ISBN": "978-0316769488",
      "theme": "Classic",
      "estDisponible": true
    }, {
      "ID_livre": "9",
      "titre": "The Hobbit",
      "auteur": "J.R.R. Tolkien",
      "ISBN": "978-0547928227",
      "theme": "Fantasy",
      "estDisponible": false
    }
    , {
      "ID_livre": "10",
      "titre": "Fahrenheit 451",
      "auteur": "Ray Bradbury",
      "ISBN": "978-1451673319",
      "theme": "Dystopian",
      "estDisponible": true
    }
    ,
    {
      "ID_livre": "11",
      "titre": "Brave New World",
      "auteur": "Aldous Huxley",
      "ISBN": "978-0060850524",
      "theme": "Dystopian",
      "estDisponible": true
    }

  ]
  return (
    <>
      <div className="dashboard">
          {userData ? (
            <div className="user-info">
              <h2>Welcome, Librarian !</h2>
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
          <h3>Books</h3>
          <ul>
            {books.map(book => (
              <li key={book.ID_livre}>
                <div className="book-card">
                  <h4>{book.titre}</h4>
                  <p>by {book.auteur}</p>
                  <p>Theme: {book.theme}</p>
                  <p>Availability: ...</p>

                  <MdDelete size={15} />       <br />           <input type="checkbox" name="" id="" />returned

                </div>

              </li>
            ))}
            <IoMdAddCircle size={25} /> add book

          </ul>
        </div>

      </div>
      <ul style={{ textAlign: "center", margin: "50px 0" }}>
        <li>List of overdue books
        </li>
        <li>Send reminder messages to users
        </li>

      </ul>

    </>
  );
}
