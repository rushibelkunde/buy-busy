import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { UserContext } from '../../UserContext';

import { db } from '../../FirebaseInit';
import { doc, updateDoc , getDoc} from "firebase/firestore";


function Navbar({user, signOutUser}) {
  const navigate = useNavigate()

  // setting states 
  const [total, setTotal] = useState(0)
  const [cart, setCart] = useState([])
  const [input, setInput] = useState("")
  const [order, setOrder] = useState([])


  // get cart function
  const getCart = async () => {
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      var totalAmount = 0
      console.log("Document data:", userSnap.data());
      setCart(userSnap.data().cart)
      userSnap.data().cart.forEach((cartItem) => {
              totalAmount += cartItem.price*cartItem.count
            })
            setTotal(totalAmount)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  //getOrders function
  const getOrders = async()=>{
    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      console.log("Document data:", userSnap.data());
      setOrder(userSnap.data().orders)
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  
  //add items to cart function
  const handleAdd=async (id, price, imageUrl)=>{
    const array = structuredClone(cart)
    const index = cart.findIndex((i)=> i.id === id)
    if(index===-1){
      array.push({id, count: 1, price, imageUrl})
      setCart([...cart, {id, count: 1, price, imageUrl}])
    }
    else{
      console.log(array[index].count)
      array[index].count += 1
      setCart(array)
    }
    const userRef = doc(db, "users", user.uid);
    console.log(cart)
    await updateDoc(userRef, {
      cart: array
    });

    alert("item added to cart")
  }

  // getting cart details at initial render
  useEffect(()=>{
    if(user){
      getCart()

    }
  },[])
  
  return (
    <UserContext.Provider value={{user:user, input , handleAdd, getCart, cart, setCart, total, setTotal, order, setOrder , getOrders}}>
    
      <div className='navbar'>
        <div className='left-nav'>
          <h2 onClick={()=>navigate("/")}><StorefrontIcon /> BuyBusy</h2>
          <div>
            {user?<input type="search" name="" id="" onChange={(e)=>{setInput(e.target.value)}} placeholder='Search Products' /> : ""}
          </div>
        </div>
        <div >{user?<h2 className='displayName'>Welcome {user.displayName}</h2>:""}</div>
        <div className='right-nav'>
          <div>
            {user? <NavLink to={"/cart"}><ShoppingCartIcon/></NavLink> : ""}
          </div>
          <div>
            {user? <NavLink to={"/orders"} >Orders</NavLink> : ""}
          </div>
          
          {user ? <div onClick={signOutUser}>Signout</div>: <div onClick={()=>{navigate("/login")}} >SignIN</div> }

          {user ? "": <div onClick={()=>{navigate("/register")}} >Register</div> }
        </div>
      </div>
      <Outlet />
      </UserContext.Provider>
  )
}

export default Navbar