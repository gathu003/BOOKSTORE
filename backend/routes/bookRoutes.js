const express = require('express');
const router = express.Router();
const {
    getAllBooks,   // Get all books
    getBookById,   // Get a book by ID
    createBook,    // Create a new book
    updateBook,    // Update a book by ID
    deleteBook     // Delete a book by ID
} = require('../controllers/bookController'); // Adjust path as necessary

// Define routes
router.get('/books', getAllBooks);           // GET /api/books - Get all books
router.get('/books/:id', getBookById);       // GET /api/books/:id - Get a specific book by ID
router.post('/books', createBook);           // POST /api/books - Create a new book
router.put('/books/:id', updateBook);        // PUT /api/books/:id - Update a specific book
router.delete('/books/:id', deleteBook);     // DELETE /api/books/:id - Delete a specific book

module.exports = router;

