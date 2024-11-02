import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Make sure Tailwind CSS is imported in this file
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CartProvider } from './context/CartContext'; // Import CartProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider> {/* Wrap App with CartProvider */}
      <App />
    </CartProvider>
  </React.StrictMode>
);

// Performance measuring function (optional)
reportWebVitals();


