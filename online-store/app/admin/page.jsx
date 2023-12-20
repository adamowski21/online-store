"use client";

import React, { useState, useContext, useRef, useEffect } from 'react';
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
  const [categoryId, setCategoryId] = useState("");
  const [id, setId] = useState("");

  const [nameError, setNameError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [categoryIdError, setCategoryIdError] = useState("");

  const [addProductMessage, setAddProductMessage] = useState("");
  const [editProductMessage, setEditProductMessage] = useState("");

  const [isGetAllUsersOpen, setIsGetAllUsersOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([])

  const [users, setUsers] = useState([]);

  const inputImageRef = useRef();

  const [selectedImage, setSelectedImage] = useState(null);

  const handleBackToProducts = () => {
    setIsProductToEditSelected(false);
    setIsEditProductOpen(true);
  }

  const resetForm = () => {
    setId("");
    setCategoryId("");
    setName("");
    setDescription("");
    setPrice("");
    if (inputImageRef.current) {
      inputImageRef.current.value = "";
    }
    setSelectedImage(null);
  };

  const displayMessage = (msg, setMessageFunc) => {
    setMessageFunc(msg);
    setTimeout(() => {
      setMessageFunc("");
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
      setCategoryIdError("Category is required.");
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
    data.set('categoryId', categoryId);
    data.set('name', name);
    data.set('description', description);
    data.set('price', price);
    data.set('file', inputImageRef.current.files[0]);

    const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: data,
    });

    const responseData = await response.json();
    console.log(responseData);

    if (response.ok) {
      resetForm();
      setIsAddProductOpen(false);
      displayMessage("Product added successfully!", setAddProductMessage);
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
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch('http://localhost:8080/api/categories')
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const handleEditProduct = async (name) => {

    const productToEdit = products.find(product => product.name === name);
    setId(productToEdit.id);
    setCategoryId(productToEdit.categoryId);
    setName(productToEdit.name);
    setDescription(productToEdit.description);
    setPrice(productToEdit.price);
    setSelectedImage(imageUrls[productToEdit.fileName]);

    setIsProductToEditSelected(true);

    setIsEditProductOpen(false);

    setIsAddProductOpen(false);

    console.log(productToEdit);
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const data = new FormData();
    data.set('categoryId', categoryId);
    data.set('name', name);
    data.set('description', description);
    data.set('price', price);

    if (inputImageRef.current && inputImageRef.current.files[0]) {
      data.set('file', inputImageRef.current.files[0]);
    }

    const response = await fetch(`http://localhost:8080/api/products/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token.accessToken}`,
      },
      body: data,
    });

    if (response.ok) {
      resetForm();
      setIsProductToEditSelected(false);
      setIsEditProductOpen(true);
      displayMessage("Product edited successfully!", setEditProductMessage);
      fetchProducts();
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
    setIsGetAllUsersOpen(prevIsGetAllUsersOpen => !prevIsGetAllUsersOpen);
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

  const [imageUrls, setImageUrls] = useState({});

  const getImage = async (fileName) => {
    try {
      const response = await fetch(`http://localhost:8080/api/products/image/${fileName}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      return url;
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      const urls = {};

      for (const product of products) {
        const url = await getImage(product.fileName);
        urls[product.fileName] = url;
      }

      setImageUrls(urls);
    };

    fetchImages();
  }, [products]);

  return (
    <div className="flex justify-center space-x-10 mt-5">
      <div className="flex flex-col items-center w-1/2">
        <h2 className="flex items-center text-2xl mb-4 group">
          <Image src="/product-icon.svg" alt="product" width={32} height={32} className="mr-2" />
          Products
        </h2>
        <ActionButton iconSrc="/plus-icon.svg" altText="plus" actionText="Add Product" onClick={handleAddProductClick} />
        {addProductMessage && <p className="text-green-500 text-sm mb-4">{addProductMessage}</p>}
        {isAddProductOpen && (
          <form onSubmit={handleAddSubmit}>
            {/* <InputField label="Category ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} error={categoryIdError} /> */}
            <label htmlFor="category" className="block text-sm text-gray-56">Category</label>
            <select id="category"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="border border-black rounded-lg p-3 w-full mb-4"
            >
              <option value="" disabled>Choose category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categoryIdError && <p className="text-orange-500 text-xs">{categoryIdError}</p>}
            <InputField label="Product Name" value={name} onChange={e => setName(e.target.value)} error={nameError} />
            <InputFieldWithCounter label="Description" value={description} onChange={e => setDescription(e.target.value)} error={descriptionError} maxLength={300} />
            <InputField label="Price" value={price} onChange={e => setPrice(e.target.value)} error={priceError} />
            <input type="file" ref={inputImageRef} onChange={e => setSelectedImage(URL.createObjectURL(e.target.files[0]))} />
            {selectedImage && <img src={selectedImage} alt="productImage" width="100" height="100" className="border border-gray-300 rounded mt-4" />}
            <div className="flex justify-center mb-2">
              <button type="submit" className="bg-rose-700 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded">
                Submit
              </button>
            </div>
          </form>
        )}
        <ActionButton iconSrc="/edit-icon.svg" altText="edit" actionText="Edit Product" onClick={handleEditProductClick} />
        {editProductMessage && <p className="text-green-500 text-sm mb-4">{editProductMessage}</p>}
        <div>
          {isEditProductOpen && (
            <div className="grid grid-cols-3 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-2">
              {products.map(product => {
                console.log(product);
                return (
                  <div key={product.name} className="p-4 border rounded shadow flex flex-col">
                    <div>
                      <h3 className="text-xl font-bold mb-2">{product.name}</h3>
                      <div className="flex justify-center items-center mt-4 mb-2">
                        <img src={`http://localhost:8080/api/products/image/${product.fileName}`} alt={product.name} className="w-32 h-32 object-cover mb-4" />
                      </div>
                      <p className="text-gray-700 mb-1">Category ID: {product.categoryId}</p>
                      <p className="text-gray-700 mb-1">Description: {product.description}</p>
                      <p className="text-gray-700 mb-2">Price: {product.price} zł</p>
                    </div>
                    <div className="flex items-center justify-between gap-14 mt-auto flex-wrap">
                      <button onClick={() => handleEditProduct(product.name)} className="bg-yellow-600 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded">
                        Edit
                      </button>
                      <button onClick={() => { setProductIdToDelete(product.id); handleDeleteConfirmation(); }} className="flex items-center justify-center py-2 px-2 bg-red-600 rounded focus:outline-none hover:font-bold group flex-shrink-0">
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
          <form onSubmit={handleEditSubmit} className="p-4 rounded-2xl shadow-border mt-4 mb-4">
            <div className="flex">
              <button type="button" onClick={handleBackToProducts} className=" ml-auto px-2 py-1 mb-4 tracking-wide text-white text-sm transition-colors duration-200 transform bg-black rounded hover:bg-[#383838]">
                Back
              </button>
            </div>
            {/* <InputField label="Category ID" value={categoryId} onChange={e => setCategoryId(e.target.value)} error={categoryIdError} /> */}
            <label htmlFor="category" className="block text-sm text-gray-56">Category</label>
            <select id="category"
              value={categoryId}
              onChange={e => setCategoryId(e.target.value)}
              className="border border-black rounded-lg p-3 w-full mb-4"
            >
              <option value="" disabled>Choose category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            {categoryIdError && <p className="text-orange-500 text-xs">{categoryIdError}</p>}
            <InputField label="Product Name" value={name} onChange={e => setName(e.target.value)} error={nameError} />
            <InputFieldWithCounter label="Description" value={description} onChange={e => setDescription(e.target.value)} error={descriptionError} maxLength={300} />
            <InputField label="Price" value={price} onChange={e => setPrice(e.target.value)} error={priceError} />
            <input type="file" ref={inputImageRef}></input>
            {selectedImage && <img src={selectedImage} alt="productImage" width="100" height="100" className="border border-gray-300 rounded mt-4" />}
            <div className="flex justify-center mb-2">
              <button type="submit" className="bg-rose-700 hover:bg-rose-500 text-white font-bold py-2 px-4 rounded mt-4">
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

        {isGetAllUsersOpen && (
          <div className="grid lg:grid-cols-2 md:grid-cols-1 gap-4 mb-2">
            {users.map(user => (
              <div key={user.id} className="p-4 border rounded shadow">
                <h3 className="text-xl font-bold mb-2">Email: {user.email}</h3>
                <p className="text-gray-700 mb-2">Role: {user.roles[0].name}</p>
                <div className="mt-auto flex justify-end">
                  <button onClick={() => handleDeleteUser(user.id)} className="flex items-center justify-center py-2 px-2 bg-red-600 rounded focus:outline-none hover:font-bold group flex-shrink-0">
                    <Image src="/delete-icon.svg" alt="delete" width={24} height={24} className="transform group-hover:scale-110" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
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