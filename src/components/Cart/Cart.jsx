import React, { useContext, useEffect, useState } from 'react'
import { doc, updateDoc } from "firebase/firestore";
import { UserContext } from '../../UserContext';
import { db } from '../../FirebaseInit';

import { data } from "../../data"

import CartCard from './CartCard';

import "./Cart.css"
import { useNavigate } from 'react-router-dom';

import { actions } from '../../redux/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { asyncIncreaseCount, asyncDecreaseCount, asyncRemoveProduct } from '../../redux/reducer';




function Cart() {
  
  // getting states and functions to maintain cart
  const { user , getCart,order, setOrder} = useContext(UserContext)

  const dispatch = useDispatch()

  const cart = useSelector((state)=> state.cart)

  const [total, setTotal] = useState(0)
  const navigate = useNavigate()

  // function to increase count of items
  const increaseCount = async (id) => {
    dispatch(asyncIncreaseCount({id, userId: user.uid, cart}))
  }
  

  //function to decrease count of items
  const decreaseCount = async(id) => {
    dispatch(asyncDecreaseCount({id, userId: user.uid, cart}))
   }

  //function to remove items from cart
  const removeProduct = async(id) => { 
    dispatch(asyncRemoveProduct({id, userId: user.uid, cart}))
  }


  // function to checkout/Order
  const handleCheckout = async()=>{
    setOrder(cart)

    const orders = structuredClone(order)

    const carts = structuredClone(cart)

    carts.forEach((c)=>{
      c.date = new Date().toLocaleDateString()
    })

    orders.forEach((o)=>{
      o.date = new Date().toLocaleDateString()
    })
    
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
        cart: [],
        orders: orders.concat(carts)
      });
    setTotal(0)
    
    navigate("/orders")
  }
  


   

  // getting cart info at initial render
  useEffect(() => {
    getCart()

    var sum = 0

    cart.forEach((i)=>{
    sum+= i.price* i.count
    })

    setTotal(sum)
    
    
    // getTotalPrice()
    
  }, [cart])

  return (

    <div className="cart-page">
      <h2 className="cart-page__title">Shopping Cart</h2>
      <div className="cart-page__cart-items">
        {cart.map((cartItem) => (
          data.map((dataItem) => (
            cartItem.id == dataItem.id ?
              <CartCard product={dataItem} count={cartItem.count} increaseCount={increaseCount} decreaseCount={decreaseCount} removeProduct={removeProduct} />
          :
              ""
          ))
        ))}
      </div>
      <div className="cart-page__total">
        <h3>Total: {parseInt(total)}</h3>
        <button className="cart-page__checkout-button" onClick={handleCheckout}>Checkout/Order</button>
      </div>
    </div>
  )
}

export default Cart