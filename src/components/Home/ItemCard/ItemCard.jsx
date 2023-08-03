import React from 'react';
import './ItemCard.css';

const ItemCard = ({ id, name, imageUrl, price, description, handleAdd }) => {

  
  return (
    <div className="item-card">
      <img src={imageUrl} alt={name} width="200px" className="item-image" />
      <div className="item-details">
        <h3 className="item-name">{name}</h3>
        <p className="item-price">${price}</p>
        <p className="item-description">{description}</p>
        <button className="add-to-cart-btn" onClick={()=>handleAdd(id, price, imageUrl)}>Add to Cart</button>
      </div>
    </div>
  );
};

export default ItemCard;
