import { render, screen } from '@testing-library/react';
import App from './App';

test('renders welcome message', () => {
    render(<App />); // Just render App directly without MemoryRouter
    const welcomeMessage = screen.getByText(/Welcome to My Bookstore/i); // Regex to match the welcome message
    expect(welcomeMessage).toBeInTheDocument(); // Assert that the welcome message is in the document
});





