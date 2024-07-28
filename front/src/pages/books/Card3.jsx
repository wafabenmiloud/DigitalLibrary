import React from "react";
import "./Books.css";

const Card3 = ({ book, onReturn }) => {
  const isAvailable = book.estDisponible == 1;

  return (
    <div className="book-card">
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
        <strong>Due date:</strong> {book.return_date}
      </p>
      <br />
      <button onClick={() => onReturn(book.ID_livre)}>Return</button>{" "}
    </div>
  );
};

export default Card3;
