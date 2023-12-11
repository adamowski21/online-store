"use client"

import React, { useState, useEffect } from 'react';
import Category from '../../../components/Category';

const CategoryPage = ({ params }) => {
    const { slug } = params;
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/categories/${slug}`);

                if (response.ok) {
                    const categoryData = await response.json();
                    setCategory(categoryData);
                } else {
                    console.error('Error fetching category:', await response.text());
                }
            } catch (error) {
                console.error('Error fetching category:', error);
            }
        };

        fetchCategory();
    }, [slug]);

    if (!category) {
        return <div>Category not found</div>
    } else {
        return <Category category={category} />
    }
}

export default CategoryPage;