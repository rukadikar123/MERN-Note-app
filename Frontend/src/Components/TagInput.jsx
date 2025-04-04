import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputVal, setInputVal] = useState(""); // State to manage input field value

  // Function to add a new tag to the list
  const addNewTag = () => {
    if (inputVal.trim() !== "") {
      setTags([...tags, inputVal.trim()]); // Add trimmed tag to the list
      setInputVal(""); // Clear input field after adding
    }
  };
  // Function to remove a tag from the list
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove)); // Filter out the removed tag
  };

  // Handle 'Enter' key press to add a new tag
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };

  return (
    <div className="">
      {/* Display the list of added tags */}
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2 md:mt-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 md:text-sm text-xs text-slate-900 bg-slate-100 px-1 md:px-3 py-1 rounded=md"
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      {/* Input field to add new tags */}
      <div className="flex items-center tag-2 md:gap-4 mt-2 md:mt-2">
        <input
          className="md:text-sm text-xs bg-transparent px-1 md:px-3 py-1 outline-none border border-slate-300"
          placeholder="Add Tags"
          type="text"
          value={inputVal}
          onKeyDown={handleKeydown}
          onChange={(e) => setInputVal(e.target.value)}
        />
        {/* Button to manually add a new tag */}
        <button
          onClick={() => addNewTag()}
          className="md:text-lg text-sm flex items-center justify-center font-medium bg-blue-500 rounded-sm text-white/90 p-1  hover:bg-blue-400 cursor-pointer"
        >
          <MdAdd />
        </button>
      </div>
    </div>
  );
}

export default TagInput;
