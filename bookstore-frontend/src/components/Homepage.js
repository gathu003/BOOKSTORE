// src/components/Homepage.js
import React from 'react';
import BookList from './BookList'; // Ensure BookList is styled as per the design
import { Container, Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './Homepage.css';

const Homepage = () => {
    return (
        <div className="homepage-container">
            {/* Navbar */}
            <Navbar className="navbar-custom" expand="lg">
                <Container>
                    <Navbar.Brand href="/" className="navbar-brand">Bookstore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/cart">Cart</Nav.Link>
                        </Nav>
                        <Form className="d-flex search-form">
                            <FormControl
                                type="search"
                                placeholder="Search books"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button className="search-button">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            
            {/* Featured Books Section */}
            <Container className="featured-books-container">
                <h2 className="featured-books-heading">Featured Books</h2>
                <BookList />
            </Container>
            
            {/* Footer */}
            <div className="footer">
                &copy; 2024 Bookstore. All rights reserved.
            </div>
        </div>
    );
};

export default Homepage;




