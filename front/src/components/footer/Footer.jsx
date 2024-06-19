import React, { useContext } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/logo_dark.png";
import AuthContext from "../../context/AuthContext";

export default function Footer() {
  const { loggedIn, userData } = useContext(AuthContext);

  return (
    <footer>
      <div>
        <Link className="logoo" to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>
      <div>
        <h4>Useful Links</h4>
        <ul>
          <li>
            <Link className="link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link" to="/about">
              About us
            </Link>
          </li>
          {loggedIn && userData && userData.role === "student" && (
            <>
              <li>
                <Link className="link" to="/books">
                  Books
                </Link>
              </li>
            </>
          )}
          {loggedIn && (
            <>
              <li>
                <Link className="link" to="/dashboard">
                  Dashboard
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </footer>
  );
}
