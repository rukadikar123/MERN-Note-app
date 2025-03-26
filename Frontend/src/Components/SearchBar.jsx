import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, handleChange, handlesearch, onClearSearch }) {
  return (
    <div className="flex items-center gap-1 w-1/3 px-4 py-1 ">
      <input
        value={value}
        onChange={(e)=>handleChange(e)}
        className="w-full text-sm  border-2 bg-slate-100 border-slate-200 outline-none rounded-lg py-2 px-1"
        type="text"
        placeholder="Search Notes.."
      />
      { value && <IoMdClose onClick={onClearSearch}
        className="text-slate-500 cursor-pointer hover:text-black"
        size={25}
      />}
      <IoIosSearch
        onClick={handlesearch}
        className="text-slate-500 cursor-pointer hover:text-black"
        size={25}
      />
    </div>
  );
}

export default SearchBar;
