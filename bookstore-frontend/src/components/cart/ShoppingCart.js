// src/components/ShoppingCart.js
import React, { useEffect, useState } from 'react';
import { Container, Button, ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './ShoppingCart.css'; // Import the CSS file for styling

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();

    // Fetch cart items from localStorage on component mount
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Retrieved cart items from localStorage:', storedCart);
        setCartItems(storedCart);
    }, []);

    // Remove item from cart and update localStorage
    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // Calculate total price of items in the cart
    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    // Handle checkout navigation
    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <Container className="shopping-cart-container mt-5">
            <h1 className="text-center">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <>
                    <ListGroup>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.id} className="d-flex justify-content-between align-items-center cart-item">
                                <div>
                                    <h5>{item.title}</h5>
                                    <p>Price: ${item.price.toFixed(2)} (Qty: {item.quantity})</p>
                                </div>
                                <Button variant="danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                    <div className="mt-3 text-center">
                        <h4>Total Price: ${calculateTotalPrice()}</h4>
                        <Button variant="success" onClick={handleCheckout}>
                            Proceed to Checkout
                        </Button>
                    </div>
                </>
            )}
        </Container>
    );
};

export default ShoppingCart;








