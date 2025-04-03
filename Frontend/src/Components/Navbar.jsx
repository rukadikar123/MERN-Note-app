import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";
import { useDispatch } from "react-redux";
import { signOutFailure, signOutStart, signOutSuccess } from "../Redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

function Navbar({userInfo, handleClearSearch, onSearchNote}) {
  const [searchQuery, setSearchQuery] = useState("");     // State for search input
  
  const navigate = useNavigate();
  const dispatch=useDispatch()

  // Handles search input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Executes search when triggere
  const handlesearch = () => {
    if(searchQuery){
      onSearchNote(searchQuery)
    }
  };
  // Clears search input and triggers parent function to reset search results
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch()
  };

    // Handles user logout
  const onLogout = async() => {
    try {
      dispatch(signOutStart())    // Dispatching sign-out start action

            // API call to logout
      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`,{withCredentials:true})

      // If logout fails, show an error message
      if(res?.data?.success === false){ 
        dispatch(signOutFailure(res?.data?.message))
        toast.error(res.data.message)
        return
      }
      console.log(res.data);
      toast.success(res.data.message)
      dispatch(signOutSuccess())     // Dispatch sign-out success action

      
      navigate('/login')               // Redirect to login page
    } catch (error) {
      toast.error(error.message)
      dispatch(signOutFailure(error.message))
    } 
  };

  return (
    <>
      <div className="bg-slate-300 flex items-center justify-between w-full px-6 py-4 shadow-md">
        {/* App title */}
        <Link to="/" className="text-slate-500 text-3xl font-medium">
          Notes
        </Link>
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          handleChange={handleChange}
          handlesearch={handlesearch}
          onClearSearch={onClearSearch}
        />
        {/* User Profile & Logout */}
        <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
      </div>
    </>
  );
}

export default Navbar;
