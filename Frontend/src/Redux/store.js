import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice.js'

const store=configureStore({
    reducer:{
        user:userReducer,  
    },
    // to prevent error
middleware:(getDefaultMiddleware)=>{
    getDefaultMiddleware({
        serializableCheck:false
    })
}
}
)

export default store