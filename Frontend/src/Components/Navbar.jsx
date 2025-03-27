import React, { useState } from "react";
import {Link, useNavigate} from 'react-router-dom'
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";

function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate=useNavigate()

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handlesearch = () => {};
  const onClearSearch = () => {
    setSearchQuery("");
  };

  const onLogout=()=>{
      navigate('/login')
  }

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-between w-full px-6 py-4 shadow-md">
        <Link to="/" className="text-slate-500 text-3xl font-medium">Notes</Link>
        <SearchBar
          value={searchQuery}
          handleChange={handleChange}
          handlesearch={handlesearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo onLogout={onLogout} />
      </div>
    </>
  );
}

export default Navbar;
