import React from 'react';

const CartCard = ({ product, count, increaseCount, decreaseCount, removeProduct }) => {
  return (
    <div className="cart-card">
      <img src={product.imageUrl} alt={product.name} className="cart-card__image" width={"200px"} />
      <div className="cart-card__details">
        <h3 className="cart-card__name">{product.name}</h3>
        <p className="cart-card__price">${product.price * count}</p>
        <div className="cart-card__count">
          <button onClick={() => decreaseCount(product.id)}>-</button>
          <span>{count}</span>
          <button onClick={() => increaseCount(product.id)}>+</button>
        </div>
      </div>
      <button onClick={() => removeProduct(product.id)} className="cart-card__remove-button">Remove</button>
    </div>
  );
};

export default CartCard;
