// pages/Products.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addProduct, removeProduct } from '../features/productSlice';
import './Products.css'; 

function Products() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);

 
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    price: '',
    description: ''
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value
    });
  };

  const handleAddProduct = () => {
    const existingProduct = productList.find(p => p.id === parseInt(newProduct.id));
    if (existingProduct) {
      alert('Product ID already exists!');
      return;
    }
    dispatch(addProduct({
      id: parseInt(newProduct.id),
      name: newProduct.name,
      price: newProduct.price,
      description: newProduct.description
    }));
    setNewProduct({ id: '', name: '', price: '', description: '' });
  };

  const handleRemoveProduct = (id) => {
    dispatch(removeProduct(id));
  };

  return (
    <div className="products-container">
      <h2>Product List</h2>
      <ul>
        {productList.map(product => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>
              {product.name} - {product.price}
            </Link>
            <button onClick={() => handleRemoveProduct(product.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/* ฟอร์มสำหรับเพิ่มสินค้า */}
      <h2>Add New Product</h2>
      <form className="add-product-form">
        <div className="form-group">
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={newProduct.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <button className="add-product-button" onClick={handleAddProduct}>Add Product</button>
      </form>
    </div>
  );
}

export default Products;
