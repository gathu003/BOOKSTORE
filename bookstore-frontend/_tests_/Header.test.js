// Header.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing context
import Header from './Header';

describe('Header Component', () => {
    test('renders Header with title and navigation links', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        // Check if the title is rendered
        expect(screen.getByText(/bookstore/i)).toBeInTheDocument();

        // Check if navigation links are rendered
        const homeLink = screen.getByText(/home/i);
        const booksLink = screen.getByText(/books/i);

        expect(homeLink).toBeInTheDocument();
        expect(booksLink).toBeInTheDocument();

        // Check if the links are pointing to the correct routes
        expect(homeLink.closest('a')).toHaveAttribute('href', '/');
        expect(booksLink.closest('a')).toHaveAttribute('href', '/books');
    });
});

