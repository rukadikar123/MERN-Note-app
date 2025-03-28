import express, { urlencoded } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRouter from './Routes/user.routes.js'
import cors from 'cors'

dotenv.config()

const app=express()

// MongoDb connection
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("connected to mongoDB");
    
}).catch((err)=>{
    console.log(err);
    
})

// Middleware setup
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
app.use(cors({origin:"*"}))


// Routes
app.use('/api/auth',authRouter)




app.listen(3000, (req, res)=>{
    console.log("server is running on port 3000");
    
})