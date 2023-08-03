import React, { useContext, useEffect } from 'react';
import './Orders.css'; // Import the CSS file for styling
import { UserContext } from '../../UserContext';

const Orders = () => {
  // Assuming you have the purchasedProducts array with product data

  const {order, getOrders} = useContext(UserContext)

  

  const purchasedProducts = [
    {
      id: 1,
      name: 'Product 1',
      price: 10.99,
      quantity: 2,
      image: 'product1.jpg',
    }
    // Add more products as needed
  ];

  useEffect(()=>{
    getOrders()
  },[])
  

  return (
    <div className="orders-container">
      <h2>Orders</h2>
      {order?.map((product) => (
        <div className="order-item" key={product.id}>
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div className="product-details">
            <h3>{product.name}</h3>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.count}</p>
            <p>Total: ${product.price * product.count}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
