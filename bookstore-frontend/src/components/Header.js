import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
    <header>
        <h1>Bookstore</h1>
        <nav>
            <Link to="/">Home</Link>
            <Link to="/books">Books</Link>
        </nav>
    </header>
);

export default Header;


