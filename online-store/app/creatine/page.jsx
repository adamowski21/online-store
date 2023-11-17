import React from 'react';
import { products } from '../../data/mockData';
import ProductCard from '../../components/ProductCard';

const CreatinePage = () => {
  const creatineProducts = products.filter((product) =>
    product.categories.includes('creatine')
  );

  return (
    <section>
      <div className="category-products max-w-1/2">
        {creatineProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CreatinePage;
