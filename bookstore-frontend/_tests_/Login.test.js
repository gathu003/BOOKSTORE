// Login.test.js

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from '../Login'; // Adjust the path if necessary
import axios from 'axios';

jest.mock('axios');

describe('Login Component', () => {
    const onLoginMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear(); // Clear localStorage before each test
    });

    const fillLoginForm = (email, password) => {
        fireEvent.change(screen.getByLabelText(/email/i), {
            target: { value: email },
        });
        fireEvent.change(screen.getByLabelText(/password/i), {
            target: { value: password },
        });
    };

    it('renders login form', () => {
        render(<Login onLogin={onLoginMock} />);
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    it('displays an error message on failed login', async () => {
        axios.post.mockRejectedValueOnce({ response: { data: { message: 'Login failed' } } });
        
        render(<Login onLogin={onLoginMock} />);
        
        fillLoginForm('testuser@example.com', 'wrongpassword');
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(screen.getByText(/login failed/i)).toBeInTheDocument();
        });
    });

    it('calls onLogin and saves token on successful login', async () => {
        axios.post.mockResolvedValueOnce({ data: { token: 'fake-token' } });
        
        render(<Login onLogin={onLoginMock} />);
        
        fillLoginForm('testuser@example.com', 'password1234');
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        await waitFor(() => {
            expect(onLoginMock).toHaveBeenCalledTimes(1);
            expect(localStorage.getItem('token')).toBe('fake-token');
        });
    });
});
