import jwt from 'jsonwebtoken'
import { User } from '../Models/user.model.js'

export const verifyToken=async(req, res, next)=>{
    
    try {
        
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","")

        if(!token){
            throw new Error( "Unauthorized request")
        }

        const decodedToken=jwt.verify(token, process.env.JWT_SECRET)

        const user=await User.findById(decodedToken?._id).select("-password")

        if(!user){
            throw new Error("Invalid Access Token")
        }
        req.user=user
        next()

    } catch (error) {
        return res.status(401).json({ message: error?.message || "Token verification failed." });
    }
}