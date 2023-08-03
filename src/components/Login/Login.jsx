import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../../FirebaseInit"
import { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

function Login() {

    // setting states
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate()
    
    


    // function for user logIn/SignIn
    const handleLogin = (e)=>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log("logged in")
            navigate("/")
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorMessage)
        });

    }

    
    
    return (
        <div className='container'>
            <div className='form-container'>
                <h2>Login</h2>
                <form action="" className='form-group'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <button onClick={handleLogin}>Login</button>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}
                </form>
            </div>
        </div>
    )
}

export default Login