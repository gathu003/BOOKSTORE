// Homepage.test.js

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Homepage from './Homepage';

// Mocking the alert function before each test
beforeAll(() => {
    window.alert = jest.fn();
});

describe('Homepage Component', () => {
    test('renders Homepage with header and sections', () => {
        render(<Homepage />);

        // Check if the header title is rendered
        expect(screen.getByText(/bookstore/i)).toBeInTheDocument();

        // Check if navigation links are rendered
        expect(screen.getByText(/new releases/i)).toBeInTheDocument();
        expect(screen.getByText(/bestsellers/i)).toBeInTheDocument();
        expect(screen.getByText(/flash sales/i)).toBeInTheDocument();
        expect(screen.getByText(/favorite authors/i)).toBeInTheDocument();
    });

    test('allows users to search for books', () => {
        render(<Homepage />);

        const searchInput = screen.getByPlaceholderText(/search books.../i);
        fireEvent.change(searchInput, { target: { value: 'Book 1' } });

        // Check if only 'Book 1' is displayed in new releases
        expect(screen.getByText(/book 1/i)).toBeInTheDocument();
        expect(screen.queryByText(/book 2/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/book 3/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/book 4/i)).not.toBeInTheDocument();
    });

    test('adds books to the cart', () => {
        render(<Homepage />);

        const bookCard = screen.getByText(/book 1/i);
        fireEvent.click(bookCard);

        // Check if the cart count increases
        expect(screen.getByText(/🛒 1/i)).toBeInTheDocument();
    });

    test('handles newsletter subscription', () => {
        render(<Homepage />);

        const emailInput = screen.getByPlaceholderText(/enter your email/i);
        const subscribeButton = screen.getByText(/subscribe/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.click(subscribeButton);

        // Check for alert message
        expect(window.alert).toHaveBeenCalledWith("Thank you for subscribing!");
    });
});

