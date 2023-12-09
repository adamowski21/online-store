// import React from 'react';
// import Link from 'next/link';
// import { getSlug } from '@/data/getSlug';
// import Image from 'next/image';

// const ProductCard = ({ product }) => (
//     <div key={product.id} className="category-product">
//       <div className="category-product-header">
//         <div className="category-product-img-wrapper normal-img">
//           <Link href={`/product/${getSlug(product.name)}`}>
//             <Image
//               src={product.image}
//               alt={product.name}
//               width={500}
//               height={500}
//               className="category-product-img mt-10"
//             />
//           </Link>
//         </div>
//       </div>
//       <div className="category-product-details">
//         <div className="category-product-title">
//           <span>{product.name}</span>
//         </div>
//         <div className="category-product-price">{`${product.price} zł`}</div>
//       </div>
//     </div>
//   );
  
//   export default ProductCard;
