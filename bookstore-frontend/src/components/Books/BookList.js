import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './BookList.css';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Updated book data with correct IDs and image URLs
    const sampleBooks = [
        {
            id: 5, // Updated ID for Hitchhiker's Guide
            title: "The Hitchhiker's Guide to the Galaxy",
            description: "Seconds before the Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker's Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor. Together this dynamic pair begin a journey through space aided by quotes from The Hitchhiker's Guide and a galaxy-full of fellow travelers.",
            price: 5.60,
            coverImage: "/OIP.jpeg" // Updated image URL
        },
        {
            id: 4, // Updated ID for The Little Prince
            title: "The Little Prince",
            description: "A pilot stranded in the desert awakes one morning to see, standing before him, the most extraordinary little fellow. 'Please,' asks the stranger, 'draw me a sheep.' And the pilot realizes that when life's events are too difficult to understand, there is no choice but to succumb to their mysteries. Thus begins this wise and enchanting fable that has changed forever the world for its readers.",
            price: 6.60,
            coverImage: "/157993.jpg" // Updated image URL
        }
    ];

    useEffect(() => {
        // Simulate an API call
        const fetchBooks = () => {
            setTimeout(() => {
                setBooks(sampleBooks);
                setLoading(false);
            }, 1000); // Simulates a delay like an API call
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















