import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

function TagInput({ tags, setTags }) {
  const [inputVal, setInputVal] = useState("");

  const addNewTag=()=>{
    if(inputVal.trim() !== ""){
        setTags([...tags, inputVal.trim()])
        setInputVal("")
    }
  }
  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleKeydown=(e)=>{
    if(e.key==="Enter"){
        addNewTag()
    }
  }

  return (
    <div className="">
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-4">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded=md"
            >
              #{tag}
              <button onClick={() => handleRemoveTag(tag)}>
                <MdClose />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-center gap-4 mt-2">
        <input
          className="text-sm bg-transparent px-3 py-1 outline-none border border-slate-300"
          placeholder="Add Tags"
          type="text"
          value={inputVal}
          onKeyDown={handleKeydown}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button onClick={()=>addNewTag()} className="text-lg flex items-center justify-center font-medium bg-blue-500 rounded-sm text-white/90 p-1  hover:bg-blue-400 cursor-pointer" ><MdAdd/></button>
      </div>
    </div>
  );
}

export default TagInput;
