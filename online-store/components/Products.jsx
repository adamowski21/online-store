"use client"

import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { getSlug } from '@/data/getSlug';

const Products = () => {

    const [products, setProducts] = useState([]);
    const [imageUrls, setImageUrls] = useState({});

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch('http://localhost:8080/api/products');

            if (response.ok) {
                const products = await response.json();
                setProducts(products);
            } else {
                console.error('Error fetching products:', await response.text());
            }
        };

        fetchProducts();
    }, []);

    const getImage = async (fileName) => {
        try {
            const response = await fetch(`http://localhost:8080/api/products/image/${fileName}`);

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

        if (products.length > 0) {
            fetchImages();
        }
    }, [products]);

    return (
        <section id="banner">
            <div className="container">
                <h2 className="banner-title mb-4">All Products</h2>
            </div>
            <div className="container">
                <div className="category-products">
                    {products.map((product) => (
                        <div key={product.id} className="category-product">
                            <div className="category-product-header">
                                <div className="category-product-img-wrapper normal-img">
                                    <Link href={`/product/${product.id}`}>
                                        {imageUrls[product.fileName] && (
                                            <img src={imageUrls[product.fileName]} alt={product.name} className="category-product-img mt-10 w-300 h-300" />
                                        )}
                                    </Link>
                                </div>
                            </div>
                            <div className="category-product-details">
                                <div className="category-product-title">
                                    <span>{product.name}</span>
                                </div>
                                <div className="category-product-price">{`${product.price} zł`}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Products