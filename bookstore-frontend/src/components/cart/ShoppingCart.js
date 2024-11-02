import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = () => {
            // Fetch cart items from local storage
            const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
            setCartItems(storedCart);
            calculateTotalPrice(storedCart);
            setLoading(false);
        };

        fetchCartItems();
    }, []);

    const calculateTotalPrice = (items) => {
        const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0); // Consider quantity
        setTotalPrice(total);
    };

    const handleRemoveFromCart = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        calculateTotalPrice(updatedCart);
    };

    const handleClearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
        setTotalPrice(0);
    };

    const handleCheckout = () => {
        // Implement checkout logic here, possibly send cart items to your server
        alert('Proceeding to checkout...');
    };

    if (loading) {
        return <p>Loading cart items...</p>;
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center">Your cart is empty.</p>
            ) : (
                <>
                    <ul className="list-group mb-4">
                        {cartItems.map(item => (
                            <li className="list-group-item d-flex justify-content-between align-items-center" key={item.id}>
                                <div>
                                    <h5>{item.title}</h5>
                                    <p>Price: ${item.price.toFixed(2)} (Qty: {item.quantity})</p>
                                </div>
                                <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                    <button className="btn btn-warning" onClick={handleClearCart}>Clear Cart</button>
                </>
            )}
            <h2 className="text-center">Total Price: ${totalPrice.toFixed(2)}</h2>
            {cartItems.length > 0 && (
                <div className="text-center">
                    <button className="btn btn-success mt-3" onClick={handleCheckout}>Checkout</button>
                </div>
            )}
        </div>
    );
};

export default ShoppingCart;



