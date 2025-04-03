import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser: JSON.parse(localStorage.getItem("user")) || null,
    error:null,
    loading:false   
}

const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signinStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            const expirationTime = Date.now() + 20 * 1000; // ✅ Set expiry for 4 hours
            const userWithExpiry = { ...action.payload, expiry: expirationTime };

            state.currentUser = userWithExpiry;
            state.loading = false;
            state.error = null;
            localStorage.setItem("user", JSON.stringify(userWithExpiry));
        },
        signInFailure:(state, action)=>{
            state.error=action.payload
            state.loading=false
        },
        signOutStart:(state)=>{
            state.loading=true
        },
        signOutSuccess:(state)=>{
            state.currentUser=null
            state.loading=false
            state.error=null
            localStorage.removeItem("user");
        },
        signOutFailure:(state, action)=>{
            state.error=action.payload
            state.loading=false
        },
    }
})

export const {signinStart, signInSuccess, signInFailure, signOutStart, signOutSuccess, signOutFailure}=userSlice.actions

export default userSlice.reducer