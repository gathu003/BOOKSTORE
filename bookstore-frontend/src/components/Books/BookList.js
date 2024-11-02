import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const response = await axios.get('http://localhost:3000/api/books');
            setBooks(response.data);
        };
        fetchBooks();
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center">Book List</h1>
            <div className="row">
                {books.map((book) => (
                    <div className="col-md-4" key={book.id}>
                        <div className="card mb-4">
                            <img src={book.coverImage} className="card-img-top" alt={book.title} />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.description}</p>
                                <Link to={`/books/${book.id}`} className="btn btn-primary">View Details</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;



