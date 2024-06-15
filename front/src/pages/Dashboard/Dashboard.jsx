import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import axios from 'axios';
import './Dashboard.css';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import LibrarianDashboard from '../LibrarianDashboard/LibrarianDashboard';

const Dashboard = () => {
    const [userData, setUserData] = useState(null);
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
            return;
        }

        axios.get('http://localhost/DigitalLibrary/back/user/userData.php', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setUserData(response.data);
            })
            .catch(error => {
                console.error("There was an error!", error);
                if (error.response && error.response.status === 401) {
                    alert("Your session has expired. Please log in again.");
                    localStorage.removeItem('token');
                    navigate('/SignIn');
                }
            })

    }, [token, navigate]);


    return (
        <>
            <Navbar />
            {
                userData && userData.role === 'student' && (<StudentDashboard userData={userData} />)
            }
            {
                userData && userData.role === 'admin' && (<AdminDashboard userData={userData} />)
            }
            {
                userData && userData.role === 'librarian' && (<LibrarianDashboard userData={userData} />)
            }

            <Footer />
        </>
    );
};

export default Dashboard;
