import { User } from "../Models/user.model.js"
import bcryptjs from 'bcryptjs'
 
export const signup=async(req, res)=>{
    const {userName, email, password}=req.body

        if(!userName || !email || !password){
           throw new Error("All fields required")
        }

    try {

        const isUserExist=await User.findOne({email})

        if(isUserExist){
            return res.status(400).json({
                success:false,
                message:"email already exist"
            })
        }

        const hashedPassword=bcryptjs.hashSync(password, 10)

        const newUser=await User.create({
            userName:userName.toLowerCase(),
            email,
            password:hashedPassword
        })

        const user=await User.findById(newUser._id).select("-password")

        if(!user){
            throw new Error("Something went wrong while registering the user")
        }
        return res.status(200).json({
            success:true,
            user
        })


    } catch (error) {
        throw new Error(error)   
    }
}

export const login=async(req, res)=>{
    const {email, password}=req.body;

         if(!email || !password){
                throw new Error("All fields required")
         } 
         
    try {

         const isEmailExist=await User.findOne({email})
         if(!isEmailExist){
            return res.status(400).json({
                success:false,
                message:"user nor found"
            })
         }

         const isPasswordCorrect=await bcryptjs.compare(password, isEmailExist.password)
         if(!isPasswordCorrect){
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
         }

         const token=await isEmailExist.generateAccessToken()

         res.cookie("accessToken", token, {
            httpOnly: true,
            maxAge: 4 * 60 * 60 * 1000, // 4 hours
          });

         isEmailExist.password=undefined

         res.status(200).json({
            succes:true,
            user:isEmailExist,
            message: "Login successful",
            token
         })


    } catch (error) {
        throw new Error(error) 
    }
}


export const logout=async(req,res)=>{
      try {
        res.clearCookie('accessToken',{
            httpOnly:true
        })
        res.status(200).json({
            success:true,
            message:"User logout successfully"
        })
      } catch (error) {
        throw new Error(error) 

      }  
}