"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import InputField from '@/components/InputField';

const ActionButton = ({ iconSrc, altText, actionText, onClick }) => (
  <button className="flex items-center justify-center px-4 py-4 mb-2 bg-blue-500 text-white rounded-md focus:outline-none hover:font-bold w-full group"
    onClick={onClick}
  >
    <Image src={iconSrc} alt={altText} width={iconSrc === '/delete-icon.svg' ? 24 : 24} height={iconSrc === '/delete-icon.svg' ? 24 : 20} className="mr-2 transform group-hover:scale-110" />
    {actionText}
  </button>
);

const TextAreaField = ({ label, value, onChange, error, maxLength }) => (
  <div>
    <label>{label}</label>
    <textarea className="w-96 h-24" value={value} onChange={onChange} maxLength={maxLength} />
    {error && <div>{error}</div>}
  </div>
);

const InputFieldWithCounter = ({ label, value, onChange, error, maxLength }) => (
  <div>
    <TextAreaField label={`${label} (${value.length}/${maxLength})`} value={value} onChange={onChange} error={error} maxLength={maxLength} />
  </div>
);

const AdminPage = () => {

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [productNameError, setProductNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryIdError, setCategoryIdError] = useState("");

  const handleAddProductClick = () => {
    setIsAddProductOpen(!isAddProductOpen);
  }

  const handleEditProductClick = () => {
    setIsEditProductOpen(!isEditProductOpen);
  }

  const handleDeleteProductClick = () => {
    setIsDeleteProductOpen(!isDeleteProductOpen);
  }

  const validateForm = () => {
    let isValid = true;

    if (!categoryId) {
      setCategoryIdError("Category ID is required.");
      isValid = false;
    } else {
      setCategoryIdError("");
    }

    if (!productName) {
      setProductNameError("Product name is required.");
      isValid = false;
    } else if (!/^[A-Z]/.test(productName)) {
      setProductNameError("Product name must start with a capital letter.");
      isValid = false;
    } else {
      setProductNameError("");
    }

    if (!description) {
      setDescriptionError("Description is required.");
      isValid = false;
    } else if (description.length > 300) {
      setDescriptionError("Description must be 300 characters or less.");
      isValid = false;
    } else {
      setDescriptionError("");
    }

    if (!price) {
      setPriceError("Price is required.");
      isValid = false;
    } else if (!/^\d+(\.\d{1,2})?$/.test(price)) {
      setPriceError("Price must be a number with up to 2 decimal places.");
      isValid = false;
    } else {
      setPriceError("");
    }

    return isValid;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const product = {
      categoryId,
      name,
      description,
      price,
      //image,
    };

    const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      setProductId("");
      setCategoryId("");
      setProductName("");
      setDescription("");
      setPrice("");
      setImage("");
    } else {
      const errorData = await response.text();
      console.error('Error adding product:', errorData);
    }
  };

  return (
    <div className="flex justify-center space-x-40">
      <div className="flex flex-col items-center w-48">
        <h2 className="flex items-center text-2xl mb-4 group">
          <Image src="/product-icon.svg" alt="product" width={32} height={32} className="mr-2" />
          Products
        </h2>
        <ActionButton iconSrc="/plus-icon.svg" altText="plus" actionText="Add Product" onClick={handleAddProductClick} />
        {isAddProductOpen && (
          <form onSubmit={handleSubmit}>
            <InputField label="Category ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} error={categoryIdError} />
            <InputField label="Product Name" value={name} onChange={e => setProductName(e.target.value)} error={productNameError} />
            <InputFieldWithCounter label="Description" value={description} onChange={e => setDescription(e.target.value)} error={descriptionError} maxLength={300} />
            <InputField label="Price" value={price} onChange={e => setPrice(e.target.value)} error={priceError} />
            {/* <InputField label="Image" value={image} onChange={e => setImage(e.target.value)} /> */}
            <button type="submit">Submit</button>
          </form>
        )}
        <ActionButton iconSrc="/edit-icon.svg" altText="edit" actionText="Edit Product" />
        <ActionButton iconSrc="/delete-icon.svg" altText="delete" actionText="Delete Product" />
      </div>
    </div>
  );
};

export default AdminPage;