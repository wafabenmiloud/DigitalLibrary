import React, { useEffect, useState } from "react";
import "./Notifications.css";
import Footer from "../../components/footer/Footer";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(
        "http://localhost/DigitalLibrary/back/student/getNotif.php",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };
  useEffect(() => {
    fetchNotifications();
  }, []);

  const removeNotification = async (notifId) => {
    try {
      await axios.post(
        "http://localhost/DigitalLibrary/back/student/deleteNotif.php",
        new URLSearchParams({ id: notifId }),
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchNotifications();
    
    } catch (error) {
      console.error("An error occurred while deleting the notif:", error);
    }
  };
  return (
    <>
      <Navbar />{" "}
      <h1 id="titre">Notifications</h1>
      <br /><br />

      <div className="notifications-container">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification">
            <p>{notification.description}</p>{" "}
            <MdDelete size={25} color="red" onClick={() => removeNotification(notification.id)} style={{cursor:"pointer"}}/>
          </div>
        ))}
      </div>{" "}
      <br /><br /><br /><br />
      <Footer />
    </>
  );
};

export default Notifications;
