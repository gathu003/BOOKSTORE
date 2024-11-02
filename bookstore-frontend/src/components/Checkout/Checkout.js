import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY'); // Replace with your actual Stripe public key

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [error, setError] = useState(null); // State for error messages

    useEffect(() => {
        const fetchCartItems = () => {
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(storedCart);
            calculateTotalPrice(storedCart);
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.price, 0);
        setTotalPrice(total);
    };

    const handleCheckout = async () => {
        const stripe = await stripePromise;

        try {
            // Call your backend to create a payment intent
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ items: cartItems }),
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const { clientSecret } = await response.json();

            // Redirect to Checkout
            const { error } = await stripe.redirectToCheckout({ clientSecret });
            if (error) {
                console.error('Stripe error:', error);
                setError('Payment failed. Please try again.'); // Set error message
            }
        } catch (error) {
            console.error('Error during checkout:', error);
            setError('An error occurred. Please try again.'); // Set error message
        }
    };

    return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
            <h1>Checkout</h1>
            {error && <div style={{ color: 'red' }}>{error}</div>} {/* Display error message */}
            <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
            <button 
                onClick={handleCheckout} 
                disabled={cartItems.length === 0}
                style={{ padding: '10px 20px', fontSize: '16px' }}>
                Proceed to Payment
            </button>
        </div>
    );
};

export default Checkout;


