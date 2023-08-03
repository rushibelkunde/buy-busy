import React, { useContext, useEffect, useState } from 'react'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { UserContext } from '../../UserContext';
import { db } from '../../FirebaseInit';

import { data } from "../../data"

import CartCard from './CartCard';

import "./Cart.css"
import { useNavigate } from 'react-router-dom';
import {useValue} from "../../UserContext"



function Cart() {
  
  // getting states and functions to maintain cart
  const { user , getCart, cart, setCart, total, setTotal,order, setOrder} = useContext(UserContext)

  const navigate = useNavigate()

  console.log("user", user)



  // function to increase count of items
  const increaseCount = async (id) => {
    const array = structuredClone(cart)
    const index = cart.findIndex((i) => i.id === id)
    if (index !== -1) {
      setTotal(total + array[index].price)
      array[index].count += 1
      setCart(array)
    }
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      cart: array
    });
    
  }

  //function to decrease count of items
  const decreaseCount = async(id) => {
    const array = structuredClone(cart)
    const index = cart.findIndex((i) => i.id === id)
    if (index !== -1) {
      array[index].count != 0?  setTotal(total- array[index].price) : setTotal(total - 0)
      array[index].count == 1?  removeProduct(id) : array[index].count-= 1
      setCart(array)
    }
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
      cart: array
    });
   }

  //function to remove items from cart
  const removeProduct = async(id) => { 
    const index = cart.findIndex((i) => i.id === id)
    console.log(index)
    if (index !== -1) {
      const array = cart.filter((i)=> i.id !== id )
      setTotal(total- cart[index].price* cart[index].count)
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, {
        cart: array
      });
      setCart(array)
    }
    if(cart.length == 1){
      setTotal(0)
    }
  }


  // function to checkout/Order
  const handleCheckout = async()=>{
    setOrder(cart)

    const orders = structuredClone(order)
    
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, {
        cart: [],
        orders: orders.concat(cart)
      });
    setTotal(0)
    setCart([])
    navigate("/orders")
  }
  


   

  // getting cart info at initial render
  useEffect(() => {
    getCart()
    // getTotalPrice()
    
  }, [])

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