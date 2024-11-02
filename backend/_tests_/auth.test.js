const request = require('supertest');
const { app, prisma } = require('../app'); // Importing app and prisma from app.js

describe('User Authentication', () => {
    beforeAll(async () => {
        // Clear the database before running tests
        await prisma.book.deleteMany({}); // Clear existing books or any related records
        await prisma.user.deleteMany({}); // Clear existing users
    });

    afterAll(async () => {
        // Disconnect from the database after tests complete
        await prisma.$disconnect();
    });

    it('should register a new user', async () => {
        const response = await request(app)
            .post('/api/user/register') // Adjusted endpoint for user registration
            .send({ email: 'testuser@example.com', password: 'password1234' });
        
        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
    });

    it('should log in a user', async () => {
        // First, register the user to ensure they exist in the database
        await request(app)
            .post('/api/user/register')
            .send({ email: 'testuser@example.com', password: 'password1234' });
        
        const response = await request(app)
            .post('/api/login') // Adjusted endpoint for user login
            .send({ email: 'testuser@example.com', password: 'password1234' });
        
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
        expect(response.body.message).toBe('Login successful');
    });
});
