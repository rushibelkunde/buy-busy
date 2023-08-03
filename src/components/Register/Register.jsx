import React, { useState } from 'react';
import {db, auth} from "../../FirebaseInit"
import { setDoc, doc } from "firebase/firestore"; 
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


import "./Register.css"

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault()
        try {
            
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            updateProfile(auth.currentUser, {
                displayName: name
            })
            .then(()=>{})
            console.log('User registered successfully:', user);
            await setDoc(doc(db, "users", user.uid), {
                email: email,
                name: name,
                cart : [],
                orders : []
                
              });

            // You can save additional user data to Firestore or Realtime Database here if needed.
            
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className='container'>

            <div className='form-container'>
                <h2>Register</h2>

                <form action="" className='form-group'>
                    <input type="text" onChange={(e) => setName(e.target.value)} placeholder='Name'/>
                    
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' />
                    
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
                    <button onClick={handleRegister}>Register</button>
                    {errorMessage && <p className='error-message'>{errorMessage}</p>}


                </form>



            </div>

        </div>
    );
};

export default Register;
