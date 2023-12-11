"use client"

import React, { useContext, useState, useEffect, use } from 'react'
import { CartContext } from '@/components/CartContext'
import InputField from '@/components/InputField'
import { NavigationContext } from '@/components/NavigationContext'

const OrderPage = () => {

    const { token } = useContext(NavigationContext);

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

    const [deliveryTypeError, setDeliveryTypeError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [streetError, setStreetError] = useState('');
    const [houseNumberError, setHouseNumberError] = useState('');
    const [postalCodeError, setPostalCodeError] = useState('');
    const [cityError, setCityError] = useState('');
    const [countryError, setCountryError] = useState('');

    const [firstNameTouched, setFirstNameTouched] = useState(false);

    const [isFormValid, setIsFormValid] = useState(false);

    const handleGoToPayment = async () => {
        if (!isFormValid) {
            alert('Please fill out the form correctly');
            return;
        }

        const orderRequest = {
            deliveryType,
            firstName,
            lastName,
            phoneNumber,
            street,
            houseNumber,
            postalCode,
            city,
            country,
        };

        const response = await fetch(`http://localhost:8080/api/orders/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token.accessToken}`,
            },
            body: JSON.stringify(orderRequest),
        });

        if (!response.ok) {
            const errorText = await response.text();
            alert('Failed to create order: ${errorText}');
            return;
        }

        const id = await response.text();

        const paymentResponse = await fetch(`http://localhost:8080/api/orders/process-payment/${id}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token.accessToken}`,
            },
        });

        if (paymentResponse.ok) {
            const chekoutUrl = await paymentResponse.text();
            window.location.href = chekoutUrl;
        } else {
            alert('Failed to process payment');
        }
    };

    const validateField = (value, setError, errorMessage, requireCapital = false) => {
        if (!value) {
            setError(errorMessage);
            return false;
        } else if (requireCapital && value[0] !== value[0].toUpperCase()) {
            setError('Must start with a capital letter');
            return false;
        } else {
            setError('');
            return true;
        }
    };

    const validateForm = () => {
        let isValid = true;

        isValid = validateField(deliveryType, setDeliveryTypeError, 'Delivery type is required') && isValid;
        isValid = validateField(firstName, setFirstNameError, 'First name is required', true) && isValid;
        isValid = validateField(lastName, setLastNameError, 'Last name is required', true) && isValid;
        isValid = validateField(phoneNumber, setPhoneNumberError, 'Phone number is required') && isValid;
        isValid = validateField(street, setStreetError, 'Street is required', true) && isValid;
        isValid = validateField(houseNumber, setHouseNumberError, 'House number is required') && isValid;
        isValid = validateField(postalCode, setPostalCodeError, 'Postal code is required') && isValid;
        isValid = validateField(city, setCityError, 'City is required', true) && isValid;
        isValid = validateField(country, setCountryError, 'Country is required', true) && isValid;

        return isValid;
    };

    useEffect(() => {
        setIsFormValid(validateForm());
    }, [deliveryType, firstName, lastName, phoneNumber, street, houseNumber, postalCode, city, country]);

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
                    <label htmlFor="deliveryType" className="block text-sm text-gray-700">Delivery Type</label>
                    <select value={deliveryType} onChange={e => setDeliveryType(e.target.value)} error={deliveryTypeError} className="border border-black rounded-lg p-3 w-full mb-4">
                        <option value="" hidden>Select delivery type</option>
                        <option value="Inpost">Inpost</option>
                        <option value="DPD">DPD</option>
                        <option value="FedEx">FedEx</option>
                        <option value="Poczta Polska">Poczta Polska</option>
                    </select>
                    <InputField label="First Name" value={firstName} onChange={e => setFirstName(e.target.value)} onBlur={() => setFirstNameTouched(true)} error={firstNameError} />
                    <InputField label="Last Name" value={lastName} onChange={e => setLastName(e.target.value)} error={lastNameError} />
                    <InputField label="Phone Number" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} error={phoneNumberError} />
                    <InputField label="Street" value={street} onChange={e => setStreet(e.target.value)} error={streetError} />
                    <InputField label="House Number" value={houseNumber} onChange={e => setHouseNumber(e.target.value)} error={houseNumberError} />
                    <InputField label="Postal Code" value={postalCode} onChange={e => setPostalCode(e.target.value)} error={postalCodeError} />
                    <InputField label="City" value={city} onChange={e => setCity(e.target.value)} error={cityError} />
                    <InputField label="Country" value={country} onChange={e => setCountry(e.target.value)} error={countryError} />
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
                    <div className="mt-10">
                        <span className="font-semibold text-xl">Total:</span> <span className="font-bold text-xl">{total} zł</span>
                        <button
                            onClick={handleGoToPayment}
                            type="submit"
                            className={`mt-6 py-4 w-full tracking-wide transition-colors duration-200 transform rounded-full ${isFormValid ? 'bg-black text-white hover:bg-[#383838]' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                            disabled={!isFormValid}
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