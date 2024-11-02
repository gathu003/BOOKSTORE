const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
});

// Rate limiting for specific routes
app.use("/api/user/register", limiter);
app.use("/api/login", limiter);

// Authentication middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ message: "Invalid token" });
        req.user = user;
        next();
    });
};

// Simple Test Endpoint
app.get('/api/test', (req, res) => {
    res.json({ message: "Test endpoint is working" });
});

// User Registration Route
app.post('/api/user/register', async (req, res) => {
    console.log("Registration request received:", req.body);
    try {
        const { email, password, isAdmin } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                isAdmin: (await prisma.user.count()) === 0 || isAdmin === true,
            },
        });

        console.log("User registered:", newUser);
        res.status(201).json({ message: 'User registered successfully', userId: newUser.id });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// User Login
app.post("/api/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        console.log("Login attempt with email:", email);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            console.log("User not found");
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password valid:", isPasswordValid);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get User Profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
        });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get User by Email for Debugging
app.get('/api/user/:email', async (req, res) => {
    const { email } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Password Reset (for authenticated users)
app.post("/api/reset-password", authenticateToken, async (req, res) => {
    const { email, newPassword } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });
        res.status(200).json({ message: "Password updated successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating password." });
    }
});

// Fetch All Users (Admin Only)
app.get("/api/users", authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }

    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Fetch All Books with Optional Pagination and Filtering
app.get("/api/books", async (req, res) => {
    const { page = 1, limit = 10, search = "" } = req.query; 
    const skip = (page - 1) * limit; 

    console.log("Page:", page, "Limit:", limit, "Search:", search); 

    try {
        const books = await prisma.book.findMany({
            where: {
                title: {
                    contains: search, 
                }
            },
            include: { authors: true }, 
            skip: parseInt(skip),
            take: parseInt(limit),
        });

        const totalBooks = await prisma.book.count({
            where: {
                title: {
                    contains: search, 
                }
            }
        });

        res.status(200).json({
            books,
            totalBooks,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalBooks / limit),
        });
    } catch (error) {
        console.error("Error fetching books:", error.message); 
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
});

// Admin Add Book
app.post("/api/books", authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }

    const { title, description, price, genre, pdfUrl, thumbnail, publisher, authors } = req.body;

    try {
        const newBook = await prisma.book.create({
            data: {
                title,
                description,
                price,
                genre,
                pdfUrl,
                thumbnail,
                publisher,
                userId: req.user.userId, 
                authors: {
                    connect: authors.map(authorId => ({ id: authorId })),
                },
            },
        });

        res.status(201).json(newBook);
    } catch (error) {
        console.error("Error uploading book:", error);
        res.status(500).json({ message: 'Error uploading book', error });
    }
});

// Get Book by ID
app.get("/api/books/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const book = await prisma.book.findUnique({
            where: { id: Number(id) },
            include: { authors: true }, 
        });

        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Admin Update Book
app.put("/api/books/:id", authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;
    const { title, description, price, genre, pdfUrl, thumbnail, publisher, authors } = req.body;

    try {
        const updatedBook = await prisma.book.update({
            where: { id: Number(id) },
            data: {
                title,
                description,
                price,
                genre,
                pdfUrl,
                thumbnail,
                publisher,
                authors: {
                    set: authors.map(authorId => ({ id: authorId })),
                },
            },
        });

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error("Error updating book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Admin Delete Book
app.delete("/api/books/:id", authenticateToken, async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.user.userId } });
    if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Access denied" });
    }

    const { id } = req.params;

    try {
        await prisma.book.delete({ where: { id: Number(id) } });
        res.status(204).send();
    } catch (error) {
        console.error("Error deleting book:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Global Error Handler:", err);
    res.status(500).json({ message: "Internal server error" });
});

// Server Start
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}

module.exports = { app, prisma };
