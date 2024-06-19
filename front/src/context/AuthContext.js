import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const [loggedIn, setLoggedIn] = useState(isLoggedIn);
  const [userData, setUserData] = useState(null);

  async function getLoggedIn() {
    if (isLoggedIn) {
      try {
        const response = await axios.get('http://localhost/DigitalLibrary/back/user/userData.php', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setLoggedIn(true);
        setUserData(response.data);
      } catch (error) {
        console.error("There was an error fetching user data:", error);
        setLoggedIn(false);
        setUserData(null);
      }
    } else {
      setLoggedIn(false);
      setUserData(null);
    }
  }

  useEffect(() => {
    getLoggedIn();
  }, [isLoggedIn, token]);

  return (
    <AuthContext.Provider value={{ loggedIn, getLoggedIn, userData }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
