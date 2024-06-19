import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import './Books.css';
import Footer from "../../components/footer/Footer"
import Navbar from '../../components/navbar/Navbar';

const SearchBar = ({ searchQuery, setSearchQuery, theme, setTheme, themes }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Enter reference ..."
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
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

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

  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('');
  const themes = [...new Set(books.map((book) => book.theme))];

  const filteredBooks = books.filter((book) => {
    const matchesSearchQuery =
      book.ISBN.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTheme = theme ? book.theme === theme : true;
    return matchesSearchQuery && matchesTheme;
  });

  return (
    <>
      <Navbar />
      <h1 id='titre'>Books</h1> 

      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        theme={theme}
        setTheme={setTheme}
        themes={themes}
      />
      
      <div id="cards__wrapper">
       {filteredBooks.map((book) => (
            <li key={book.ID_livre}>
              <Card book={book}/>
            </li>
          ))}
      </div>
      <Footer />
    </>
  )
}
const Card = ({ book }) => {
  return (
    <div className="book-card">
      <h4>{book.titre}</h4>
      <p><strong>by</strong> {book.auteur}</p>
      <p><strong>ISBN:</strong> {book.ISBN}</p>
      <p><strong>Theme:</strong> {book.theme}</p>
      <p><strong>Availability:</strong> {book.estDisponible ? 'Yes' : 'No'}</p>
    
    </div>
  );
};