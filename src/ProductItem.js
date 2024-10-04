import React, { useState } from 'react';
import styles from './Product.module.css';

function ProductItem({ product, onSelectProduct }) {
    return (
      <div className={styles.productCard}>
        <img src={product.image_url} alt={product.name} width="200" height="200" />

        <h3 className={styles.productName}>{product.name}</h3>

        <p className={styles.productPrice}>Preço: R${product.price}</p>

        {product.discount > 0 && <p>Desconto de R${product.discount}</p>}

        {product.bestChoice && <p className={styles.bestChoice}>Melhor Escolha!</p>}

        <p>{product.shippingInfo}</p>

        <button onClick={onSelectProduct} className={styles.botaocomprar}>Comprar</button>

      </div>
    );
  }

export default ProductItem;