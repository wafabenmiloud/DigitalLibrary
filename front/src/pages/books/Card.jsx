import React from 'react';
import './Books.css';

export default function Card({ ID_livre, titre, auteur, ISBN, theme, estDisponible, description }) {
  return (
    <div className='card'>
      <h2>{titre}</h2>
      <p><strong>Author:</strong> {auteur}</p>
      <p><strong>ISBN:</strong> {ISBN}</p>
      <p><strong>Theme:</strong> {theme}</p>
      <p><strong>Available:</strong> {estDisponible ? 'Yes' : 'No'}</p>
      <p><strong>Description:</strong> {description}</p>
      <button disabled={!estDisponible}>Borrow book</button>
    </div>
  );
}
