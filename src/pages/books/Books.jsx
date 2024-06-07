import React from 'react'
import './Books.css';
import Footer from "../../components/footer/Footer"
import Navbar from '../../components/navbar/Navbar';
import Card from './Card';
import img1 from "../../assets/1.jpg";
import img2 from "../../assets/2.jpg";
import img3 from "../../assets/3.jpg";
import img4 from "../../assets/4.jpg";
import img5 from "../../assets/5.jpg";
import img6 from "../../assets/6.jpg";
import img7 from "../../assets/7.jpg";
import img8 from "../../assets/8.jpg";
import img9 from "../../assets/9.jpg";
export default function Books() {
  return (
    <>
      <Navbar />


      <h1 id='titre'>Books</h1> <ul style={{ textAlign: "center", margin: "50px 0" }}>
        <li>      Search bar
        </li>
        <li>Filters (by theme, reference)
          <li>Book Details Page

            
            
            
          </li>
          <li>Book title
          </li>
          <li>Author</li>
          <li>Description</li>
          <li>Availability status</li>
          <li>Borrow button</li>
        </li>

      </ul>
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
        <Card img={img4} fee="PSocs"
          title="Programmable System on chip"
          desc="PSoC is a family of microcontroller integrated circuits by Cypress Semiconductor. These chips include a CPU core and mixed-signal arrays of configurable integrated analog and digital peripherals."
        />
        <Card
          img={img5}
          fee="VHDL"
          title="Hardware Description Language"
          desc="The VHSIC Hardware Description Language (VHDL) is a hardware description language (HDL) that can model the behavior and structure of digital systems"

        />
        <Card img={img6} fee="CyberSecurity"
          title="Protect your website from cyber attacks"
          desc="Cybersecurity is the protection of internet-connected systems such as hardware, software and data from cyberthreats. The practice is used by individuals and enterprises to protect against unauthorized access to data centers and other computerized systems."
        />
        <Card
          img={img7}
          fee="Python"
          title="Programming language"
          desc="Python is an interpreted high-level general-purpose programming language.            "

        />
        <Card img={img8} fee="English"
          title="Improve your listening skills"
          desc=" It is a fact that no matter what age one is, that learning a second language improves brain functionality. Every single brain changes with age, but case studies executed show results that people who know more than one language have a longer attention span and perform better on attention tests."
        />
        <Card img={img9} fee="Mathematics"
          title="Probability"
          desc="Probability is the branch of mathematics concerning numerical descriptions of how likely an event is to occur, or how likely it is that a proposition is true. The probability of an event is a number between 0 and 1, where, roughly speaking, 0 indicates impossibility of the event and 1 indicates certainty"
        />
      </div>
      <Footer />
    </>
  )
}
