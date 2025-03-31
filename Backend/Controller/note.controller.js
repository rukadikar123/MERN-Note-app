import { Note } from "../Models/note.model.js";

export const addNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { id } = req.user;

  if (!title || !content || !tags) {
    throw new Error("All fields required");
  }

  try {
    const note=await Note.create({
        title,
        content,
        tags:tags || [],
        userId:id
    })

    res.status(200).json({
        success:true,
        note,
        message:"note Created successfully"
    })


  } catch (error) {
    throw new Error(error);
  }
};

export const editNote=async(req, res)=>{
    const {noteId}=req.params
    const note=await Note.findById(noteId)
    

    if(!note){
        return res.status(400).json({
            success:false,
            message:"note not found"
        })
    } 

    if(req.user.id !== note.userId){
        throw new Error("You can only update your own note")
    }

    const {title, content, tags,  isPinned}=req.body
    if(!title && !content && !tags){
        throw new Error("No changes Provided")
    }

    try {
        if(title){
            note.title=title
        }
        if(content){
            note.content=content
        }
        if(tags){
            note.tags=tags
        }
        if(isPinned){
            note.isPinned=isPinned
        }
        await note.save()

        res.status(200).json({
            success:true,
            message:"note updated successfully",
            note
        })

    } catch (error) {
        throw new Error(error);
    }
}


export const getAllNotes=async(req,res)=>{
    try {
        const userId=req.user.id
    
        const notes=await Note.find({userId}).sort({isPinned:-1})
    
        if(!notes){
            throw new Error("Notes Not found")
        }
    
        res.status(200).json({
            success:true,
            message:"All notes retrieved successfully",
            notes
        })
    } catch (error) {
        throw new Error(error);
    }

}


export const deleteNote=async (req, res)=>{
    const noteId=req.params.noteId

    const note=await Note.findOne({_id:noteId,userId:req.user.id})

    if(!note){
        throw new Error("Note not found")
    }

    try {
         await Note.deleteOne({_id:noteId,userId:req.user.id})   

         res.status(200).json({
            success:true,
            message:"note delete successfully   "
         })

    } catch (error) {
        throw new Error(error);
    }

}

export const updateNotePinned=async(req, res)=>{

    try {
        const note=await Note.findById(req.params.noteId)

        if(!note)    {
            throw new Error("Note not found!");
        }

        if(req.user.id !== note.userId){
            return res.status(400).json({
                success:false,
                message:"you can only update your own note"
            })
        }
        const {isPinned}=req.body

       note.isPinned=isPinned
       await note.save()
        res.status(200).json({
            success:true,
            message:"note updated successfully",
            note
        })

    } catch (error) {
        throw new Error(error);   
    }
}

export const searchNote=async(req,res)=>{
    const {query}=req.query

    if(!query){ 
        return res.status(400).json({
            success:false,
            message:"search query is required"
        })
    }

    try {
        const matchingNotes=await Note.find({
            userId:req.user.id,
            $or:[{title:{$regex:new RegExp(query,"i")}},
                {content:{$regex:new RegExp(query,"i")}}
            ]
        })


        res.status(200).json({
            success:true,
            message:'notes matching the search query retrieved successfully',
            notes:matchingNotes
        })
    } catch (error) {
        throw new Error(error);
    }
}