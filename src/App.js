import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StreamList from './pages/StreamList';
import Subscriptions from './pages/Subscriptions';
import Cart from './pages/Cart';
import CreditCard from './pages/CreditCard';
import Login from './pages/Login';
import About from './pages/About';
import list from './data';
import './App.css';

function App() {
  // Use sessionStorage so the login appears every time the app/tab is newly opened
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem('eztech_logged_in') === 'true';
  });

  // Load initial cart from LocalStorage or empty array
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('eztech_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [warning, setWarning] = useState('');

  // Save cart to LocalStorage whenever cart state updates
  useEffect(() => {
    localStorage.setItem('eztech_cart', JSON.stringify(cart));
  }, [cart]);

  // Handler to add item to cart with Subscription restriction check
  const handleAddToCart = (item) => {
    const isSubscription = item.service.toLowerCase().includes('subscription');
    const existingSub = cart.find((c) => c.service.toLowerCase().includes('subscription'));

    if (isSubscription && existingSub) {
      setWarning(`Warning: You can only add one subscription at a time. (${existingSub.service} is already in your cart).`);
      setTimeout(() => setWarning(''), 4000); // Clear warning after 4 seconds
      return;
    }

    // Check if item already exists in cart to increment quantity
    const existingItem = cart.find((c) => c.id === item.id);
    if (existingItem) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove item from cart
  const handleRemoveFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  // Update item quantity (minimum 1)
  const handleUpdateQuantity = (id, amount) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + amount;
          return newQty > 0 ? { ...item, quantity: newQty } : item;
        }
        return item;
      })
    );
  };

  // Total items count for Navbar badge
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        {isLoggedIn && <Navbar cartCount={totalCartCount} />}

        {warning && <div className="warning-banner">{warning}</div>}

        <Routes>
          <Route
            path="/login"
            element={!isLoggedIn ? <Login setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/" />}
          />

          <Route
            path="/"
            element={isLoggedIn ? <StreamList /> : <Navigate to="/login" />}
          />
          <Route
            path="/subscriptions"
            element={isLoggedIn ? <Subscriptions items={list} onAddToCart={handleAddToCart} /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={
              isLoggedIn ? (
                <Cart
                  cart={cart}
                  onRemove={handleRemoveFromCart}
                  onUpdateQty={handleUpdateQuantity}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/checkout" element={isLoggedIn ? <CreditCard /> : <Navigate to="/login" />} />
          <Route path="/about" element={isLoggedIn ? <About /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;