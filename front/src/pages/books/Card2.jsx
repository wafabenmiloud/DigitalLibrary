import React from 'react';
import './Books.css';



const Card2 = ({ book, onBorrow }) => {
  const isAvailable = book.estDisponible == 1;

  return (
    <div className="book-card">
      <h3>{book.titre}</h3>
      <p>
        <strong>by:</strong> {book.auteur}
      </p>
      <p>
        <strong>ISBN:</strong> {book.ISBN}
      </p>
      <p>
        <strong>Theme:</strong> {book.theme}
      </p>
      <button
        className={`button ${
          isAvailable ? "button-enabled" : "button-disabled"
        }`}
        disabled={!isAvailable}
        onClick={() => onBorrow(book.ID_livre)}
      >
        Borrow
      </button>{" "}
    </div>
  );
};

export default Card2;
