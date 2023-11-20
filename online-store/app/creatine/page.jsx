"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { products } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';

const Page = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const creatineProducts = products.filter((product) =>
        product.categories.includes('creatine') && product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section>
            <div className="flex justify-center mb-10 mt-4">
                <div className="relative">
                    <Image src="/search-icon.svg" alt="search" width={20} height={20} className="absolute left-3 top-1/2 transform -translate-y-1/2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-8 py-1 text-base border-2 rounded-xl focus:outline-none focus:ring-0 focus:border-black"
                    />
                </div>
            </div>
            <div className="category-products max-w-1/2">
                {creatineProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default Page;