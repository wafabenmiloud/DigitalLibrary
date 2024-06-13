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
    const books = [
        {
            "ID_livre": "1",
            "titre": "Le Petit Prince",
            "auteur": "Antoine de Saint-Exupéry",
            "ISBN": "978-0156012195",
            "theme": "Fiction",
            "estDisponible": true
        },
        {
            "ID_livre": "2",
            "titre": "1984",
            "auteur": "George Orwell",
            "ISBN": "978-0451524935",
            "theme": "Dystopian",
            "estDisponible": true
        },
        {
            "ID_livre": "3",
            "titre": "To Kill a Mockingbird",
            "auteur": "Harper Lee",
            "ISBN": "978-0061120084",
            "theme": "Classic",
            "estDisponible": false
        },
        {
            "ID_livre": "4",
            "titre": "The Great Gatsby",
            "auteur": "F. Scott Fitzgerald",
            "ISBN": "978-0743273565",
            "theme": "Classic",
            "estDisponible": true
        },
        {
            "ID_livre": "5",
            "titre": "Moby Dick",
            "auteur": "Herman Melville",
            "ISBN": "978-1503280786",
            "theme": "Adventure",
            "estDisponible": true
        }
        ,
        {
            "ID_livre": "6",
            "titre": "War and Peace",
            "auteur": "Leo Tolstoy",
            "ISBN": "978-1420958611",
            "theme": "Historical",
            "estDisponible": true
        }
        , {
            "ID_livre": "7",
            "titre": "Pride and Prejudice",
            "auteur": "Jane Austen",
            "ISBN": "978-1503290563",
            "theme": "Romance",
            "estDisponible": false
        }
        ,
        {
            "ID_livre": "8",
            "titre": "The Catcher in the Rye",
            "auteur": "J.D. Salinger",
            "ISBN": "978-0316769488",
            "theme": "Classic",
            "estDisponible": true
        }, {
            "ID_livre": "9",
            "titre": "The Hobbit",
            "auteur": "J.R.R. Tolkien",
            "ISBN": "978-0547928227",
            "theme": "Fantasy",
            "estDisponible": false
        }
        , {
            "ID_livre": "10",
            "titre": "Fahrenheit 451",
            "auteur": "Ray Bradbury",
            "ISBN": "978-1451673319",
            "theme": "Dystopian",
            "estDisponible": true
        }
        ,
        {
            "ID_livre": "11",
            "titre": "Brave New World",
            "auteur": "Aldous Huxley",
            "ISBN": "978-0060850524",
            "theme": "Dystopian",
            "estDisponible": true
        }

    ]
    const [borrowedBooks, setBorrowedBooks] = useState([
        {
            "ID_livre": "1",
            "titre": "Le Petit Prince",
            "auteur": "Antoine de Saint-Exupéry",
            "ISBN": "978-0156012195",
            "theme": "Fiction",
        },
        {
            "ID_livre": "2",
            "titre": "1984",
            "auteur": "George Orwell",
            "ISBN": "978-0451524935",
            "theme": "Dystopian",
        },
        {
            "ID_livre": "3",
            "titre": "To Kill a Mockingbird",
            "auteur": "Harper Lee",
            "ISBN": "978-0061120084",
            "theme": "Classic",
        },
        {
            "ID_livre": "4",
            "titre": "The Great Gatsby",
            "auteur": "F. Scott Fitzgerald",
            "ISBN": "978-0743273565",
            "theme": "Classic",
        },

    ]);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/signin');
            return;
        }

        axios.get('http://localhost/DigitalLibrary/back/userData.php', {
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
                    navigate('/login');
                }
            })
            .finally(() => {
                setLoading(false);
            });
    }, [token, navigate]);

    const handleChangePassword = (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }
        axios.post('http://localhost/DigitalLibrary/back/changePassword.php', new URLSearchParams({
            oldPassword: oldPassword,
            newPassword: newPassword
        }), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                setMessage(response.data.message);
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            })
            .catch(error => {
                if (error.response && error.response.data && error.response.data.error) {
                    setMessage(error.response.data.error);
                } else {
                    setMessage("There was an error changing the password!");
                    console.error("There was an error!", error);
                }
            });
    };
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
