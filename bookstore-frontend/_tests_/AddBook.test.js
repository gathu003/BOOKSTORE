import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import AddBook from './AddBook';

describe('AddBook Component', () => {
    test('renders Add New Book form', () => {
        render(<AddBook />);

        const titleInput = screen.getByPlaceholderText(/book title/i);
        const authorInput = screen.getByPlaceholderText(/author name/i);
        const priceInput = screen.getByPlaceholderText(/price/i);
        const submitButton = screen.getByRole('button', { name: /add book/i });

        expect(titleInput).toBeInTheDocument();
        expect(authorInput).toBeInTheDocument();
        expect(priceInput).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    test('allows users to input book details and submit', () => {
        render(<AddBook />);

        const titleInput = screen.getByPlaceholderText(/book title/i);
        const authorInput = screen.getByPlaceholderText(/author name/i);
        const priceInput = screen.getByPlaceholderText(/price/i);
        const submitButton = screen.getByRole('button', { name: /add book/i });

        // Simulate user input
        fireEvent.change(titleInput, { target: { value: 'The Great Gatsby' } });
        fireEvent.change(authorInput, { target: { value: 'F. Scott Fitzgerald' } });
        fireEvent.change(priceInput, { target: { value: '10.99' } });

        // Check if inputs reflect the user input
        expect(titleInput.value).toBe('The Great Gatsby');
        expect(authorInput.value).toBe('F. Scott Fitzgerald');
        expect(priceInput.value).toBe('10.99');

        // Simulate form submission
        fireEvent.click(submitButton);

        // Check if inputs are cleared after submission
        expect(titleInput.value).toBe('');
        expect(authorInput.value).toBe('');
        expect(priceInput.value).toBe('');
        
        // Check for success message (assuming there is a success message shown after submission)
        const successMessage = screen.getByText(/book added successfully/i);
        expect(successMessage).toBeInTheDocument();
    });

    test('shows error message when required fields are empty', () => {
        render(<AddBook />);

        const submitButton = screen.getByRole('button', { name: /add book/i });

        // Simulate form submission without filling in the fields
        fireEvent.click(submitButton);

        // Check for error messages (assuming these messages exist)
        const errorMessage = screen.getByText(/please fill in all required fields/i);
        expect(errorMessage).toBeInTheDocument();
    });
});
