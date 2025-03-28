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
