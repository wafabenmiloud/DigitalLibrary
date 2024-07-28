import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Books.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import Card2 from "./Card2";

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  theme,
  setTheme,
  themes,
}) => {
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

  const token = localStorage.getItem("token");
  const fetchBooks = async () => {
    try {
      const response = await axios.get(
        "http://localhost/DigitalLibrary/back/user/getBooks.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [theme, setTheme] = useState("");
  const themes = [...new Set(books.map((book) => book.theme))];

  const filteredBooks = books.filter((book) => {
    const matchesSearchQuery = book.ISBN.toLowerCase().includes(
      searchQuery.toLowerCase()
    );
    const matchesTheme = theme ? book.theme === theme : true;
    return matchesSearchQuery && matchesTheme;
  });

  const borrowBook = async (bookId) => {
    try {
      await axios.post(
        "http://localhost/DigitalLibrary/back/student/borrowBook.php",
        new URLSearchParams({ id: bookId }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBooks();
    } catch (error) {
      console.error("An error occurred while borrowing the book:", error);
    }
  };
  return (
    <>
      <Navbar />
      <h1 id="titre">Books</h1>

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
            <Card2 book={book} onBorrow={() => borrowBook(book.ID_livre)} />
          </li>
        ))}
      </div>
      <Footer />
    </>
  );
}
