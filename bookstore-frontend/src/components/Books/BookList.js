import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/books');
                console.log('Books fetched:', response.data);

                if (Array.isArray(response.data.books)) {
                    setBooks(response.data.books);
                } else {
                    console.error('Expected an array but received:', response.data.books);
                    setBooks([]);
                }
            } catch (error) {
                console.error('Error fetching books:', error);
                setBooks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    const handleAddToCart = (book) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
        const bookInCart = existingCart.find(item => item.id === book.id);
        
        if (bookInCart) {
            bookInCart.quantity += 1;
        } else {
            existingCart.push({ ...book, quantity: 1 });
        }

        localStorage.setItem('cart', JSON.stringify(existingCart));
        alert(`${book.title} added to cart!`);
    };

    return (
        <div className="container book-list-container mt-5">
            <h1 className="text-center">Book List</h1>
            {loading ? (
                <p className="text-center">Loading books...</p>
            ) : (
                <div className="row">
                    {books.length === 0 ? (
                        <p className="text-center">No books available.</p>
                    ) : (
                        books.map((book) => (
                            <div className="col-md-4 mb-4" key={book.id}>
                                <div className="card book-card">
                                    <img 
                                        src={book.coverImage || 'default-thumbnail.jpg'} 
                                        className="card-img-top book-image" 
                                        alt={book.title} 
                                        onError={(e) => e.target.src = 'default-thumbnail.jpg'}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{book.title}</h5>
                                        <p className="card-text">
                                            {book.description ? book.description : 'No description available.'}
                                        </p>
                                        <p className="price-text">
                                            Price: ${book.price ? book.price.toFixed(2) : 'N/A'}
                                        </p>
                                        <button 
                                            className="btn btn-custom" 
                                            onClick={() => handleAddToCart(book)}
                                        >
                                            Add to Cart
                                        </button>
                                        <Link to={`/books/${book.id}`} className="btn view-details">
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default BookList;











