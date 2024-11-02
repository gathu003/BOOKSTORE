import React from 'react';
import './ManageBooks.css';

const ManageBooks = () => {
    // You would fetch books from your backend API and map them here
    const books = [
        { id: 1, title: "Book 1", author: "Author 1", price: 10 },
        { id: 2, title: "Book 2", author: "Author 2", price: 15 },
    ];

    return (
        <div className="manage-books">
            <h2>Manage Books</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.price}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ManageBooks;
