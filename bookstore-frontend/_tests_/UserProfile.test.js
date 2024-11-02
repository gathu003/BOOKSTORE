// UserProfile.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserProfile from './UserProfile';
import axios from 'axios';

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

// Mock axios
jest.mock('axios');

describe('UserProfile Component', () => {
    const mockToken = 'test_token';

    beforeEach(() => {
        // Set the token in localStorage before each test
        window.localStorage.setItem('token', mockToken);
    });

    afterEach(() => {
        // Clear localStorage after each test
        window.localStorage.clear();
        jest.clearAllMocks(); // Clear mocks
    });

    test('renders loading state', () => {
        render(<UserProfile />);
        expect(screen.getByText(/loading.../i)).toBeInTheDocument();
    });

    test('displays user profile on successful fetch', async () => {
        const mockUserProfile = { email: 'test@example.com', name: 'Test User' };
        axios.get.mockResolvedValueOnce({ data: mockUserProfile });

        render(<UserProfile />);

        // Wait for the user profile to be rendered
        await waitFor(() => {
            expect(screen.getByText(/User Profile/i)).toBeInTheDocument();
            expect(screen.getByText(/Profile Details/i)).toBeInTheDocument();
            expect(screen.getByText(/Email:/i)).toHaveTextContent(mockUserProfile.email);
            expect(screen.getByText(/Name:/i)).toHaveTextContent(mockUserProfile.name); // Additional field
        });
    });

    test('displays error message on fetch failure', async () => {
        const errorMessage = 'Failed to fetch user profile';
        axios.get.mockRejectedValueOnce(new Error(errorMessage));

        render(<UserProfile />);

        // Wait for the error message to be rendered
        await waitFor(() => {
            expect(screen.getByText(/error:/i)).toHaveTextContent(errorMessage);
        });
    });
});

