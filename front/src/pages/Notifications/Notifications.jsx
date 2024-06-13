import React, { useState } from 'react';
import './Notifications.css';
import Footer from "../../components/footer/Footer"
import Navbar from '../../components/navbar/Navbar';
const Notifications = () => {
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Notification 1' },
        { id: 2, message: 'Notification 2' },
    ]);

    const removeNotification = (id) => {
        setNotifications(notifications.filter(notification => notification.id !== id));
    };

    return (
        <>
            <Navbar />  <div className="notifications-container">
                {notifications.map(notification => (
                    <div key={notification.id} className="notification">
                        <p>{notification.message}</p>
                        <button onClick={() => removeNotification(notification.id)}>Dismiss</button>
                    </div>
                ))}
            </div>      <Footer />

        </>

    );
};

export default Notifications;
