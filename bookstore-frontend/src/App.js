// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap'; // Import Bootstrap components
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'; // Import Stripe

import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import BookList from './components/Books/BookList';
import BookDetail from './components/Books/BookDetail';
import ShoppingCart from './components/cart/ShoppingCart';
import UserProfile from './components/Profile/UserProfile';
import AdminDashboard from './components/Admin/AdminDashboard';
import AddBook from './components/Admin/AddBook';
import ManageBooks from './components/Admin/ManageBooks';
import Checkout from './components/Checkout/Checkout'; // Ensure Checkout.js is in the right folder
import Footer from './components/Footer/Footer'; // Ensure Footer.js and Footer.css are in the same folder
import Home from './components/Home/Home'; // Ensure Home.js is in the right folder

// Replace with your actual publishable key
const stripePromise = loadStripe('your-publishable-key-here');

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Handle login and set user roles
    const handleLogin = (role) => {
        setIsAuthenticated(true);
        setIsAdmin(role === 'admin');
    };

    // Handle logout and clear user session
    const handleLogout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
        localStorage.removeItem('token');
        localStorage.removeItem('cart'); // Optional: Clear cart on logout
    };

    return (
        <Elements stripe={stripePromise}> {/* Wrap your app with Elements */}
            <Router>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand as={Link} to="/">My Bookstore</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                {!isAuthenticated ? (
                                    <>
                                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                    </>
                                ) : (
                                    <>
                                        <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                                        <Nav.Link as={Link} to="/cart">Shopping Cart</Nav.Link>
                                        {isAdmin && <Nav.Link as={Link} to="/admin">Admin Dashboard</Nav.Link>}
                                        <Button variant="link" onClick={handleLogout}>Logout</Button>
                                    </>
                                )}
                                <Nav.Link as={Link} to="/books">Books</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                <Container className="mt-4">
                    <Routes>
                        <Route path="/" element={<Home />} /> {/* Home component */}
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login onLogin={handleLogin} />} />
                        <Route path="/books" element={<BookList />} />
                        <Route path="/books/:id" element={<BookDetail />} />
                        <Route path="/cart" element={<ShoppingCart />} />
                        <Route path="/checkout" element={<Checkout />} /> {/* Checkout route */}
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
                </Container>
                <Footer /> {/* Footer component */}
            </Router>
        </Elements>
    );
};

export default App;
















