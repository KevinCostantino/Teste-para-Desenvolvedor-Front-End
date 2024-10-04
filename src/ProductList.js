import React from 'react';
import ProductItem from './ProductItem';

function ProductList({ products, onSelectProduct }) {
  return (
    <div className="product-list" style={{ gap: '35px' }}>
      {products.map(product => (
        <div key={product.product_id}>
          <ProductItem
            product={product}
            onSelectProduct={() => onSelectProduct(product.product_id)} // Notifica o App.js
          />
        </div>
      ))}
    </div>
  );
}

export default ProductList;