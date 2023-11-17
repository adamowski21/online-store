"use client"
import Image from 'next/image';
import React, { useState } from 'react';

const ProductDetailsComponent = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const handleQuantityChange = (event) => {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(isNaN(newQuantity) ? 1 : newQuantity);
    };

    return (
        <div className="max-w-6xl mx-auto px-4 sm:px-12 lg:px-8 py-20">
            <div className="flex flex-col md:flex-row -mx-4">
                <div className="md:flex-1 px-4 relative min-h-[256px] max-h-[512px]">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill={true}
                        className="object-contain"
                    />
                </div>
                <div className="md:flex-1 px-4">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h2>
                    <div className="mr-4 mt-4">
                        <span className="category-product-price">{`Price: ${product.price} zł`}</span>
                    </div>
                    <div className="mt-10">
                        <span className="font-bold text-gray-800">Product Description:</span>
                        <p className="text-gray-600 text-md break-words mt-2">{product.description}</p>
                    </div>
                    <div className="flex -mx-2 mb-4 mt-20 gap-12">
                        <div className="flex items-center">
                            <button onClick={decreaseQuantity} className="btn_dark_green rounded-l-full px-4">
                                -
                            </button>
                            <span className="bg-black px-2 py-2 text-white transition-all text-center w-8">{quantity}</span>
                            <button onClick={increaseQuantity} className="btn_dark_green rounded-r-full px-4">
                                +
                            </button>
                        </div>
                        <button className="btn_dark_green rounded-full inline-flex items-center justify-center font-bold ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailsComponent;
