import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Products from './components/Products'; 
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import { CartProvider } from './context/CartContext';
import ProductDetails from './components/ProductDetails';
import ProductPage from './components/ProductPage';

function App() {
  const location = useLocation();
  const hideNavbarAndBanner = location.pathname.startsWith('/product/');

  return (
    <CartProvider>
      {!hideNavbarAndBanner && <Navbar />} 
      <Routes>
      
        <Route path="/" element={< Banner />} />
        <Route path="/" element={<Products />} />
        <Route path="/productPage" element={<ProductPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
    </CartProvider>
  );
}

export default App;
