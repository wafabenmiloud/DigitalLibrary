import React from 'react'
import './Footer.css';
import { Link } from "react-router-dom";
import logo from "../../assets/logo_dark.png"

export default function footer() {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;

  return (
    <footer>
      <div>
        <Link className="logoo" to="/">
          <img src={logo} alt="" />
        </Link>
      </div>
      <div>
        <h4>Useful Links</h4>
        <ul>
          <li> <Link className='link' to="/">Home</Link></li>
          <li> <Link className='link' to="/">About us</Link></li>
          {
            isLoggedIn && (<>
              <li> <Link className='link' to="/books">Books</Link></li>
              <li> <Link className='link' to="/dashboard">Dashboard</Link></li>
            </>)
          }
        </ul>
      </div>

    </footer>
  )
}
