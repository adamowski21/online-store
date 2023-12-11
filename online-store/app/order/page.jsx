"use client"

import React, { useContext, useState, useEffect, use } from 'react'
import { CartContext } from '@/components/CartContext'
import InputField from '@/components/InputField'
import { NavigationContext } from '@/components/NavigationContext'

const OrderPage = () => {

    //const { token } = useContext(NavigationContext);

    //const { cartItems } = useContext(CartContext)
    const [cartItems, setCartItems] = useState([]);

    const [deliveryType, setDeliveryType] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [street, setStreet] = useState('');
    const [houseNumber, setHouseNumber] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');

    const total = cartItems.reduce((acc, item) => acc + item.productPrice * item.quantity, 0);

    useEffect(() => {
        const tokenString = localStorage.getItem('authToken');
        const token = JSON.parse(tokenString);
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
    }, [])

    return (
        <div className="flex justify-center mt-10">
            <div className="flex gap-20">
                <form>
                    <select value={deliveryType} onChange={e => setDeliveryType(e.target.value)} className="border border-black rounded-lg p-3 w-full mb-4">
                        <option value="" hidden>Select delivery type</option>
                        <option value="Inpost">Inpost</option>
                        <option value="DPD">DPD</option>
                        <option value="FedEx">FedEx</option>
                        <option value="Poczta Polska">Poczta Polska</option>
                    </select>
                    <InputField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} className="w-1/2" />
                    <InputField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} />
                    <InputField label="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    <InputField label="Street" value={street} onChange={e => setStreet(e.target.value)} />
                    <InputField label="House Number" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} />
                    <InputField label="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                    <InputField label="City" value={city} onChange={e => setCity(e.target.value)} />
                    <InputField label="Country" value={country} onChange={e => setCountry(e.target.value)} />
                </form>
                <div>
                    <h1 className="font-semibold text-2xl mb-6">Ordered products:</h1>
                    {cartItems && cartItems.map((product) => (
                        <div key={product.id} className="mb-4 border-b max-w-xs">
                            <h2>{product.productName}</h2>
                            <img src={`http://localhost:8080/api/products/image/${product.fileName}`} className="w-24 h-24 my-2" />
                            <p>Quantity: {product.quantity}</p>
                            <span>Price: {product.productPrice * product.quantity} zł </span>
                            <span className="text-sm">({product.productPrice} zł each one)</span>
                        </div>
                    ))}
                    <div>
                        <span className="font-semibold text-xl">Total:</span> <span className="font-bold text-xl">{total}</span>
                        <button
                            className="mt-6 py-4 w-full tracking-wide text-white transition-colors duration-200 transform bg-black rounded-full hover:bg-[#383838]"
                        >
                            Go to payment
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderPage