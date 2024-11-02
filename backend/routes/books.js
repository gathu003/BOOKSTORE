const express = require('express');
const router = express.Router();
const authenticateToken = require('../jwtVerifier'); // Adjust if your path is different

// Middleware to check for admin
const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({ message: "Access denied" });
    }
};

// GET /api/books: Retrieve a list of books
router.get('/', authenticateToken, (req, res) => {
    // Replace with your logic to retrieve books from the database
    res.json([{ id: 1, title: 'Sample Book', author: 'Author Name' }]);
});

// POST /api/books: Add a new book
router.post('/', authenticateToken, isAdmin, (req, res) => {
    // Replace with your logic to add a book to the database
    const newBook = req.body; // Make sure to validate the input
    res.status(201).json({ message: "Book added", book: newBook });
});

// PUT /api/books/:id: Update an existing book
router.put('/:id', authenticateToken, isAdmin, (req, res) => {
    // Replace with your logic to update the book with the given id
    const bookId = req.params.id;
    const updatedBook = req.body; // Make sure to validate the input
    res.json({ message: "Book updated", bookId, updatedBook });
});

// DELETE /api/books/:id: Delete a book
router.delete('/:id', authenticateToken, isAdmin, (req, res) => {
    // Replace with your logic to delete the book with the given id
    const bookId = req.params.id;
    res.json({ message: "Book deleted", bookId });
});

module.exports = router;



