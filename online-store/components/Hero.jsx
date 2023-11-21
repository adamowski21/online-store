import { getSlug } from '@/data/getSlug'
import Link from 'next/link'
import React from 'react'
import { categories } from '@/data/mockData'

const Hero = () => {

  return (
   
    <section className="container mx-auto flex-col flex md:flex-row gap-6 justify-center">
       {categories.map((category) => (
      <div>
        <Link href={`/category/${getSlug(category.name)}`}>
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
       ))}
    </section>
  )
}

export default Hero
