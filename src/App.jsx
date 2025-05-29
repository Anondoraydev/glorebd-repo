import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import Navbar from './components/Navbar';
import { CartProvider } from './context/CartContext';
import ProductDetails from './components/ProductDetails'

function App() {
  return (
    <CartProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        

      </Routes>
    </CartProvider>
  );
}

export default App;