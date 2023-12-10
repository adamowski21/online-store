"use client"

import React, { useContext, useState } from 'react'
import { CartContext } from '@/components/CartContext'

const OrderPage = () => {

    const { cartItems } = useContext(CartContext)

    return (
            <div>
                <h1 className="font-semibold text-2xl mb-6">Ordered products:</h1>
                {cartItems && cartItems.map((product) => (
                    <div key={product.id} className="mb-4 border-b max-w-xs">
                        <h2>{product.productName}</h2>
                        <img src={`http://localhost:8080/api/products/image/${product.fileName}`} className="w-24 h-24" />
                        <p>Quantity: {product.quantity}</p>
                        <p>Price: {product.productPrice}</p>
                    </div>
                ))}
            </div>
    );
}

export default OrderPage