"use client"

import React, { useState, useEffect } from 'react';
import ProductDetailsComponent from '../../../components/ProductDetailsComponent';
import { getSlug } from '@/data/getSlug';

const ProductDetails = ({ params }) => {
    const { slug } = params;
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/products/${slug}`);

                if (response.ok) {
                    const productData = await response.json();
                    setProduct(productData);
                } else {
                    console.error('Error fetching product details:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProduct();
    }, [slug]);

    if (!product) {
        return <div>Product not found</div>;
    }

    return <ProductDetailsComponent product={product} />;
};

export default ProductDetails;
