"use client"
import React, { useState, useEffect, useContext } from 'react';
import { NavigationContext } from '@/components/NavigationContext'
import { CartContext } from './CartContext';

const ProductDetailsComponent = ({ product }) => {

    const { token, setToken, logout } = useContext(NavigationContext);
    const { products, cartItems, setCartItems } = useContext(CartContext);

    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
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

    const addToCart = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token.accessToken}`,
                },
                body: JSON.stringify({
                    productId: product.id,
                    quantity,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const message = await response.text();
            console.log(message);

            setCartItems([...cartItems, { ...product, quantity }]);
            
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-8 py-20 my-10 shadow-border rounded-3xl">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4 relative min-h-[256px] max-h-[512px]">
                <img src={`http://localhost:8080/api/products/image/${product.fileName}`} alt={product.name} className="category-product-img mt-10 w-300 h-300" />
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
                    <div className="mr-4 mt-4">
                        <span className="text-2xl font font-semibold">{`Cena: ${product.price} zł`}</span>
                    </div>
                    <div className="mt-10">
                        <span className="text-xl font-bold">Opis produktu:</span>
                        <p className="text-gray-800 text-md break-words mt-4">{product.description}</p>
                    </div>
                    <div className="flex -mx-2 mb-4 mt-20 gap-12 justify-center">
                        <div className="flex items-center">
                            <button onClick={decreaseQuantity} className="btn_dark_green rounded-l-full px-4">
                                -
                            </button>
                            <span className="bg-black px-2 py-2 text-white transition-all text-center w-8">{quantity}</span>
                            <button onClick={increaseQuantity} className="btn_dark_green rounded-r-full px-4">
                                +
                            </button>
                        </div>
                        <button onClick={addToCart} className="btn_dark_green rounded-full inline-flex items-center justify-center font-bold ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Dodaj do koszyka
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsComponent;
