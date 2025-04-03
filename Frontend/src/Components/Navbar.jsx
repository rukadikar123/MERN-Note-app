import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";
import { useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../Redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar({userInfo, handleClearSearch, onSearchNote}) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handlesearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  };
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  };

  const onLogout = async() => {
    try {
      dispatch(signOutStart())

      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`,{withCredentials:true})

      if(res?.data?.success === false){ 
        dispatch(signOutFailure(res?.data?.message))
        toast.error(res.data.message)
        return
      }
      console.log(res.data);
      toast.success(res.data.message)
      dispatch(signOutSuccess())

      
      navigate('/login')
    } catch (error) {
      toast.error(error.message)
      dispatch(signOutFailure(error.message))
    } 
  };

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-between w-full px-6 py-4 shadow-md">
        <Link to="/" className="text-slate-500 text-3xl font-medium">
          Notes
        </Link>
        <SearchBar
          value={searchQuery}
          handleChange={handleChange}
          handlesearch={handlesearch}
          onClearSearch={onClearSearch}
        />
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </>
  );
}

export default Navbar;
