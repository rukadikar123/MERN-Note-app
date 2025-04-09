import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRouter from './Routes/user.routes.js'
import noteRouter from './Routes/note.routes.js'

// Load environment variables from .env file into process.env
dotenv.config()

// Create an Express application instance
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
app.use(cors({origin:"https://mern-note-app-1-1cgt.onrender.com",credentials:true,methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]}))


// Routes
app.use('/api/auth',authRouter)
app.use('/api/note', noteRouter)


// Start the Express server and listen on port 3000
app.listen(3000, (req, res)=>{
    console.log("server is running on port 3000");
    
})