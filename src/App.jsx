import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/Products";
import CartPage from "./components/ProductCard";
import Banner from "./components/Banner";

function App() {
  return (
    <>
      <Navbar />
      <Banner />
      <Products/>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
