import mongoose from "mongoose";
import jwt from 'jsonwebtoken'

const userSchema=new mongoose.Schema({

    userName:{
        type:String,
        required:true
    }, 
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
    



},{timestamps:true})


userSchema.methods.generateAccessToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email
    }, process.env.JWT_SECRET, 
    {
        expiresIn: '4h' // Explicitly set token expiry to 4 hours
      }
  )
}

export const User=mongoose.model("User", userSchema)