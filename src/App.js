import React, { useEffect, useState } from 'react'
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import Cart from './components/Cart/Cart'
import Orders from './components/Order/Orders'
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "./FirebaseInit"



function App() {
  const [user, setUser] = useState(null)

  // getting user as we open the Website
  const getUser = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user)
        setUser(user)
        return user
        // ...
      } else {
        // User is signed out
        return user
      }
    });
  }


  // Function for SignOut
  const signOutUser = () => {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      // An error happened.
    });

  }

  

  

  // Routes 
  const router = createBrowserRouter([
    {
      path: "/", element: <Navbar user={user} signOutUser={signOutUser}  />, children: [
        user? { path: "/", element: <Home /> } : { path: "/", element: <Login /> },
        user?{ path: "/register", element: <Home /> }:{path:"/register", element: <Register/>},
        {
          path: "/login", element: <Login />, loader: async () => {
            if (user) {
              return redirect("/")
            }
            return null
          }
        },

        user? { path: "/cart", element: <Cart /> } : { path: "/cart", element: <Login /> },
        user? { path: "/orders", element: <Orders /> } : { path: "/orders", element: <Login /> }
      ]
    }
  ])


  // getting user at the initial render
  useEffect(() => {
    getUser()

  }, [])

  return (
    
    <RouterProvider router={router}>

    </RouterProvider>
    
    // <Router>
    //   <Routes>
    //     <Route path="/home" element={<Home/>}/>
    //     <Route path="/register" element={<Register/>}/>
    //     <Route path="/login" element={<Login/>}/>

    //   </Routes>
    // </Router>
  )
}

export default App