// pages/ProductDetail.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './ProductDetail.css'; 

function ProductDetail() {
  const { productId } = useParams();
  const productList = useSelector((state) => state.products);
  const product = productList.find(p => p.id === parseInt(productId));

  if (!product) {
    return <h2>Product not found</h2>;
  }

  return (
    <div className="product-detail-container">
      <h2>{product.name}</h2>
      <p className="price">Price: {product.price}</p>
      <p className="description">Description: {product.description}</p>
    </div>
  );
}

export default ProductDetail;
