import React, { useState } from 'react';
import './Signup.css';
import { Link } from "react-router-dom";
import img from "../../assets/form2.jpg";
import logo from "../../assets/logo.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

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
    try {
      const response = await axios.post(
        'http://localhost/DigitalLibrary/back/signup.php',
        new URLSearchParams(user), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      if (response.status === 200) {
        const { message } = response.data;
        setMessage(message);
        navigate('/signIn');
      } else {
        setMessage("An error occurred while submitting the form.");
      }
    } catch (error) {
      if (error.response) {
      
        setMessage(error.response.data.error || "An error occurred while submitting the form.");
      } else if (error.request) {
    
        setMessage("No response received from the server.");
      } else {
      
        setMessage("An error occurred while submitting the form.");
      }
      console.error("There was an error!", error);
    }
  }
  
 
  return (
    <div className='signup_page'>
      <Link className="logooo" to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="form__wrapper">
        <div className="form">
          <h2>Create an account</h2>
          <form onSubmit={handleSubmit}>
            <div className="form__element">
              <h4>Student card number</h4>
              <input type="number" name="cardNumber" id="cardNumber" value={user.cardNumber} onChange={handleChange} required />
            </div>
            <div className="form__element">
              <h4>Username</h4>
              <input type="text" name="name" id="name" value={user.name} onChange={handleChange} required />
            </div>
            <div className="form__element">
              <h4>Email</h4>
              <input type="email" name="email" id="email" value={user.email} onChange={handleChange} required />
            </div>
            <div className="form__element">
              <h4>Password</h4>
              <input type="password" name="password" id="password" value={user.password} onChange={handleChange} required />
            </div>
            <div className="form__element">
              <h4>Confirm Password</h4>
              <input type="password" name="passwordConfirm" id="passwordConfirm" value={user.passwordConfirm} onChange={handleChange} required />
            </div>
            <button type="submit"><h4>Register</h4></button>
          </form>
          {message && <p style={{ color: "red" }}>{message}</p>}
          <Link id='link' to="/SignIn"> Already have an account ?</Link>
        </div>
        <div className="form__img">
          <img src={img} alt="form" />
        </div>
      </div>
    </div>
  )
}
