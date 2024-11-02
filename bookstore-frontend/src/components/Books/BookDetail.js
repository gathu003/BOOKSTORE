import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetail = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            const response = await axios.get(`http://localhost:3000/api/books/${id}`);
            setBook(response.data);
        };
        fetchBook();
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h1 className="text-center">{book.title}</h1>
            <img src={book.coverImage} className="img-fluid" alt={book.title} />
            <p className="mt-3">{book.description}</p>
            <h5>Author: {book.author}</h5>
            <h5>Price: ${book.price}</h5>
            <button className="btn btn-success mt-3">Add to Cart</button>
        </div>
    );
};

export default BookDetail;

