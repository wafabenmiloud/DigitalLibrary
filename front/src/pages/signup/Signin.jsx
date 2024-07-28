import React, { useState, useContext } from "react";
import "./Signup.css";
import { Link } from "react-router-dom";
import img from "../../assets/form2.jpg";
import logo from "../../assets/logo.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

export default function Signin() {
  const { getLoggedIn } = useContext(AuthContext);

  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost/DigitalLibrary/back/user/login.php",
        new URLSearchParams(user),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        await getLoggedIn();

        navigate("/dashboard");
      } else {
        setMessage("An error occurred while submitting the form.");
      }
    } catch (error) {
      setMessage("An error occurred: " + error.message);
    }
  };

  return (
    <div className="signup_page">
      <Link className="logooo" to="/">
        <img src={logo} alt="" />
      </Link>
      <div className="form__wrapper">
        <div className="form">
          <h2>Welcome back !</h2>
          <form onSubmit={handleSubmit}>
            <div className="form__element">
              <h4>Email</h4>
              <input
                type="email"
                name="email"
                id="email"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div className="form__element">
              <h4>Password</h4>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleChange}
              />
            </div>

            <button type="submit">
              <h4>Login</h4>
            </button>
          </form>
          {message && <p style={{ color: "red" }}>{message}</p>}
          <Link id="link" to="/SignUp">
            {" "}
            New here ?
          </Link>
        </div>
        <div className="form__img">
          <img src={img} alt="img" />
        </div>
      </div>
    </div>
  );
}
