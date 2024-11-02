// Import Prisma client
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all books with optional pagination and filtering
const getAllBooks = async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query;
    const skip = (page - 1) * limit;

    try {
        const books = await prisma.book.findMany({
            where: {
                title: { contains: search }
            },
            include: { authors: true },
            skip: parseInt(skip),
            take: parseInt(limit),
        });

        const totalBooks = await prisma.book.count({
            where: {
                title: { contains: search }
            },
        });

        res.status(200).json({ books, totalBooks, currentPage: parseInt(page), totalPages: Math.ceil(totalBooks / limit) });
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ message: 'Error fetching books', error: error.message });
    }
};

// Get a book by ID
const getBookById = async (req, res) => {
    const { id } = req.params;
    try {
        const book = await prisma.book.findUnique({
            where: { id: Number(id) },
            include: { authors: true },
        });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching the book' });
    }
};

// Create a new book (Admin only)
const createBook = async (req, res) => {
    const { title, description, price, genre, pdfUrl, authors, userId } = req.body; // Include all necessary fields
    try {
        const newBook = await prisma.book.create({
            data: {
                title,
                description,
                price,
                genre,
                pdfUrl,
                authors: { connect: authors.map(authorId => ({ id: authorId })) },
                user: { connect: { id: userId } }, // Connect to the user who created the book
            },
        });
        res.status(201).json(newBook);
    } catch (error) {
        console.error('Error creating the book:', error);
        res.status(500).json({ message: 'Error creating the book', error: error.message });
    }
};

// Update a book (Admin only)
const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, description, price, genre, pdfUrl, authors } = req.body; // Include all fields to update
    try {
        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                price,
                genre,
                pdfUrl,
                authors: { connect: authors.map(authorId => ({ id: authorId })) },
            },
        });
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating the book' });
    }
};

// Delete a book (Admin only)
const deleteBook = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.book.delete({
            where: { id: Number(id) },
        });
        res.status(204).send(); // No content
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting the book' });
    }
};

// Export all controller functions
module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};


