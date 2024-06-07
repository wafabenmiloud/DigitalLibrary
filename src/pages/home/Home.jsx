import React from "react";
import "./Home.css";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import about from "../../assets/about.jpg";
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import Card from "../books/Card";
import { Link } from "react-router-dom";
export default function Home() {
  return (
    <>
      <Header />
      <section id="about">
        <h1>Why Us ?</h1>
        <div className="content">
          <ul className="about__text">
            <li>
              Our online library management system is a one-stop solution that covers all the essential functions of a modern library. From searching and borrowing books to managing inventory and sending reminders, our system ensures seamless operation and user experience for students.
            </li>
            <li>
              We prioritize ease of use, with an intuitive interface that allows users to navigate effortlessly. Whether you are a student searching for a book or a librarian managing inventory, our platform is designed to make your tasks straightforward and efficient.
            </li>
            <li>
              Stay up-to-date with real-time updates on book availability and borrow status. Students can instantly know the status of their desired books, and librarians can efficiently manage returns and check-outs, reducing delays and improving service quality.
            </li>

            <li>
              Our system is designed to grow with your needs. Whether you are a small library or a large institution, our solution is fully customizable and scalable, allowing you to add new features or expand capacity as your requirements evolve.
            </li>
            <li>
              We offer dedicated customer support to help you with any issues or questions. Our team is committed to providing prompt and effective assistance, ensuring that your library management runs smoothly at all times.
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
      <section id="Books">
        <h4>Books</h4>
        <h1>Popular Books</h1>
        <div id="cards__wrapper">
          <Card
            img={img1}
            fee="Web Development"
            title="Website Design"
            desc="Web development is the building and maintenance of websites; it's the work that happens behind the scenes to make a website 
            look great, work fast and perform well with a seamless user experience."
          />
          <Card img={img2} fee="Android"
            title="Mobile app development"
            desc=" Mobile app development is the act or process by which a mobile app is developed for mobile devices, such as personal digital assistants,
           enterprise digital assistants or mobile phones."
          />
          <Card img={img3} fee="Robotics"
            title="Robots development"
            desc="There are many types of robots; they are used in many different environments and for many different uses. Although being very diverse in application and form."
          />
       
        </div>
        <Link to="/books">See more</Link>
      </section>
      <Footer />
    </>
  );
}
