// Checkout.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from './Checkout';

// Mock localStorage
const mockLocalStorage = (() => {
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

// Mock Stripe
jest.mock('@stripe/stripe-js', () => ({
    loadStripe: jest.fn().mockResolvedValue({
        redirectToCheckout: jest.fn().mockResolvedValue({}),
    }),
}));

describe('Checkout Component', () => {
    const mockCart = [
        { id: 1, title: 'Book 1', price: 10 },
        { id: 2, title: 'Book 2', price: 15 },
    ];

    beforeEach(() => {
        window.localStorage.setItem('cart', JSON.stringify(mockCart));
    });

    afterEach(() => {
        window.localStorage.clear();
        jest.clearAllMocks(); // Clear any mock calls after each test
    });

    test('renders checkout with total price', () => {
        render(<Checkout />);

        // Check for the total price
        expect(screen.getByText(/total price: \$25.00/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /proceed to payment/i })).toBeEnabled();
    });

    test('handles successful checkout', async () => {
        render(<Checkout />);

        // Mock fetch response for checkout
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ clientSecret: 'test_client_secret' }),
            })
        );

        const checkoutButton = screen.getByRole('button', { name: /proceed to payment/i });
        fireEvent.click(checkoutButton);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith('/api/checkout', expect.any(Object));
            expect(fetch).toHaveBeenCalledTimes(1);
        });
    });

    test('handles checkout error', async () => {
        render(<Checkout />);

        // Mock fetch error response
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: false,
            })
        );

        const checkoutButton = screen.getByRole('button', { name: /proceed to payment/i });
        fireEvent.click(checkoutButton);

        await waitFor(() => {
            expect(screen.getByText(/an error occurred. please try again./i)).toBeInTheDocument();
        });
    });

    test('disables button if cart is empty', () => {
        window.localStorage.setItem('cart', JSON.stringify([])); // Clear cart
        render(<Checkout />);

        // Check that the button is disabled
        expect(screen.getByRole('button', { name: /proceed to payment/i })).toBeDisabled();
    });
});

