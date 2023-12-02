import React from 'react'

const InputField = ({ label, type, value, onChange, error }) => (
    <div className="mb-4">
        <label htmlFor={label} className="block text-sm text-gray-56">
            {label}
        </label>
        <input
            type={type}
            value={value}
            onChange={onChange}
            className="border border-black rounded-lg p-3 w-full"
        />
        {error && <p className="text-orange-500 text-sm">{error} ⚠️</p>}
    </div>
);

export default InputField