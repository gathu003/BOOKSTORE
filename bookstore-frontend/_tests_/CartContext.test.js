// CartContext.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider, useCart } from './CartContext';

// A simple component to test the CartContext
const TestComponent = () => {
    const { state, dispatch } = useCart();

    return (
        <div>
            <button onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { id: 1, title: 'Test Book' } })}>
                Add Book
            </button>
            <button onClick={() => dispatch({ type: 'REMOVE_FROM_CART', payload: { id: 1 } })}>
                Remove Book
            </button>
            <button onClick={() => dispatch({ type: 'CLEAR_CART' })}>
                Clear Cart
            </button>
            <p>Items in Cart: {state.items.length}</p>
            <ul>
                {state.items.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </div>
    );
};

describe('CartContext', () => {
    test('should add an item to the cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByText('Add Book');
        fireEvent.click(addButton);

        expect(screen.getByText('Items in Cart: 1')).toBeInTheDocument();
        expect(screen.getByText('Test Book')).toBeInTheDocument();
    });

    test('should remove an item from the cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByText('Add Book');
        fireEvent.click(addButton);

        const removeButton = screen.getByText('Remove Book');
        fireEvent.click(removeButton);

        expect(screen.getByText('Items in Cart: 0')).toBeInTheDocument();
        expect(screen.queryByText('Test Book')).not.toBeInTheDocument();
    });

    test('should clear the cart', () => {
        render(
            <CartProvider>
                <TestComponent />
            </CartProvider>
        );

        const addButton = screen.getByText('Add Book');
        fireEvent.click(addButton);

        const clearButton = screen.getByText('Clear Cart');
        fireEvent.click(clearButton);

        expect(screen.getByText('Items in Cart: 0')).toBeInTheDocument();
        expect(screen.queryByText('Test Book')).not.toBeInTheDocument();
    });
});

