import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null,
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
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
            localStorage.setItem("AccessToken",JSON.stringify(state.currentUser))
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
            localStorage.removeItem("AccessToken")
        },
        signOutFailure:(state, action)=>{
            state.error=action.payload
            state.loading=false
        },
        getProfile:(state, action)=>{
            state.currentUser=action.payload
            localStorage.setItem("AccessToken",JSON.stringify(state.currentUser))
        }
    }
})

export const {signinStart, signInSuccess, signInFailure, signOutStart, signOutSuccess, signOutFailure, getProfile}=userSlice.actions

export default userSlice.reducer