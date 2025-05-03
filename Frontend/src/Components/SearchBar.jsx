import React from "react";
import { IoIosSearch } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

function SearchBar({ value, handleChange, onClearSearch }) {
  
  return (
    <div className="flex items-center gap-1 w-[60vw] md:w-1/3  px-1 md:px-4 py-1 ">
      {/* Search Input */}
      <input
        value={value}
        onChange={(e) => handleChange(e)}
        className="w-full md:text-sm text-xs border border-slate-300 bg-slate-100 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-200 py-1 md:py-2 px-1"
        type="text"
        placeholder="Search Notes.."
      />
      {/* Clear Search Button */}
      {value && (
        <IoMdClose
          onClick={onClearSearch}
          className="text-slate-500 cursor-pointer hover:text-black"
          size={25}
        />
      )}
      {/* Search Button */}
      <IoIosSearch
        className="text-slate-500 cursor-pointer hover:text-black"
        size={25}
      />
    </div>
  );
}

export default SearchBar;
