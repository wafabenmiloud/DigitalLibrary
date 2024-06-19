import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import about from "../../assets/about.jpg";
import AuthContext from "../../context/AuthContext";


export default function Home() {
  const token = localStorage.getItem("token");
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const { loggedIn, userData } = useContext(AuthContext);


  function getRandomRecords(array, numRecords) {
    const arrayCopy = array.slice();
    for (let i = arrayCopy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]];
    }
    return arrayCopy.slice(0, numRecords);
  }

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
        const popBooks = getRandomRecords(response.data, 3);
        setBooks(popBooks);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchBooks();
  }, [token, navigate]);
  return (
    <>
      <Header />
      <section id="about">
        <h1>Why Us ?</h1>
        <div className="content">
          <ul className="about__text">
            <li>
              Our online library management system is a one-stop solution that
              covers all the essential functions of a modern library. From
              searching and borrowing books to managing inventory and sending
              reminders, our system ensures seamless operation and user
              experience for users.
            </li>

            <li>
              Stay up-to-date with real-time updates on book availability and
              borrow status. users can instantly know the status of their
              desired books, and librarians can efficiently manage returns and
              check-outs, reducing delays and improving service quality.
            </li>

            <li>
              Our system is designed to grow with your needs. Whether you are a
              small library or a large institution, our solution is fully
              customizable and scalable, allowing you to add new features or
              expand capacity as your requirements evolve.
            </li>

            <li>
              By choosing our online library management system, you ensure that
              your library operates efficiently, users are satisfied, and
              administrative tasks are simplified. Experience the future of
              library management with our comprehensive, user-friendly, and
              secure solution.
            </li>
          </ul>
          <div className="about__img">
            <img src={about} alt="about" />
          </div>
        </div>
      </section>
      {loggedIn &&userData&& userData.role === "student" &&(
         <section id="Books">
        <h4>Books</h4>
        <h1>Popular Books</h1>
        <div id="cards__wrapper">
          {books.map((book) => (
            <li key={book.ID_livre}>
              <Card book={book} />
            </li>
          ))}
        </div>
      </section>
      )}
     
      <Footer />
    </>
  );
}
const Card = ({ book }) => {
  return (
    <div className="book-card">
      <h4>{book.titre}</h4>
      <p>
        <strong>by</strong> {book.auteur}
      </p>
      <p>
        <strong>ISBN:</strong> {book.ISBN}
      </p>
      <p>
        <strong>Theme:</strong> {book.theme}
      </p>
    </div>
  );
};