// src/components/Checkout.js
import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Container, Button, Alert, ListGroup, Form } from 'react-bootstrap';
import './Checkout.css'; // Import the CSS file for styling

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your actual Stripe public key

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null);
    const [name, setName] = useState(''); // State for user's name
    const [address, setAddress] = useState(''); // State for user's address

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
        const stripe = await stripePromise;

        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cartItems, name, address }), // Include user details
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const { clientSecret } = await response.json();

            // Redirect to Checkout
            const { error } = await stripe.redirectToCheckout({ clientSecret });
            if (error) {
                console.error('Stripe error:', error);
                setError('Payment failed. Please try again.');
            } else {
                // Clear cart after successful payment
                localStorage.removeItem('cart');
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            setError('An error occurred. Please try again.');
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






