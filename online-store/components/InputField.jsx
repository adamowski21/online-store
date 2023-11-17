import React from 'react'

const InputField = ({ label, type, value, onChange, error }) => (
    <div className="mb-4">
        <label htmlFor={label} className="block text-sm font-bold text-gray-56">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="block w-full px-4 py-2 mt-2 text-gray-56 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
        />
        {error && <p className="text-orange-500 text-sm">{error} ⚠️</p>}
    </div>
);

export default InputField