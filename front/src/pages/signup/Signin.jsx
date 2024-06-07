import React, { useState } from 'react'
import './Signup.css';
import { Link } from "react-router-dom";
import img from "../../assets/form.jpg";
import logo from "../../assets/logo.png";

export default function Signin() {
  const [user, setUser] = useState({
  
    email: "",
    password: ""
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
    const response = await fetch('http://your_server/signin.php', {
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
          <h2>Welcome back !</h2>
          <form onSubmit={handleSubmit}>
            <div className="form__element">
              <h4>Email</h4>
              <input type="email" name="email" id="email" value={user.email} onChange={handleChange} />
            </div>
            <div className="form__element">
              <h4>Password</h4>
              <input type="password" name="password" id="password" value={user.password} onChange={handleChange} />
            </div>
            
            <button type="submit"><h4>Login</h4></button>
          </form>
          {message && <p>{message}</p>}
          <Link id='link' to="/SignUp"> New here ?</Link>
          <Link id='link' to="/"> Forgot password ?</Link>
        </div>
        <div className="form__img">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  )
}
