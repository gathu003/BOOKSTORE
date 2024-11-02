import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import BookList from './BookList';

// Mock axios
jest.mock('axios');

describe('BookList Component', () => {
    const booksData = [
        {
            id: 1,
            title: "Test Book 1",
            author: "Author 1",
            price: 10,
            description: "This is a test book 1.",
            coverImage: "http://example.com/test-book1-cover.jpg",
        },
        {
            id: 2,
            title: "Test Book 2",
            author: "Author 2",
            price: 15,
            description: "This is a test book 2.",
            coverImage: "http://example.com/test-book2-cover.jpg",
        },
    ];

    test('renders loading state initially', () => {
        render(
            <MemoryRouter>
                <BookList />
            </MemoryRouter>
        );

        // Check if loading message is displayed
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('fetches and displays book list', async () => {
        // Mock the API response
        axios.get.mockResolvedValueOnce({ data: booksData });

        render(
            <MemoryRouter>
                <BookList />
            </MemoryRouter>
        );

        // Wait for book list to be displayed
        await waitFor(() => {
            booksData.forEach((book) => {
                expect(screen.getByText(book.title)).toBeInTheDocument();
                expect(screen.getByText(book.description)).toBeInTheDocument();
            });
        });

        // Check if the cover images are displayed
        booksData.forEach((book) => {
            const img = screen.getByAltText(book.title);
            expect(img).toHaveAttribute('src', book.coverImage);
        });
    });

    test('handles API errors gracefully', async () => {
        // Mock a failed API call
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(
            <MemoryRouter>
                <BookList />
            </MemoryRouter>
        );

        // Wait for loading state to resolve and check for any error message
        await waitFor(() => {
            // Check for an error message in the UI
            const errorMessage = screen.getByText(/something went wrong/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test('displays a fallback message when no books are found', async () => {
        // Mock the API response to return an empty result
        axios.get.mockResolvedValueOnce({ data: [] });

        render(
            <MemoryRouter>
                <BookList />
            </MemoryRouter>
        );

        // Wait for loading state to resolve and check for fallback message
        await waitFor(() => {
            const fallbackMessage = screen.getByText(/no books available/i);
            expect(fallbackMessage).toBeInTheDocument();
        });
    });
});

