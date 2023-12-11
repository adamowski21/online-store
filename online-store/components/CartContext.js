"use client"

import React from 'react';
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  const [cartItems, setCartItems] = useState([]);


  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('http://localhost:8080/api/products');

      if (response.ok) {
        const products = await response.json();
        setProducts(products);
      } else {
        console.error('Error fetching products:', await response.text());
      }
    };
    // const localData = localStorage.getItem('cartItems');
    // setCartItems(JSON.parse(localData) || [])

    fetchProducts();
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('cartItems');
  };

  return (
    <CartContext.Provider value={{ products, cartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};