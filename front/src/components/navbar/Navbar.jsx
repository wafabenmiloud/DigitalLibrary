import React, { useEffect, useRef, useState } from "react";
import './Navbar.css';
import { AiOutlineMenu } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import logo from "../../assets/logo.png";
import axios from "axios";
import { IoIosLogOut } from "react-icons/io";

export default function Navbar() {
  const navRef = useRef();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/SignIn');
  };

  function Avatar(props) {
    const name = props.name || "";
    const initials = name
      .split(" ")
      .map((word) => word[0].toUpperCase())
      .join("");

    return (
      <div
        style={{
          display: "inline-block",
          width: props.size || 50,
          height: props.size || 50,
          borderRadius: "50%",
          backgroundColor: "var(--color-primary)",
          textAlign: "center",
          fontSize: 15,
          color: "var(--color-secondary)",
          fontWeight: "bold",
          lineHeight: `${props.size}px`,
          marginLeft: "2rem",
        }}
      >
        {initials}
      </div>
    );
  }
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoggedIn) {
      axios.get('http://localhost/DigitalLibrary/back/userData.php', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  }, [isLoggedIn, token]);

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
            {isLoggedIn && (
              <>
                <li>
                  <Link className="navbar__link" to="/books">
                    Books
                  </Link>
                </li>
                <li>
                  <Link className="navbar__link" to="/notifications">
                    Notifications
                  </Link>
                </li>
              </>
            )}
            {!isLoggedIn ? (
              <li>
                <Link to="/SignIn" className="btn">
                  Login
                </Link>
              </li>
            ) : (
              <>  <li>
                <Link to="/dashboard">{userData && <Avatar size={35} name={userData.username} />}</Link>

              </li>
                <li style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                  <IoIosLogOut onClick={handleLogout} className="btn_logout" />
                </li>
              </>

            )}
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
        <button className="navbar__btn open" onClick={showNavbar}>
          <AiOutlineMenu />
        </button>
      </div>
    </>
  );
}
