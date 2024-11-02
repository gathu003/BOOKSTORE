// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, isAdmin, handleLogout }) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">My Bookstore</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    {!isAuthenticated ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/register">Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/cart">Shopping Cart</Link>
                            </li>
                            {isAdmin && (
                                <li className="nav-item">
                                    <Link className="nav-link" to="/admin">Admin Dashboard</Link>
                                </li>
                            )}
                            <li className="nav-item">
                                <button className="btn btn-link nav-link" onClick={handleLogout} aria-label="Logout">Logout</button>
                            </li>
                        </>
                    )}
                    <li className="nav-item">
                        <Link className="nav-link" to="/books">Books</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;


