import React from "react";
import "./Books.css";
import { MdClose } from "react-icons/md";

const Card = ({ book, onDelete, onNotif }) => {
  const isAvailable = book.estDisponible == 1;

  const isDueDateSoon = (returnDate) => {
    const now = new Date();
    const dueDate = new Date(returnDate);
    return dueDate >= now;
  };

  const isOverdue = !isAvailable && new Date(book.return_date) < new Date();

  return (
    <div className={` ${isAvailable ? "book-card" : "book-card-borrowed"}`}>
      <h4>{book.titre}</h4>
      <p>
        <strong>by:</strong> {book.auteur}
      </p>
      <p>
        <strong>ISBN:</strong> {book.ISBN}
      </p>
      <p>
        <strong>Theme:</strong> {book.theme}
      </p>
      <p>
        <strong>Availability:</strong>{" "}
        {isAvailable
          ? "Book available"
          : `Book borrowed by ${book.username} (Student card number : ${book.card_num})`}
      </p>
      {!isAvailable && (
        <p>
          <strong
            style={{
              color: isDueDateSoon(book.return_date) ? "" : "red",
            }}
          >
            Due date: {book.return_date}
          </strong>
        </p>
      )}
      {isOverdue && (
        <>
          {" "}
          <p>
            <strong
              style={{
                color: "red",
              }}
            >
              Book is not returned within the specific delay.
            </strong>
          </p>
          <button className="button-alert" onClick={() => onNotif(book.id)}>
            Notify student
          </button>
        </>
      )}
      <MdClose
        size={20}
        onClick={() => onDelete(book.ID_livre)}
        className="delete-icon"
      />
    </div>
  );
};

export default Card;
