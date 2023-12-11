"use client"

import { getSlug } from '@/data/getSlug'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import React from 'react'

const Hero = () => {

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const categories = await response.json();
        setCategories(categories);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (

    <section className="container mx-auto flex-col flex md:flex-row gap-6 justify-center">
      {!loading ? categories.map((category) => (
        <div key={category.id}>
          <Link href={`/category/${getSlug(category.id)}`}>
            <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat">
              <img src={category.image}
                alt={category.name}
                className="w-full h-96 cursor-pointer object-cover max-w-xs transition duration-300 ease-in-out hover:scale-110"
              />
              <div className="absolute left-0 bottom-0 p-4 text-white text-3xl font-bold">
                <p> {category.title}</p>
              </div>
            </div>
          </Link>
        </div>
      )) : <p>Loading...</p>}
    </section>
  )
}

export default Hero
