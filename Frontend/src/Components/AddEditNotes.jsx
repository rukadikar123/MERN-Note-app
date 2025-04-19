import React, { useCallback, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import TagInput from "./TagInput";
import axios from "axios";
import { toast } from "react-toastify";

function AddEditNotes({ onClose, noteData, type, getAllNotes }) {
  const [title, setTitle] = useState(noteData?.title || ""); // Stores the note title
  const [content, setContent] = useState(noteData?.content || ""); // Stores the note content
  const [tags, setTags] = useState(noteData?.tags || []); // Stores the note tags
  const [error, setError] = useState(null);
  const [bgColor, setBgColor] = useState(noteData?.bgColor || ""); // Stores the note background color
  const [fontColor, setFontColor] = useState(noteData?.fontColor || ""); // Stores the font color
  const [bgColorInput, setBgColorInput] = useState(""); // Temporary state for user input background color
  const [fontColorInput, setFontColorInput] = useState(""); // Temporary state for user input font color

  // edit Note
  const editNote = async () => {
    const noteId = noteData?._id; // Extracting the note ID

    try {
      // Sending an API request to update the note
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/note/edit/${noteId}`,
        { title, content, tags, bgColor, fontColor }, // Sending updated note details
        { withCredentials: true }
      );
      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      await getAllNotes(); // Refresh the list of notes
      onClose(); // Close the edit modal or form
    } catch (error) {
      console.log(error.message);
      toast.error("changes required");
      setError(error.message);
    }
  }

  //add note
  const addNewNote = async () => {
    try {
      // Sending a request to add a new note to the backend
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/note/add`,
        { title, content, tags, bgColor, fontColor }, // Passing note details
        { withCredentials: true }
      );

      if (res.data.success === false) {
        console.log(res.data.message);
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      await getAllNotes(); // Refresh the list of notes
      onClose();
    } catch (error) {
      console.log(error.message);
      toast.error("all fields required");
      setError(error.message);
    }
  };

  // Function to handle adding or editing a note
  const handleAddNote = () => {
    if (type === "edit") {
      editNote(); // If editing, call the edit function
    } else {
      addNewNote(); // If adding, call the add function
    }
  };

  // Function to add new background and font colors from user input
  const addNewColors = () => {
    if (bgColorInput.trim() !== "") {
      setBgColor(bgColorInput.trim()); // Set the background color state
      setBgColorInput("");
    }
    if (fontColorInput.trim() !== "") {
      setFontColor(fontColorInput.trim()); // Set the font color state
      setFontColorInput("");
    }
  };

  // Function to handle pressing "Enter" in the input fields
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      addNewColors(); // Call the function to update colors
    }
  };

  return (
    <div className="relative ">
      {/* Close button for the modal or form */}
      <button
        onClick={onClose}
        className="absolute   md:right-2 right-0 top-0 md:top-1 rounded-full hover:bg-slate-200 transition duration-300 p-2"
      >
        <MdClose size={20} />
      </button>
      <div>
        <label className="md:text-lg text-sm text-gray-600 uppercase font-medium">
          Title
        </label>
        {/* Title input field */}
        <input
          type="text"
          className="md:text-md text-sm p-1  ml-2 md:ml-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition duration-150"
          placeholder="Enter note title..."
          value={title}
          required
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <label className="md:text-lg text-sm text-gray-600 uppercase font-medium">
          Content
        </label>
        {/* Content input field */}
        <textarea
          type="text"
          rows={12}
          required
          className="text-sm text-slate-900   p-2 rounded-md border border-gray-300  bg-slate-50 resize-none focus:ring-2 focus:ring-blue-400 outline-none transition duration-150"
          placeholder="Write your note content..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      {/* Tags input field */}
      <div>
        <div>
          <label className="md:text-lg text-sm text-gray-600 uppercase font-medium">
            tags
          </label>
          <TagInput tags={tags} setTags={setTags} />
        </div>
      </div>
      {/* Background and font color inputs */}
      <div className="md:mt-4 w-full mt-2 flex md:flex-row flex-col justify-start items-center gap-2 md:gap-4">
        <div className="flex items-center">
          <label className="text-xs md:text-lg text-gray-600 uppercase font-medium">
            bg Color
          </label>
          {/* Background color input */}
          <input
            value={bgColorInput}
            onKeyDown={handleKeydown}
            onChange={(e) => setBgColorInput(e.target.value)}
            className=" w-[45%] md:w-fit ml-1 md:text-sm text-xs bg-transparent px-1 md:px-3 py-1 outline-none border border-slate-300"
            type="text"
            placeholder="#fef9c3"
          />
          <label className="md:text-md text-sm">{bgColor}</label>
          <button
            onClick={() => addNewColors()}
            className="md:text-lg text-lg ml-2 text-center  font-medium bg-blue-500 rounded-sm text-white/90 md:p-1  hover:bg-blue-400 cursor-pointer transition duration-200"
          >
            <MdAdd />
          </button>
        </div>
        <div className="flex items-center md:mt-0 mt-1">
          {" "}
          <label className="text-xs md:text-lg text-gray-600 uppercase font-medium">
            font Color
          </label>
          {/* Font color input */}
          <input
            value={fontColorInput}
            onKeyDown={handleKeydown}
            onChange={(e) => setFontColorInput(e.target.value)}
            className=" w-[45%] md:w-fit  ml-1 md:text-sm text-xs bg-transparent px-1 md:px-3 md:py-1 outline-none border border-slate-300"
            type="text"
            placeholder="#1f2937"
          />
          <label className="md:text-md text-sm">{fontColor}</label> {/* Displays the selected font color */}
          <button
            onClick={() => addNewColors()}
            className="md:text-lg text-lg ml-2 font-medium bg-blue-500 rounded-sm text-white/90 md:p-1  hover:bg-blue-400 cursor-pointer transition duration-150"
          >
            <MdAdd />
          </button>
        </div>
      </div>
      {/* Submit button */}
      <button
        className="md:text-lg text-sm font-medium bg-blue-500 rounded-sm text-white/90 p-2 mt-4 w-full hover:bg-blue-400 cursor-pointer transition duration-200"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
}

export default AddEditNotes;
