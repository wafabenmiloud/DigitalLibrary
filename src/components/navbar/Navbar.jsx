import React, { useRef } from "react";
import './Navbar.css';
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { Link } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png"

export default function Navbar() {
  const navRef = useRef();
  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <>
      <nav ref={navRef}>
        <ul className="navbar__menu">
          <li>
            <Link className="logo" to="/">
              <img src={logo} alt="" />
            </Link>
          </li>
          <div className="navbar_menu_row">
            <li>
              <Link className="navbar__link" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="navbar__link" to="/#about">
                About
              </Link>
            </li>
            <li>
              <Link className="navbar__link" to="/books">
                Books
              </Link>
            </li>
            <li><Link to="/SignIn" className="btn">
              Login
            </Link></li>

          </div>
          <button className="navbar__btn close" onClick={showNavbar}>
            <FaTimes />
          </button>
        </ul>
      </nav>
      <div className="open_plus_logo">
        <Link className="logo" to="/">
          <img src={logo} alt="" />
        </Link>
        <button className="navbar__btn open " onClick={showNavbar}>
          <AiOutlineMenu />
        </button>
      </div>
    </>)
}
