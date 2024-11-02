import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';

describe('AdminDashboard Component', () => {
    test('renders Admin Dashboard with navigation links', () => {
        render(
            <Router>
                <AdminDashboard />
            </Router>
        );

        // Check if the title is rendered
        const titleElement = screen.getByText(/admin dashboard/i);
        expect(titleElement).toBeInTheDocument();

        // Check if the welcome message is rendered
        const welcomeMessage = screen.getByText(/welcome to the admin panel/i);
        expect(welcomeMessage).toBeInTheDocument();

        // Check if navigation links are rendered
        const addBookLink = screen.getByRole('link', { name: /add book/i });
        const manageBooksLink = screen.getByRole('link', { name: /manage books/i });
        expect(addBookLink).toBeInTheDocument();
        expect(manageBooksLink).toBeInTheDocument();
    });

    test('navigates to Add Book page when Add Book link is clicked', () => {
        render(
            <Router>
                <AdminDashboard />
            </Router>
        );

        const addBookLink = screen.getByRole('link', { name: /add book/i });
        fireEvent.click(addBookLink);

        // Verify the expected behavior after navigation
        // This can depend on how your routing is set up. 
        // For example, you might check for the presence of a form or a title on the Add Book page.
        const addBookTitle = screen.getByText(/add new book/i); // Adjust based on your actual content
        expect(addBookTitle).toBeInTheDocument();
    });

    test('navigates to Manage Books page when Manage Books link is clicked', () => {
        render(
            <Router>
                <AdminDashboard />
            </Router>
        );

        const manageBooksLink = screen.getByRole('link', { name: /manage books/i });
        fireEvent.click(manageBooksLink);

        // Verify the expected behavior after navigation
        const manageBooksTitle = screen.getByText(/manage your books/i); // Adjust based on your actual content
        expect(manageBooksTitle).toBeInTheDocument();
    });
});

