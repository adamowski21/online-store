"use client";

import React, { useState } from 'react';
import Image from 'next/image';

const ActionButton = ({ iconSrc, altText, actionText }) => (
  <button className="flex items-center justify-center px-4 py-4 mb-2 bg-blue-500 text-white rounded-md focus:outline-none hover:font-bold w-full group">
    <Image src={iconSrc} alt={altText} width={iconSrc === '/delete-icon.svg' ? 24 : 24} height={iconSrc === '/delete-icon.svg' ? 24 : 20} className="mr-2 transform group-hover:scale-110" />
    {actionText}
  </button>
);

const AdminPage = () => {
  const [showCategoryOptions, setShowCategoryOptions] = useState(false);
  const [showProductOptions, setShowProductOptions] = useState(false);

  return (
    <div className="flex justify-center space-x-40">
      <div className="flex flex-col items-center w-48">
        <h2
          className="flex items-center text-2xl mb-4 cursor-pointer hover:font-semibold group"
          onClick={() => setShowCategoryOptions(!showCategoryOptions)}
        >
          <Image src="/category-icon.svg" alt="category" width={32} height={32} className="mr-2 transform group-hover:scale-110" />
          Categories
        </h2>
        {showCategoryOptions && (
          <>
            <ActionButton iconSrc="/plus-icon.svg" altText="plus" actionText="Add Category" />
            <ActionButton iconSrc="/edit-icon.svg" altText="edit" actionText="Edit Category" />
            <ActionButton iconSrc="/delete-icon.svg" altText="delete" actionText="Delete Category" />
          </>
        )}
      </div>
      <div className="flex flex-col items-center w-48">
        <h2
          className="flex items-center text-2xl mb-4 cursor-pointer hover:font-semibold group"
          onClick={() => setShowProductOptions(!showProductOptions)}
        >
          <Image src="/product-icon.svg" alt="product" width={32} height={32} className="mr-2 transform group-hover:scale-110" />
          Products
        </h2>
        {showProductOptions && (
          <>
            <ActionButton iconSrc="/plus-icon.svg" altText="plus" actionText="Add Product" />
            <ActionButton iconSrc="/edit-icon.svg" altText="edit" actionText="Edit Product" />
            <ActionButton iconSrc="/delete-icon.svg" altText="delete" actionText="Delete Product" />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminPage;