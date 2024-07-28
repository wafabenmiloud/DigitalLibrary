import React, { useContext } from 'react';
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import StudentDashboard from "../StudentDashboard/StudentDashboard";
import './Dashboard.css';
import AdminDashboard from '../AdminDashboard/AdminDashboard';
import LibrarianDashboard from '../LibrarianDashboard/LibrarianDashboard';
import AuthContext from '../../context/AuthContext';

const Dashboard = () => {
    const { userData } = useContext(AuthContext);

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
