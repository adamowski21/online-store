"use client"

import React, { useState, useEffect, useContext } from 'react';
import { CartContext } from '@/components/CartContext';
import { NavigationContext } from '@/components/NavigationContext'
import Link from 'next/link';

const CartPage = () => {

  const { token, setToken, logout } = useContext(NavigationContext);
  const { products, cartItems, setCartItems } = useContext(CartContext);

  const totalPrice = cartItems.reduce((total, item) => total + item.productPrice * item.quantity, 0);

  const increaseQuantity = async (id) => {
    const response = await fetch(`http://localhost:8080/api/cart/addOne`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!response.ok) {
      throw new Error(`Error increasing quantity`);
    }

    setCartItems(cartItems.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = async (id) => {
    const response = await fetch(`http://localhost:8080/api/cart/removeOne`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!response.ok) {
      throw new Error(`Error decreasing quantity`);
    }

    setCartItems(cartItems.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  useEffect(() => {
    const fetchCartItems = async () => {

      if (!token) {
        return;
      }

      const response = await fetch(`http://localhost:8080/api/cart`, {
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error fetching cart items`);
      }

      const data = await response.json();

      setCartItems(data);
    };

    fetchCartItems();
  }, [token, setCartItems]);

  const removeFromCart = async (id) => {
    const response = await fetch(`http://localhost:8080/api/cart`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify({ productId: id }),
    });

    if (!response.ok) {
      throw new Error(`Error removing product from cart`);
    }

    const data = await response.text();

    console.log('Server response:', data);

    const cartResponse = await fetch('http://localhost:8080/api/cart', {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      },
    });

    if (!cartResponse.ok) {
      throw new Error(`Error fetching cart items`);
    }

    const updatedCartItems = await cartResponse.json();

    setCartItems(updatedCartItems);
  }


  return (
    <div className="flex justify-center min-h-screen mt-6">
      <div className="flex w-full max-w-4xl mx-auto">
        <div className="w-3/4">
          <h1 className="font-semibold text-3xl mb-6">Koszyk</h1>
          {cartItems && cartItems.map((product) => (
            <div key={product.id} className="flex items-center border-b mb-4 pb-4">
              <img src={`http://localhost:8080/api/products/image/${product.fileName}`} alt={product.name} className="mr-4 w-32 h-32" />
              <div className="flex-grow">
                <h2 className="font-bold">{product.productName}</h2>
                <p>Cena: {product.productPrice}</p>
                <p>Ilość: {product.quantity}</p>
                <div className="flex -mx-2 mt-3 gap-12 justify-end mr-10">
                  <div className="flex items-center gap-10">
                    <div className="flex items-center">
                      <button onClick={() => decreaseQuantity(product.id)} className="btn_dark_green rounded-l-full px-4">
                        -
                      </button>
                      <span className="bg-black px-2 py-2 text-white transition-all text-center w-8">{product.quantity}</span>
                      <button onClick={() => increaseQuantity(product.id)} className="btn_dark_green rounded-r-full px-4">
                        +
                      </button>
                    </div>
                    <button onClick={() => removeFromCart(product.id)} className="flex items-center justify-center py-2 px-2 bg-red-600 rounded focus:outline-none hover:font-bold group flex-shrink-0">
                      <img src="/delete-icon.svg" alt="delete" width={24} height={24} className="transform group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ml-12 w-1/4">
          <h2 className="font-semibold text-3xl border-b mb-4 pb-4">Podsumowanie</h2>
          <div className="flex justify-between border-b pb-4">
            <p className="font-semibold">Suma:</p>
            <p className="font-bold">{totalPrice.toFixed(2)} zł</p>
          </div>
          <Link href="/order">
            <button className="mt-6 py-4 w-full tracking-wide text-white transition-colors duration-200 transform bg-black rounded-full hover:bg-[#383838]">
              Złóż zamówienie
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
