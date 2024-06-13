import React, { useState } from 'react'
import './Books.css';
import Footer from "../../components/footer/Footer"
import Navbar from '../../components/navbar/Navbar';
import Card from './Card';

const SearchBar = ({ searchQuery, setSearchQuery, theme, setTheme, themes }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter title or author ..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="">All Themes</option>
        {themes.map((theme, index) => (
          <option key={index} value={theme}>
            {theme}
          </option>
        ))}
      </select>
    </div>
  );
};
export default function Books() {
  const books = [
    {
      "ID_livre": "1",
      "titre": "Le Petit Prince",
      "auteur": "Antoine de Saint-Exupéry",
      "ISBN": "978-0156012195",
      "theme": "Fiction",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    },
    {
      "ID_livre": "2",
      "titre": "1984",
      "auteur": "George Orwell",
      "ISBN": "978-0451524935",
      "theme": "Dystopian",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    },
    {
      "ID_livre": "3",
      "titre": "To Kill a Mockingbird",
      "auteur": "Harper Lee",
      "ISBN": "978-0061120084",
      "theme": "Classic",
      "estDisponible": false,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    },
    {
      "ID_livre": "4",
      "titre": "The Great Gatsby",
      "auteur": "F. Scott Fitzgerald",
      "ISBN": "978-0743273565",
      "theme": "Classic",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    },
    {
      "ID_livre": "5",
      "titre": "Moby Dick",
      "auteur": "Herman Melville",
      "ISBN": "978-1503280786",
      "theme": "Adventure",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    }
    ,
    {
      "ID_livre": "6",
      "titre": "War and Peace",
      "auteur": "Leo Tolstoy",
      "ISBN": "978-1420958611",
      "theme": "Historical",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    }
    , {
      "ID_livre": "7",
      "titre": "Pride and Prejudice",
      "auteur": "Jane Austen",
      "ISBN": "978-1503290563",
      "theme": "Romance",
      "estDisponible": false,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    }
    ,
    {
      "ID_livre": "8",
      "titre": "The Catcher in the Rye",
      "auteur": "J.D. Salinger",
      "ISBN": "978-0316769488",
      "theme": "Classic",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    }, {
      "ID_livre": "9",
      "titre": "The Hobbit",
      "auteur": "J.R.R. Tolkien",
      "ISBN": "978-0547928227",
      "theme": "Fantasy",
      "estDisponible": false,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    }
    , {
      "ID_livre": "10",
      "titre": "Fahrenheit 451",
      "auteur": "Ray Bradbury",
      "ISBN": "978-1451673319",
      "theme": "Dystopian",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    }
    ,
    {
      "ID_livre": "11",
      "titre": "Brave New World",
      "auteur": "Aldous Huxley",
      "ISBN": "978-0060850524",
      "theme": "Dystopian",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    }

  ]
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('');
  const themes = [...new Set(books.map((book) => book.theme))];

  const filteredBooks = books.filter((book) => {
    const matchesSearchQuery =
      book.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.auteur.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = theme ? book.theme === theme : true;
    return matchesSearchQuery && matchesTheme;
  });
  return (
    <>
      <Navbar />

      <ul style={{ textAlign: "center", margin: "50px 0" }}>
        <li>Book Details Page *
          </li>

      </ul>
      <h1 id='titre'>Books</h1> 

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        setTheme={setTheme}
        themes={themes}
      />
      
     
      <div id="cards__wrapper">
        {filteredBooks.map((book, index) => (
          <Card
            key={index}
            ID_livre={book.ID_livre}
            titre={book.titre}
            auteur={book.auteur}
            ISBN={book.ISBN}
            theme={book.theme}
            estDisponible={book.estDisponible}
            description={book.description}
          />
        ))}
      </div>
      <Footer />
    </>
  )
}
