import React, { useState } from 'react'
import './Signup.css';
import { Link } from "react-router-dom";
import img from "../../assets/form.jpg"
import logo from "../../assets/logo.png"

export default function Signup() {
  const [user, setUser] = useState({
    cardNumber: "",
    name: "",
    email: "",
    password: "",
    passwordConfirm: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  }

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await fetch('http://your_server/signup.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(user)
    });

    const data = await response.json();
    setMessage(data.message);
  }

  return (
    <div className='signup_page'>
      <Link className="logooo" to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="form__wrapper">
        <div className="form">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form__element">
              <h4>Student card number</h4>
              <input type="number" name="cardNumber" id="cardNumber" value={user.cardNumber} onChange={handleChange} />
            </div>
            <div className="form__element">
              <h4>Username</h4>
              <input type="text" name="name" id="name" value={user.name} onChange={handleChange} />
            </div>
            <div className="form__element">
              <h4>Email</h4>
              <input type="email" name="email" id="email" value={user.email} onChange={handleChange} />
            </div>
            <div className="form__element">
              <h4>Password</h4>
              <input type="password" name="password" id="password" value={user.password} onChange={handleChange} />
            </div>
            <div className="form__element">
              <h4>Confirm Password</h4>
              <input type="password" name="passwordConfirm" id="passwordConfirm" value={user.passwordConfirm} onChange={handleChange} />
            </div>
            <button type="submit"><h4>Register</h4></button>
          </form>
          {message && <p>{message}</p>}
          <Link id='link' to="/SignIn"> Already have an account ?</Link>
        </div>
        <div className="form__img">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  )
}
