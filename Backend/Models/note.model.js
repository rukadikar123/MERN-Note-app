import mongoose from "mongoose";

// note schema 
const noteSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:{
        type:[String],
        default:[]
    },
    isPinned:{
        type:Boolean,
        default:false
    },
    userId:{
        type:String,
        required:true
    }


},{timestamps:true})

// Create a "Note" model using the noteSchema to interact with the notes collection in MongoDB
export const Note=mongoose.model("Note", noteSchema)