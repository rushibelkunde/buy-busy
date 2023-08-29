import React, { useEffect, useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import "./Navbar.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { UserContext } from '../../UserContext';

import { db } from '../../FirebaseInit';
import { doc, updateDoc , getDoc} from "firebase/firestore";
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../redux/reducer';

import { asyncAddToCart, asyncGetCart } from '../../redux/reducer';


function Navbar({user, signOutUser}) {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cart = useSelector((state)=> state.cart)
  

  // setting states 
  
  const [input, setInput] = useState("")
  const [order, setOrder] = useState([])


  


  // get cart function
  const getCart = async () => {
    dispatch(asyncGetCart({userId: user.uid}))
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
  const handleAdd=async (id, price, imageUrl, name)=>{

    dispatch(asyncAddToCart({userId: user.uid, cart, id, price, imageUrl, name}))

    alert("item added to cart")
  }

  // getting cart details at initial render
  useEffect(()=>{
    if(user){
      getCart()

    }
  },[])
  
  return (
    <UserContext.Provider value={{user:user, input , handleAdd, getCart, order, setOrder , getOrders}}>
    
      <div className='navbar'>
        <div className='left-nav'>
          <h2 onClick={()=>navigate("/")}><StorefrontIcon /> BuyBusy</h2>
          <div>
            {user?<input type="search" name="" id="search" onChange={(e)=>{setInput(e.target.value)}} placeholder='Search Products' /> : ""}
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