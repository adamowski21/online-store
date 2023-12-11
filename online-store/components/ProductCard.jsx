import React from 'react';
import Link from 'next/link';
import { getSlug } from '@/data/getSlug';

const ProductCard = ({ product }) => (
    <div key={product.id} className="category-product">
      <div className="category-product-header">
        <div className="category-product-img-wrapper normal-img">
          <Link href={`/product/${getSlug(product.id)}`}>
          <img src={`http://localhost:8080/api/products/image/${product.fileName}`} alt={product.name} className="category-product-img mt-10" />
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
  );
  
  export default ProductCard;
