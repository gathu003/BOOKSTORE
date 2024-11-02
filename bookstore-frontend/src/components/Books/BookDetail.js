// src/components/BookDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Button, Alert, Spinner } from 'react-bootstrap';
import './BookDetail.css'; // Import the CSS file for styling

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/books/${id}`);
                setBook(response.data);
            } catch (err) {
                setError('Error fetching book details. Please try again later.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchBook();
    }, [id]);

    const handleAddToCart = () => {
        if (!book) return;

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const bookInCart = cart.find(item => item.id === book.id);

        if (bookInCart) {
            bookInCart.quantity += 1;
        } else {
            cart.push({ ...book, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${book.title} has been added to your cart!`);
    };

    if (loading) return (
        <div className="text-center">
            <Spinner animation="border" /> Loading...
        </div>
    );

    if (error) return <Alert variant="danger">{error}</Alert>;

    if (!book) return null;

    return (
        <Container className="book-detail-container mt-5">
            <h1 className="text-center">{book.title}</h1>
            <img src={book.coverImage || 'default-thumbnail.jpg'} className="img-fluid book-cover" alt={book.title} />
            <div className="book-details">
                <p className="book-description">{book.description}</p>
                <h5 className="book-author">Author: {book.author}</h5>
                <h5 className="book-price">Price: ${book.price.toFixed(2)}</h5>
                <Button variant="success" onClick={handleAddToCart} className="mt-3 add-to-cart-button">Add to Cart</Button>
            </div>
        </Container>
    );
};

export default BookDetail;



