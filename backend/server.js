const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const Stripe = require('stripe');
const { getAllBooks, getBookById, createBook, updateBook, deleteBook } = require('./controllers/bookController');

const app = express();
const PORT = process.env.PORT || 5000;
const stripe = Stripe(sk_test_51QGRSQIoLxOczx23rV7xQGdb913AQx4WuEggdMkFqovQt2EBzv3LG30neEun0rZo40pTVm8IMHIbIaY4rwUrzmI400bbAXdeOW); // Replace with your Stripe secret key

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/api/books', getAllBooks); // Get all books
app.get('/api/book/:id', getBookById); // Get a book by ID
app.post('/api/books', createBook); // Create a new book (Admin only)
app.put('/api/book/:id', updateBook); // Update a book (Admin only)
app.delete('/api/book/:id', deleteBook); // Delete a book (Admin only)

// Checkout route
app.post('/api/checkout', async (req, res) => {
    try {
        const { items } = req.body; // Expecting an array of items

        // Create a new Stripe payment intent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmount(items), // Implement this function to calculate total amount
            currency: 'usd', // Change this based on your currency
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Function to calculate total order amount
const calculateOrderAmount = (items) => {
    // Implement your logic to sum up the item prices
    return items.reduce((total, item) => total + item.price * 100, 0); // Assuming item.price is in dollars
};

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


