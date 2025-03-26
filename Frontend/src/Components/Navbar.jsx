import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handlesearch = () => {};
  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-between w-full px-6 py-3 shadow-md">
        <h1 className="text-slate-500 text-3xl font-medium">Notes</h1>
        <SearchBar
          value={searchQuery}
          handleChange={handleChange}
          handlesearch={handlesearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo />
      </div>
    </>
  );
}

export default Navbar;
