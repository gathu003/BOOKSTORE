import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import BookDetail from './BookDetail';

// Mock axios
jest.mock('axios');

describe('BookDetail Component', () => {
    const bookData = {
        id: 1,
        title: "Test Book",
        author: "Test Author",
        price: 20,
        description: "This is a test book.",
        coverImage: "http://example.com/test-book-cover.jpg",
    };

    test('renders loading state initially', () => {
        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Check if loading message is displayed
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('fetches and displays book details', async () => {
        // Mock the API response
        axios.get.mockResolvedValueOnce({ data: bookData });

        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Wait for book details to be displayed
        await waitFor(() => {
            expect(screen.getByText(bookData.title)).toBeInTheDocument();
            expect(screen.getByText(`Author: ${bookData.author}`)).toBeInTheDocument();
            expect(screen.getByText(`Price: $${bookData.price}`)).toBeInTheDocument();
            expect(screen.getByText(bookData.description)).toBeInTheDocument();
        });

        // Check if the cover image is displayed
        const img = screen.getByAltText(bookData.title);
        expect(img).toHaveAttribute('src', bookData.coverImage);
    });

    test('handles API errors gracefully', async () => {
        // Mock a failed API call
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Wait for loading state to resolve
        await waitFor(() => {
            // Optionally, you can check for an error message if your component handles errors
            const errorMessage = screen.getByText(/something went wrong/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test('displays a fallback message when no book details are found', async () => {
        // Mock the API response to return an empty result
        axios.get.mockResolvedValueOnce({ data: {} });

        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Wait for loading state to resolve and check for the fallback message
        await waitFor(() => {
            const fallbackMessage = screen.getByText(/no book details available/i);
            expect(fallbackMessage).toBeInTheDocument();
        });
    });
});
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router, MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import BookDetail from './BookDetail';

// Mock axios
jest.mock('axios');

describe('BookDetail Component', () => {
    const bookData = {
        id: 1,
        title: "Test Book",
        author: "Test Author",
        price: 20,
        description: "This is a test book.",
        coverImage: "http://example.com/test-book-cover.jpg",
    };

    test('renders loading state initially', () => {
        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Check if loading message is displayed
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('fetches and displays book details', async () => {
        // Mock the API response
        axios.get.mockResolvedValueOnce({ data: bookData });

        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Wait for book details to be displayed
        await waitFor(() => {
            expect(screen.getByText(bookData.title)).toBeInTheDocument();
            expect(screen.getByText(`Author: ${bookData.author}`)).toBeInTheDocument();
            expect(screen.getByText(`Price: $${bookData.price}`)).toBeInTheDocument();
            expect(screen.getByText(bookData.description)).toBeInTheDocument();
        });

        // Check if the cover image is displayed
        const img = screen.getByAltText(bookData.title);
        expect(img).toHaveAttribute('src', bookData.coverImage);
    });

    test('handles API errors gracefully', async () => {
        // Mock a failed API call
        axios.get.mockRejectedValueOnce(new Error('Failed to fetch'));

        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Wait for loading state to resolve
        await waitFor(() => {
            // Optionally, you can check for an error message if your component handles errors
            const errorMessage = screen.getByText(/something went wrong/i);
            expect(errorMessage).toBeInTheDocument();
        });
    });

    test('displays a fallback message when no book details are found', async () => {
        // Mock the API response to return an empty result
        axios.get.mockResolvedValueOnce({ data: {} });

        render(
            <MemoryRouter initialEntries={['/books/1']}>
                <BookDetail />
            </MemoryRouter>
        );

        // Wait for loading state to resolve and check for the fallback message
        await waitFor(() => {
            const fallbackMessage = screen.getByText(/no book details available/i);
            expect(fallbackMessage).toBeInTheDocument();
        });
    });
});

