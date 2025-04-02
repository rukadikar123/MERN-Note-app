import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import TagInput from "./TagInput";
import axios from "axios";
import { toast } from "react-toastify";

function AddEditNotes({ onClose, noteData, type, getAllNotes }) {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState(noteData?.bgColor || "");
  const [fontColor, setFontColor] = useState(noteData?.fontColor || "");
  const [bgColorInput, setBgColorInput] = useState("");
  const [fontColorInput, setFontColorInput] = useState( "");


  // edit Note
  const editNote = async () => {
    const noteId = noteData._id;

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/note/edit/${noteId}`,
        { title, content, tags, bgColor, fontColor },
        { withCredentials: true }
      );
      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error("changes required");
      setError(error.message);
    }
  };

  //add note
  const addNewNote = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/note/add`,
        { title, content, tags , bgColor, fontColor},
        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error("all fields required");
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };


  const addNewColors=()=>{
    if(bgColorInput.trim() !== ""){
        setBgColor(bgColorInput.trim())
        setBgColorInput("")
    }
    if(fontColorInput.trim() !== ""){
      setFontColor(fontColorInput.trim())
      setFontColorInput("")
  }
  }
  // const handleRemoveColor = (tagToRemove) => {
  //   setTags(tags.filter((tag) => tag !== tagToRemove));
  // };

  const handleKeydown=(e)=>{
    if(e.key==="Enter"){
        addNewColors()
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
        <div>
          <label className="text-lg text-red-400 uppercase font-medium">
            tags
          </label>
          <TagInput tags={tags} setTags={setTags} />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <label className="text-ms text-red-400 uppercase font-medium">
          background Color
        </label>
        <input
          value={bgColorInput}
          onKeyDown={handleKeydown}
          onChange={(e)=>setBgColorInput(e.target.value)}
          className=" w-fit ml-1 text-sm bg-transparent px-3 py-1 outline-none border border-slate-300"
          type="text"
          placeholder="Choose a background color"
        />
         <label>{bgColor}</label>
        <button onClick={()=>addNewColors()} className="text-lg flex items-center justify-center font-medium bg-blue-500 rounded-sm text-white/90 p-1  hover:bg-blue-400 cursor-pointer" ><MdAdd/></button>
        <label className="text-md text-red-400 uppercase font-medium">
          font Color
        </label>
        <input
          value={fontColorInput}
          onKeyDown={handleKeydown}
          onChange={(e)=>setFontColorInput(e.target.value)}
          className=" w-fit ml-1 text-sm bg-transparent px-3 py-1 outline-none border border-slate-300"
          type="text"
          placeholder="Choose a Font color"
        />
        <label>{fontColor}</label>
        <button onClick={()=>addNewColors()} className="text-lg flex items-center justify-center font-medium bg-blue-500 rounded-sm text-white/90 p-1  hover:bg-blue-400 cursor-pointer" ><MdAdd/></button>
      </div>

      <button
        className="text-lg font-medium bg-blue-500 rounded-sm text-white/90 p-2 mt-4 w-full hover:bg-blue-400 cursor-pointer"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default AddEditNotes;
