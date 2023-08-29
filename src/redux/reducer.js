import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../FirebaseInit";

const initialState = {
    cart: []
}


// async call for add to cart
export const asyncAddToCart = createAsyncThunk(
    "cart/asyncAddToCart",
    async (arg, thunkAPI) => {
        const array = structuredClone(arg.cart)
        const index = arg.cart.findIndex((i) => i.id === arg.id)
        if (index === -1) {
            array.push({ id: arg.id, name: arg.name, count: 1, price: arg.price, imageUrl: arg.imageUrl })
        }
        else {
            console.log(array[index].count)
            array[index].count += 1
        }
        const userRef = doc(db, "users", arg.userId);
        await updateDoc(userRef, {
            cart: array
        });

        thunkAPI.dispatch(actions.initializeCart(array))
    }
)

//async call for getCart
export const asyncGetCart = createAsyncThunk(
    "cart/asyncGetCart",
    async (arg, thunkAPI) => {
        const userRef = doc(db, "users", arg.userId);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
            console.log("Document data:", userSnap.data());
            thunkAPI.dispatch(actions.initializeCart(userSnap.data().cart))
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
)


//async call for increase count
export const asyncIncreaseCount = createAsyncThunk(
    "cart/asyncGetCart",
    async (arg, thunkAPI) => {

        const array = structuredClone(arg.cart)
        const index = arg.cart.findIndex((i) => i.id === arg.id)
        if (index !== -1) {
            array[index].count += 1
            const userRef = doc(db, "users", arg.userId);
            await updateDoc(userRef, {
                cart: array
            });
            thunkAPI.dispatch(actions.initializeCart(array))
        }
    }
)

//async call for decrease count
export const asyncDecreaseCount = createAsyncThunk(
    "cart/asyncDecreaseCount",
    async (arg, thunkAPI) => {
        const array = structuredClone(arg.cart)
        const index = arg.cart.findIndex((i) => i.id === arg.id)
        if (index !== -1) {
            array[index].count === 1 ? array.splice(index, 1) : array[index].count -= 1
        }
        const userRef = doc(db, "users", arg.userId);
        await updateDoc(userRef, {
            cart: array
        });
        thunkAPI.dispatch(actions.initializeCart(array))
    }
)

// async call for remove product
export const asyncRemoveProduct = createAsyncThunk(
    "cart/asyncRemoveProduct",
    async (arg, thunkAPI) => {

        const index = arg.cart.findIndex((i) => i.id === arg.id)
        console.log(index)
        if (index !== -1) {
            const array = arg.cart.filter((i) => i.id !== arg.id)

            const userRef = doc(db, "users", arg.userId);
            await updateDoc(userRef, {
                cart: array
            });
            thunkAPI.dispatch(actions.initializeCart(array))
        }

    }
)





// creating cart slice
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        initializeCart: (state, action) => {
            state.cart = [...action.payload]

        }
    }
})

export const cartReducer = cartSlice.reducer

export const actions = cartSlice.actions