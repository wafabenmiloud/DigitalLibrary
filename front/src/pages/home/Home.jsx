import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import about from "../../assets/about.jpg";
import Card from "../books/Card";


export default function Home() {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const popBooks = [
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
      "titre": "The Great Gatsby",
      "auteur": "F. Scott Fitzgerald",
      "ISBN": "978-0743273565",
      "theme": "Classic",
      "estDisponible": true,
      "description": "A dystopian social science fiction novel and cautionary tale, written by the English writer Aldous Huxley."
    },
  ]
  return (
    <>
      <Header />
      <section id="about">
        <h1>Why Us ?</h1>
        <div className="content">
          <ul className="about__text">
            <li>
              Our online library management system is a one-stop solution that covers all the essential functions of a modern library. From searching and borrowing books to managing inventory and sending reminders, our system ensures seamless operation and user experience for users.
            </li>

            <li>
              Stay up-to-date with real-time updates on book availability and borrow status. users can instantly know the status of their desired books, and librarians can efficiently manage returns and check-outs, reducing delays and improving service quality.
            </li>

            <li>
              Our system is designed to grow with your needs. Whether you are a small library or a large institution, our solution is fully customizable and scalable, allowing you to add new features or expand capacity as your requirements evolve.
            </li>

            <li>
              By choosing our online library management system, you ensure that your library operates efficiently, users are satisfied, and administrative tasks are simplified. Experience the future of library management with our comprehensive, user-friendly, and secure solution.
            </li>
          </ul>
          <div className="about__img">
            <img src={about} alt="about" />
          </div>
        </div>
      </section>
      {isLoggedIn && (<section id="Books">
        <h4>Books</h4>
        <h1>Popular Books</h1>
        <div id="cards__wrapper">

          {popBooks.map((book, index) => (
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
      </section>)}

      <Footer />
    </>
  );
}
