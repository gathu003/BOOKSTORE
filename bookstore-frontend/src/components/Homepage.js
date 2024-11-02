import React, { useState, useEffect } from 'react';
import './Homepage.css';

const Homepage = () => {
    // State for search input and filtered books
    const [searchTerm, setSearchTerm] = useState("");
    const [cartCount, setCartCount] = useState(0);
    const [timeLeft, setTimeLeft] = useState(3600); // Set flash sale countdown in seconds

    // Book data
    const books = [
        { id: 1, title: "Book 1" },
        { id: 2, title: "Book 2" },
        { id: 3, title: "Book 3" },
        { id: 4, title: "Book 4" },
    ];

    // Filter books based on search term
    const filteredBooks = books.filter((book) =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Countdown Timer for Flash Sales
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Function to handle adding to cart
    const addToCart = () => {
        setCartCount(cartCount + 1);
    };

    // Function to handle subscription (simple alert)
    const handleSubscribe = () => {
        alert("Thank you for subscribing!");
    };

    return (
        <div className="homepage">
            {/* Header */}
            <header className="header">
                <div className="logo">BOOKSTORE</div>
                <nav className="nav-links">
                    <a href="#new-releases">New Releases</a>
                    <a href="#bestsellers">Bestsellers</a>
                    <a href="#flash-sales">Flash Sales</a>
                    <a href="#authors">Favorite Authors</a>
                </nav>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="icons">
                    <span className="icon cart">🛒 {cartCount}</span>
                    <span className="icon profile">👤</span>
                </div>
            </header>

            {/* New Releases Section */}
            <section id="new-releases" className="new-releases">
                <h2>New Releases</h2>
                <div className="book-grid">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="book-card" onClick={addToCart}>
                            {book.title}
                        </div>
                    ))}
                </div>
            </section>

            {/* Bestsellers Section */}
            <section id="bestsellers" className="bestsellers">
                <h2>Bestsellers</h2>
                <div className="book-grid">
                    {books.map((book) => (
                        <div key={book.id} className="book-card" onClick={addToCart}>
                            {book.title}
                        </div>
                    ))}
                </div>
            </section>

            {/* Flash Sales Section */}
            <section id="flash-sales" className="flash-sales">
                <h2>Flash Sales</h2>
                <p>Sale ends in: {formatTime(timeLeft)}</p>
                <div className="book-grid">
                    {books.slice(0, 3).map((book) => (
                        <div key={book.id} className="book-card" onClick={addToCart}>
                            {book.title}
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="newsletter">
                    <h3>Join Our Newsletter</h3>
                    <input type="email" placeholder="Enter your email" />
                    <button onClick={handleSubscribe}>Subscribe</button>
                </div>
                <div className="quick-links">
                    <a href="#">Contact Us</a>
                    <a href="#">Privacy Policy</a>
                </div>
                <div className="social-media">
                    <span>📘</span>
                    <span>🐦</span>
                    <span>📸</span>
                </div>
            </footer>
        </div>
    );
};

export default Homepage;


