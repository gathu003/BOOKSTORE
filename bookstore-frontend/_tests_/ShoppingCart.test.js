// ShoppingCart.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';

// Mock localStorage
const mockLocalStorage = (function() {
    let store = {};
    return {
        getItem: (key) => store[key] || null,
        setItem: (key, value) => store[key] = value,
        removeItem: (key) => delete store[key],
        clear: () => { store = {}; },
    };
})();

Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
});

describe('ShoppingCart Component', () => {
    beforeEach(() => {
        // Set up initial cart items in local storage
        const initialCart = [
            { id: 1, title: 'Book 1', price: 10, quantity: 1 },
            { id: 2, title: 'Book 2', price: 15, quantity: 2 },
        ];
        window.localStorage.setItem('cart', JSON.stringify(initialCart));
    });

    afterEach(() => {
        window.localStorage.clear();
    });

    test('renders loading state initially', () => {
        render(<ShoppingCart />);
        expect(screen.getByText(/loading cart items/i)).toBeInTheDocument();
    });

    test('renders cart items correctly', async () => {
        render(<ShoppingCart />);

        // Wait for loading state to finish and check for cart items
        await waitFor(() => {
            expect(screen.getByText(/shopping cart/i)).toBeInTheDocument();
            expect(screen.getByText(/book 1/i)).toBeInTheDocument();
            expect(screen.getByText(/book 2/i)).toBeInTheDocument();
        });

        // Check total price calculation
        expect(screen.getByText(/total price: \$40.00/i)).toBeInTheDocument();
    });

    test('removes an item from the cart', async () => {
        render(<ShoppingCart />);

        await waitFor(() => {
            const removeButton = screen.getAllByRole('button', { name: /remove/i })[0];
            fireEvent.click(removeButton);
        });

        // Check if the item is removed
        expect(screen.queryByText(/book 1/i)).not.toBeInTheDocument();
        expect(screen.getByText(/book 2/i)).toBeInTheDocument();
        expect(screen.getByText(/total price: \$30.00/i)).toBeInTheDocument(); // New total price
    });

    test('clears the cart', async () => {
        render(<ShoppingCart />);

        await waitFor(() => {
            const clearCartButton = screen.getByRole('button', { name: /clear cart/i });
            fireEvent.click(clearCartButton);
        });

        // Check if the cart is empty
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.getByText(/total price: \$0.00/i)).toBeInTheDocument();
    });

    test('handles checkout action', async () => {
        window.alert = jest.fn(); // Mock alert function

        render(<ShoppingCart />);
        
        await waitFor(() => {
            const checkoutButton = screen.getByRole('button', { name: /checkout/i });
            fireEvent.click(checkoutButton);
        });

        // Check if alert is called on checkout
        expect(window.alert).toHaveBeenCalledWith('Proceeding to checkout...');
    });
});

