const request = require("supertest");
const { app, prisma } = require("./app"); // Importing app and prisma from app.js

beforeAll(async () => {
    // Optional: Setup database state before tests
});

beforeEach(async () => {
    // Clear the database before each test
    await prisma.book.deleteMany({}); // Delete books first
    await prisma.user.deleteMany({}); // Then delete users
});

afterAll(async () => {
    // Disconnect from the database after tests complete
    await prisma.$disconnect();
});

// Function to create a new user
async function createUser(email, password) {
    return await prisma.user.create({
        data: {
            email,
            password,
        },
    });
}

// Function to create a new book
async function createBook(title, description, price, genre, pdfUrl, userId) {
    return await prisma.book.create({
        data: {
            title,
            description,
            price,
            genre,
            pdfUrl,
            userId, // Use the provided userId
        },
    });
}

// Test suite for user and book creation
describe('Database Operations', () => {
    it('should create a new user', async () => {
        const user = await createUser('testuser1@example.com', 'securepassword');
        expect(user).toHaveProperty('email', 'testuser1@example.com');
        console.log('Created User:', user);
    });

    it('should create a new book for the user', async () => {
        const user = await createUser('testuser2@example.com', 'securepassword'); // Create another user for the test
        const book = await createBook('Test Book Title', 'This is a test description.', 19.99, 'Fiction', 'http://example.com/test.pdf', user.id);
        expect(book).toHaveProperty('title', 'Test Book Title');
        console.log('Created Book:', book);
    });
});


