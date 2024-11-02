import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BookList from './components/Books/BookList';
import BookDetail from './components/Books/BookDetail';
import ShoppingCart from './components/cart/ShoppingCart';
import UserProfile from './components/Profile/UserProfile';
import AdminDashboard from './components/Admin/AdminDashboard'; // Admin dashboard component
import AddBook from './components/Admin/AddBook'; // Component to add new books
import ManageBooks from './components/Admin/ManageBooks'; // Component to manage books

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin

    const handleLogin = (role) => {
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin'); // Set admin status based on role
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('token'); // Clear token from local storage on logout
    };

    return (
        <Router>
            <nav>
                <ul>
                    {!isAuthenticated ? (
                        <>
                            <li><Link to="/register">Register</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><Link to="/cart">Shopping Cart</Link></li>
                            {isAdmin && <li><Link to="/admin">Admin Dashboard</Link></li>} {/* Show Admin link if admin */}
                            <li><button onClick={handleLogout}>Logout</button></li>
                        </>
                    )}
                    <li><Link to="/books">Books</Link></li>
                </ul>
            </nav>
            <Routes>
                <Route path="/" element={<h1>Welcome to My Bookstore</h1>} /> {/* Welcome message added */}
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/books" element={<BookList />} />
                <Route path="/books/:id" element={<BookDetail />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/profile" element={<UserProfile />} />
                {isAdmin && (
                    <>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/add-book" element={<AddBook />} />
                        <Route path="/admin/manage-books" element={<ManageBooks />} />
                    </>
                )}
                <Route path="*" element={<h2>404 Not Found</h2>} />
            </Routes>
        </Router>
    );
};

export default App;





