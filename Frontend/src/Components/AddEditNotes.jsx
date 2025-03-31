import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "./TagInput";
import axios from "axios";
import { toast } from "react-toastify";

function AddEditNotes({ onClose, noteData, type, getAllNotes }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError]=useState(null)

  // edit Note
  const editNote=async()=>{
    const noteId=noteData._id

    try {
      const res= await axios.post(`${import.meta.env.VITE_BASE_URL}/api/note/edit/${noteId}`,{title , content, tags}, {withCredentials:true})
      if(res.data.success===false){
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }
      toast.success(res.data.message)
      getAllNotes()
      onClose()

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
      setError(error.message)  
    } 
  }
   
  //add note
  const addNewNote=async()=>{
    try {
      const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/note/add`, {title, content, tags}, {withCredentials:true})

      if(res.data.success===false){
        console.log(res.data.message);
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }
      toast.success(res.data.message)
      getAllNotes()
      onClose()

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
      setError(error.message)
    }
  }

  const handleAddNote=()=>{
        if(type ==="edit"){
            editNote()
        }else{
            addNewNote()
        }
  }

  return (
    <div className="relative">
      <button
        onClick={onClose}
        className="absolute right-2 top-1 rounded-full hover:bg-slate-200 p-2"
      >
        <MdClose size={20} />
      </button>
      <div>
        <label className="text-lg text-red-400 uppercase font-medium">
          Title
        </label>
        <input
          type="text"
          className="text-md  ml-4 text-slate-800 outline-none"
          placeholder="wake up at 7 am"
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <label className="text-lg text-red-400 uppercase font-medium">
          Content
        </label>
        <textarea
          type="text"
          rows={15}
          required
          className="text-sm text-slate-900 outline-none bg-slate-200 p-2 rounded-md"
          placeholder="content....."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <label className="text-lg text-red-400 uppercase font-medium">
          tags
        </label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <button className="text-lg font-medium bg-blue-500 rounded-sm text-white/90 p-2 mt-4 w-full hover:bg-blue-400 cursor-pointer" onClick={handleAddNote}>{type==="edit" ? "Update" : "Add"}</button>
    </div>
  );
}

export default AddEditNotes;
