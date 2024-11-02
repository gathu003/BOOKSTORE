// ManageBooks.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import ManageBooks from './ManageBooks';

// Mocking the data that ManageBooks might receive
const mockBooks = [
    { id: 1, title: 'Book 1', author: 'Author 1', price: 10 },
    { id: 2, title: 'Book 2', author: 'Author 2', price: 15 },
];

jest.mock('./api', () => ({
    fetchBooks: jest.fn(() => Promise.resolve(mockBooks)), // Mock the API call
}));

describe('ManageBooks Component', () => {
    test('renders Manage Books and displays the book list', async () => {
        render(<ManageBooks />);

        // Check if the title is rendered
        const titleElement = screen.getByText(/manage books/i);
        expect(titleElement).toBeInTheDocument();

        // Check if the table headers are rendered
        expect(screen.getByText(/title/i)).toBeInTheDocument();
        expect(screen.getByText(/author/i)).toBeInTheDocument();
        expect(screen.getByText(/price/i)).toBeInTheDocument();
        expect(screen.getByText(/actions/i)).toBeInTheDocument();

        // Check if books are rendered
        expect(await screen.findByText(/book 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/author 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/10/i)).toBeInTheDocument();

        expect(await screen.findByText(/book 2/i)).toBeInTheDocument();
        expect(await screen.findByText(/author 2/i)).toBeInTheDocument();
        expect(await screen.findByText(/15/i)).toBeInTheDocument();

        // Check if action buttons are rendered
        expect(screen.getAllByText(/edit/i)).toHaveLength(2); // Two edit buttons
        expect(screen.getAllByText(/delete/i)).toHaveLength(2); // Two delete buttons
    });

    test('displays a message when no books are available', async () => {
        // Mocking an empty response
        jest.mock('./api', () => ({
            fetchBooks: jest.fn(() => Promise.resolve([])), // No books
        }));

        render(<ManageBooks />);

        expect(await screen.findByText(/no books available/i)).toBeInTheDocument();
    });
});

