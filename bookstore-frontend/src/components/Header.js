// src/components/Header.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css'; // Assuming you create a CSS file for styles

const Header = () => {
    const location = useLocation();

    return (
        <header className="header">
            <h1>Bookstore</h1>
            <nav className="nav">
                <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
                <Link to="/books" className={location.pathname === '/books' ? 'active' : ''}>Books</Link>
                {/* Add more links here as needed */}
            </nav>
        </header>
    );
};

export default Header;



