"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const Page = () => {

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Item 1', price: 100, quantity: 1, imageUrl: 'https://www.kasandbox.org/programming-images/avatars/spunky-sam.png' },
    { id: 2, name: 'Item 2', price: 200, quantity: 2, imageUrl: 'https://www.kasandbox.org/programming-images/avatars/spunky-sam-green.png' },
    { id: 3, name: 'Item 3', price: 300, quantity: 3, imageUrl: 'https://www.kasandbox.org/programming-images/avatars/primosaur-tree.png' },
  ]);

  const [quantity, setQuantity] = useState(1);

  const decreaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
      )
    );
  };

  const increaseQuantity = (id) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="flex justify-center min-h-screen mt-6">
      <div className="flex w-full max-w-4xl mx-auto">
        <div className="w-3/4">
          <h1 className="font-semibold text-3xl mb-6">Cart</h1>
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b mb-4 pb-4">
              <img src={item.imageUrl} alt={item.name} className="mr-4" />
              <div className="flex-grow">
                <h2 className="font-bold">{item.name}</h2>
                <p>Price: {item.price}</p>
                <div className="flex -mx-2 mt-3 gap-12 justify-end mr-10">
                  <div className="flex items-center gap-10">
                    <div className="flex items-center">
                      <button onClick={() => decreaseQuantity(item.id)} className="btn_dark_green rounded-l-full px-4">
                        -
                      </button>
                      <span className="bg-black px-2 py-2 text-white transition-all text-center w-8">{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.id)} className="btn_dark_green rounded-r-full px-4">
                        +
                      </button>
                    </div>
                    <button className="flex items-center justify-center py-2 px-2 bg-red-600 rounded focus:outline-none hover:font-bold group flex-shrink-0">
                      <Image src="/delete-icon.svg" alt="delete" width={24} height={24} className="transform group-hover:scale-110" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="ml-12 w-1/4">
          <h2 className="font-semibold text-3xl border-b mb-4 pb-4">Summary</h2>
          <div className="flex justify-between border-b pb-4">
            <p>Total:</p>
            <p>{totalPrice}</p>
          </div>
          <button className="mt-6 py-4 w-full tracking-wide text-white transition-colors duration-200 transform bg-black rounded-full hover:bg-[#383838]">
            Place an order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;