// src/components/Book.js
import React from 'react';

const Book = ({ book }) => {
  const { cover, name, price, lastPrice, deal, rating } = book;

  // Function to generate star ratings
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={`bi ${i < rating ? 'bi-star-fill' : 'bi-star'} text-warning`}
        />
      );
    }
    return <div className="ratings">{stars}</div>;
  };

  return (
    <div className="book">
      <img src={cover} alt={name} />
      <h3>{name}</h3>
      <p>Price: ${price}</p>
      {deal && lastPrice && <p className="last-price">Last Price: ${lastPrice}</p>}
      {renderStars(rating)}
    </div>
  );
};

export default Book;
