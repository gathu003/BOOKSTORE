// Register.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Register from './Register';

// Mock axios
jest.mock('axios');

describe('Register Component', () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Clear mocks before each test
    });

    test('renders Register component', () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        // Check if the title is rendered
        expect(screen.getByText(/register/i)).toBeInTheDocument();
    });

    test('allows the user to fill out the form and submit', async () => {
        // Mock successful registration response
        axios.post.mockResolvedValueOnce({});

        render(
            <Router>
                <Register />
            </Router>
        );

        // Fill out the form fields
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Wait for the API call to be made and check the correct arguments were used
        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_API_URL}/api/register`, {
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
            });
        });
    });

    test('displays error message on registration failure', async () => {
        // Mock failed registration response
        axios.post.mockRejectedValueOnce({
            response: { data: { message: 'Email already exists' } }
        });

        render(
            <Router>
                <Register />
            </Router>
        );

        // Fill out the form fields
        fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        // Submit the form
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Wait for error message to be displayed
        await waitFor(() => {
            expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
        });
    });

    test('displays validation errors for empty fields', async () => {
        render(
            <Router>
                <Register />
            </Router>
        );

        // Submit the form without filling out fields
        fireEvent.click(screen.getByRole('button', { name: /register/i }));

        // Check for validation messages
        expect(await screen.findByText(/username is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
        expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    });
});

