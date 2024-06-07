import React, { useRef, useState, useEffect } from "react";
import "./Header.css";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";
import TrackVisibility from "react-on-screen";

export default function Header() {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = [
    " Explore, Borrow, Learn – Anytime, Anywhere ",
    " Access the Library from the Comfort of Your Home ",
    " Unlock the Power of Reading ",
  ];
  const period = 1000;

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };
  return (
    <header>
      <Navbar />
      <div className="head">
        <h1 className="title">
          {" "}
          <TrackVisibility>
            {({ isVisible }) => (
              <div
                className={isVisible ? "animate__animated animate__fadeIn" : ""}
              >
                Your Digital Library, Reimagined. <br />
                <span
                  className="txt-rotate"
                  dataPeriod="100"
                  data-rotate={toRotate}
                >
                  <span className="wrap">{text}</span>
                </span>


              </div>
            )}
          </TrackVisibility>
          <br /><br /><br />
          <Link to="/SignUp" id="btn">
            Get started
          </Link>
        </h1>

      </div>
    </header>
  );
}
