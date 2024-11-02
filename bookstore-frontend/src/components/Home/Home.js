// src/components/Home.js
import React, { useState } from 'react';
import BookList from '../Books/BookList'; // Adjust this import if necessary

import { Container, Navbar, Nav, Form, FormControl, Button, Row, Col, Card } from 'react-bootstrap';

const Home = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        // Implement search logic here (e.g., filter BookList)
        console.log('Searching for:', searchQuery);
    };

    return (
        <div>
            {/* Navbar */}
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">Bookstore</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/login">Login</Nav.Link>
                            <Nav.Link href="/register">Register</Nav.Link>
                            <Nav.Link href="/cart">Cart</Nav.Link>
                        </Nav>
                        <Form className="d-flex" onSubmit={handleSearchSubmit}>
                            <FormControl
                                type="search"
                                placeholder="Search books"
                                className="me-2"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={handleSearchChange}
                            />
                            <Button variant="outline-success" type="submit">Search</Button>
                        </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* Main Content */}
            <Container className="mt-4">
                {/* Featured Book Section */}
                <Row className="mb-5">
                    <Col md={6}>
                        <Card>
                            <Card.Img variant="top" src="path_to_featured_book_image.jpg" alt="Featured Book" />
                            <Card.Body>
                                <Card.Title>Becoming by Michelle Obama</Card.Title>
                                <Card.Text>$22.99</Card.Text>
                                <Button variant="primary" onClick={() => {/* Logic to add to cart */}}>Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={6} className="d-flex align-items-center">
                        <div>
                            <p className="lead">
                                "The former first lady’s wit and warmth shine through in an extraordinarily candid account of her life (...)."
                            </p>
                            <small>— Peter Conrad, The Guardian</small>
                        </div>
                    </Col>
                </Row>

                {/* Categories Section */}
                <Row className="mb-5 text-center">
                    <Col md={4}>
                        <Card className="p-3 bg-light">
                            <h6>Payday Deals</h6>
                            <p>-25%</p>
                            <Button variant="outline-dark">Shop Now</Button>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="p-3 bg-light">
                            <h6>Best-Selling Comics</h6>
                            <Button variant="outline-dark">Shop Now</Button>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="p-3 bg-light">
                            <h6>Books about Design</h6>
                            <Button variant="outline-dark">Shop Now</Button>
                        </Card>
                    </Col>
                </Row>

                {/* Book List Section */}
                <h2>Our Top Rated Books</h2>
                <BookList />
            </Container>
        </div>
    );
};

export default Home;



