import React from 'react';
import './Books.css';
import { MdClose } from 'react-icons/md';



const Card = ({ book, onDelete }) => {
  return (
    <div className="book-card">
      <h4>{book.titre}</h4>
      <p><strong>by</strong> {book.auteur}</p>
      <p><strong>ISBN/</strong> {book.ISBN}</p>
      <p><strong>Theme:</strong> {book.theme}</p>
      <p><strong>Availability:</strong> {book.estDisponible ? 'Yes' : 'No'}</p>
      <MdClose
        size={20}
        onClick={() => onDelete(book.ID_livre)}
        className="delete-icon"
      />
    </div>
  );
};

export default Card;
