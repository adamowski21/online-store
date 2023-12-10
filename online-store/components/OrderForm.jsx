import React from 'react'

const OrderForm = () => {
    return (
        <div className="flex">
            <form className="mr-4">
                <input type="email" name="email" placeholder="Email" onChange={handleChange} className="block mb-2" />
                <input type="text" name="firstName" placeholder="First Name" onChange={handleChange} className="block mb-2" />
                <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange} className="block mb-2" />
                <input type="text" name="phoneNumber" placeholder="Phone Number" onChange={handleChange} className="block mb-2" />
                <input type="text" name="deliveryType" placeholder="Delivery Type" onChange={handleChange} className="block mb-2" />
                <input type="text" name="street" placeholder="Street" onChange={handleChange} className="block mb-2" />
                <input type="text" name="houseNumber" placeholder="House Number" onChange={handleChange} className="block mb-2" />
                <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} className="block mb-2" />
                <input type="text" name="city" placeholder="City" onChange={handleChange} className="block mb-2" />
                <input type="text" name="country" placeholder="Country" onChange={handleChange} className="block mb-2" />
            </form>
        </div>
    )
}

export default OrderForm