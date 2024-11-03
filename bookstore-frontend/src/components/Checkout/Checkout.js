// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Button, Alert, ListGroup, Form } from 'react-bootstrap';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'; // Import useStripe and useElements
import './Checkout.css'; // Import the CSS file for styling

const stripePromise = loadStripe('pk_test_51QGRSQIoLxOczx23LXKYodQZDIC4USclSK0r0oJcrdwT2DVuTXgzoGoNKr9i64wI8CiIEfZrwFuMXEchN121BhJp00Mv86o3PB'); // Replace with your actual Stripe public key

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [name, setName] = useState(''); // State for user's name
    const [address, setAddress] = useState(''); // State for user's address
    const stripe = useStripe(); // Initialize Stripe
    const elements = useElements(); // Initialize elements

    useEffect(() => {
        const fetchCartItems = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(storedCart);
            calculateTotalPrice(storedCart);
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalPrice(total);
    };

    const handleCheckout = async () => {
        if (!stripe || !elements) {
            // Make sure to wait for Stripe to load
            return;
        }

        try {
            // Create a payment method using the CardElement
            const { error, paymentMethod } = await stripe.createPaymentMethod({
                type: 'card',
                card: elements.getElement(CardElement), // Use the CardElement to get the card details
            });

            if (error) {
                throw new Error(error.message); // Handle errors from Stripe
            }

            const response = await fetch('/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    amount: totalPrice * 100, // Amount in cents
                    currency: 'usd', // Currency can be changed if needed
                    paymentMethodId: paymentMethod.id, // Use the paymentMethod.id received from Stripe
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json(); // Get the error response from the server
                throw new Error(errorResponse.message || 'Failed to process payment');
            }

            const { charge } = await response.json();

            // Handle successful charge
            console.log('Charge successful:', charge);
            localStorage.removeItem('cart'); // Clear cart after successful payment
        } catch (error) {
            console.error('Error during payment:', error);
            setError(error.message || 'An error occurred. Please try again.'); // Update the error state with a relevant message
        }
    };

    return (
        <Container className="checkout-container mt-5">
            <h1 className="text-center">Checkout</h1>
            {error && <Alert variant="danger" className="text-center">{error}</Alert>}
            <h2 className="text-center">Total Price: ${totalPrice.toFixed(2)}</h2>
            
            {cartItems.length > 0 ? (
                <ListGroup className="mt-4">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center cart-item">
                            <div>
                                <h5>{item.title}</h5>
                                <p>Price: ${item.price.toFixed(2)} (Qty: {item.quantity})</p>
                            </div>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            ) : (
                <p className="text-center mt-4">Your cart is empty.</p>
            )}

            <Form className="mt-4">
                <Form.Group controlId="formName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your name" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Form.Group>
                <Form.Group controlId="formAddress" className="mt-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)} 
                    />
                </Form.Group>
            </Form>

            {/* Add CardElement here for card details */}
            <CardElement className="mt-4" />

            <div className="text-center">
                <Button 
                    onClick={handleCheckout} 
                    disabled={cartItems.length === 0 || !name || !address} // Disable button if no items or missing details
                    variant="success" 
                    size="lg" 
                    className="mt-3">
                    Proceed to Payment
                </Button>
            </div>
        </Container>
    );
};

export default Checkout;












