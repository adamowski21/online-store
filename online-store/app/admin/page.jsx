"use client";

import React, { useState, useContext, useRef } from 'react';
import Image from 'next/image';
import InputField from '@/components/InputField';
import InputFieldWithCounter from '@/components/InputFieldWithCounter';
import Dialog from '@/components/Dialog';
import { NavigationContext } from '@/components/NavigationContext'

const ActionButton = ({ iconSrc, altText, actionText, onClick }) => (
  <button className="flex items-center justify-center px-4 py-4 mb-2 bg-blue-500 text-white rounded-md focus:outline-none hover:font-bold w-44 group"
    onClick={onClick}
  >
    <Image src={iconSrc} alt={altText} width={24} height={24} className="mr-2 transform group-hover:scale-110" />
    {actionText}
  </button>
);

const AdminPage = () => {

  const { token, setToken, logout } = useContext(NavigationContext);

  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isEditProductOpen, setIsEditProductOpen] = useState(false);
  const [isDeleteProductConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isProductToEditSelected, setIsProductToEditSelected] = useState(false);

  const [isDeleteUserConfirmationOpen, setIsDeleteUserConfirmationOpen] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  //const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [id, setId] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryIdError, setCategoryIdError] = useState("");

  const [message, setMessage] = useState("");

  const [products, setProducts] = useState([]);

  const [users, setUsers] = useState([]);

  const inputImageRef = useRef();

  const resetForm = () => {
    setId("");
    setCategoryId("");
    setName("");
    setDescription("");
    setPrice("");
    //setImage("");
  };

  const displayMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };

  const handleAddProductClick = () => {
    resetForm();
    setIsAddProductOpen(!isAddProductOpen);
    setIsProductToEditSelected(false);
    setIsEditProductOpen(false);
  };

  const handleEditProductClick = () => {
    fetchProducts();
    setIsEditProductOpen(!isEditProductOpen);
    setIsAddProductOpen(false);
  };

  const handleDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);
  };

  const handleCancelDelete = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteProductConfirmed = () => {
    handleDeleteProduct(productIdToDelete);
    setIsDeleteConfirmationOpen(false);
  };

  const validateForm = () => {
    let isValid = true;

    if (!categoryId) {
      setCategoryIdError("Category ID is required.");
      isValid = false;
    } else {
      setCategoryIdError("");
    }

    if (!name) {
      setNameError("Product name is required.");
      isValid = false;
    } else if (!/^[A-Z]/.test(name)) {
      setNameError("Product name must start with a capital letter.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (!description) {
      setDescriptionError("Description is required.");
      isValid = false;
    } else if (!/^[A-Z]/.test(description)) {
      setDescriptionError("Description must start with a capital letter.");
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
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.set('name', name);
    data.set('description', description);
    data.set('categoryId', categoryId);
    data.set('image', inputImageRef.current.files[0]);

    const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: data,
    });

    if (response.ok) {
      resetForm();
      setMessage("Product added successfully!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } else {
      const errorData = await response.text();
      console.error('Error adding product:', errorData);
    }
  };

  const fetchProducts = async () => {
    const response = await fetch('http://localhost:8080/api/products', {
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      },
    });

    if (response.ok) {
      const products = await response.json();
      setProducts(products);
    } else {
      console.error('Error fetching products:', await response.text());
    }
  }

  const handleEditProduct = async (name) => {

    const productToEdit = products.find(product => product.name === name);
    setId(productToEdit.id);
    setCategoryId(productToEdit.categoryId);
    setName(productToEdit.name);
    setDescription(productToEdit.description);
    setPrice(productToEdit.price);

    setIsProductToEditSelected(true);

    setIsEditProductOpen(false);

    console.log(productToEdit);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const product = {
      id,
      categoryId,
      name,
      description,
      price,
    };

    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(product),
    });

    if (response.ok) {
      resetForm();
      displayMessage("Product edited successfully!");
    } else {
      const errorData = await response.text();
      console.error('Error editing product:', errorData);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
        },
      });

      if (response.ok) {
        fetchProducts();
        setIsDeleteConfirmationOpen(false);

        displayMessage("Product deleted successfully!");
      } else {
        const errorData = await response.text();
        console.error('Error deleting product:', errorData);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleGetAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/users', {
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
        },
      });

      if (response.ok) {
        const fetchedUsers = await response.json();
        setUsers(fetchedUsers);
      } else {
        console.error('Error fetching users:', await response.text());
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      setUserIdToDelete(id);
      setIsDeleteUserConfirmationOpen(true);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleDeleteUserConfirmed = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/${userIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
        },
      });

      if (response.ok) {
        handleGetAllUsers();

        displayMessage("User deleted successfully!");
      } else {
        const errorData = await response.text();
        console.error('Error deleting user:', errorData);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsDeleteUserConfirmationOpen(false);
      setUserIdToDelete(null);
    }
  };

  return (
    <div className="flex justify-center space-x-10">
      <div className="flex flex-col items-center w-1/2">
        <h2 className="flex items-center text-2xl mb-4 group">
          <Image src="/product-icon.svg" alt="product" width={32} height={32} className="mr-2" />
          Products
        </h2>
        <ActionButton iconSrc="/plus-icon.svg" altText="plus" actionText="Add Product" onClick={handleAddProductClick} />
        {isAddProductOpen && (
          <form onSubmit={handleAddSubmit}>
            <InputField label="Category ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} error={categoryIdError} />
            <InputField label="Product Name" value={name} onChange={e => setName(e.target.value)} error={nameError} />
            <InputFieldWithCounter label="Description" value={description} onChange={e => setDescription(e.target.value)} error={descriptionError} maxLength={300} />
            <InputField label="Price" value={price} onChange={e => setPrice(e.target.value)} error={priceError} />
            <input type="file" ref={inputImageRef}></input>
            <div className="flex justify-center mb-2">
              <button type="submit" className="bg-rose-700 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
        )}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}
        <ActionButton iconSrc="/edit-icon.svg" altText="edit" actionText="Edit Product" onClick={handleEditProductClick} />
        <div>
          {isEditProductOpen && (
            <div className="grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
              {products.map(product => {
                console.log(product);
                return (
                  <div key={product.name} className="p-4 border rounded shadow flex flex-col">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <p className="text-gray-700 mb-1">Category ID: {product.categoryId}</p>
                      <p className="text-gray-700 mb-1">Description: {product.description}</p>
                      <p className="text-gray-700 mb-2">Price: {product.price} zł</p>
                    </div>
                    <div className="flex items-center justify-between gap-14 mt-auto flex-wrap">
                      <button onClick={() => handleEditProduct(product.name)} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                      <button onClick={() => { setProductIdToDelete(product.id); handleDeleteConfirmation(); }} className="flex items-center justify-center py-2 px-2 bg-red-600 rounded focus:outline-none hover:font-bold group flex-shrink-0"
                      >
                        <Image src="/delete-icon.svg" alt="delete" width={24} height={24} className="transform group-hover:scale-110" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {isProductToEditSelected && (
          <form onSubmit={handleEditSubmit}>
            <InputField label="Category ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} error={categoryIdError} />
            <InputField label="Product Name" value={name} onChange={e => setName(e.target.value)} error={nameError} />
            <InputFieldWithCounter label="Description" value={description} onChange={e => setDescription(e.target.value)} error={descriptionError} maxLength={300} />
            <InputField label="Price" value={price} onChange={e => setPrice(e.target.value)} error={priceError} />
            {/* <InputField label="Image" value={image} onChange={e => setImage(e.target.files[0])} /> */}
            <div className="flex justify-center mb-2">
              <button type="submit" className="bg-rose-700 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
      <Dialog isOpen={isDeleteProductConfirmationOpen} onClose={handleCancelDelete} title="Confirm Deletion">
        <div className="text-center">
          Are you sure you want to delete this product?
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button className="bg-green-50 text-white px-5 py-2 rounded-full" onClick={handleDeleteProductConfirmed}>
            Yes
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full" onClick={handleCancelDelete}>
            No
          </button>
        </div>
      </Dialog>

      <div className="flex flex-col items-center w-1/2">
        <h2 className="flex items-center text-2xl mb-4 group">
          <Image src="/users-icon.svg" alt="user" width={32} height={32} className="mr-2" />
          Users
        </h2>
        <ActionButton iconSrc="/get-icon.svg" altText="get" actionText="Get All Users" onClick={handleGetAllUsers} />
        <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mb-2">
          {users.map(user => (
            <div key={user.id} className="p-4 border rounded shadow">
              <h3 className="text-xl font-bold mb-2">Email: {user.email}</h3>
              <p className="text-gray-700 mb-2">Role: {user.roles[0].name}</p>
              <div className="mt-auto flex justify-end">
                <button onClick={() => handleDeleteUser(user.id)} className="flex items-center justify-center py-2 px-2 bg-red-600 rounded focus:outline-none hover:font-bold group flex-shrink-0"
                >
                  <Image src="/delete-icon.svg" alt="delete" width={24} height={24} className="transform group-hover:scale-110" />
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
      <Dialog isOpen={isDeleteUserConfirmationOpen} onClose={() => setIsDeleteUserConfirmationOpen(false)} title="Confirm Deletion">
        <div className="text-center">
          Are you sure you want to delete this user?
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button className="bg-green-50 text-white px-5 py-2 rounded-full" onClick={handleDeleteUserConfirmed}>
            Yes
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-full" onClick={() => setIsDeleteUserConfirmationOpen(false)}>
            No
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminPage;