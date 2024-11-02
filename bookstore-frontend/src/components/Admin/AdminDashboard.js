import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <header className="admin-header">
                <h1>Admin Dashboard</h1>
                <nav className="admin-nav">
                    <Link to="/admin/add-book">Add Book</Link>
                    <Link to="/admin/manage-books">Manage Books</Link>
                </nav>
            </header>
            <div className="admin-content">
                <h2>Welcome to the Admin Panel</h2>
                <p>Select an option from the navigation to manage your bookstore.</p>
            </div>
        </div>
    );
};

export default AdminDashboard;
