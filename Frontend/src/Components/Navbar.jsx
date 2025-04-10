import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";
import { useDispatch } from "react-redux";
import {
  signOutFailure,
  signOutStart,
  signOutSuccess,
} from "../Redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { IoMdMenu } from "react-icons/io";
import { MdClose } from "react-icons/md";

function Navbar({ userInfo, handleClearSearch, onSearchNote }) {
  const [showMenu, setShowMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handles search input change
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Executes search when triggere
  const handlesearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };
  // Clears search input and triggers parent function to reset search results
  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  // Handles user logout
  const onLogout = async () => {
    try {
      dispatch(signOutStart()); // Dispatching sign-out start action

      // API call to logout
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/auth/logout`,
        { withCredentials: true }
      );

      // If logout fails, show an error message
      if (res?.data?.success === false) {
        dispatch(signOutFailure(res?.data?.message));
        toast.error(res.data.message);
        return;
      }
      console.log(res.data);
      toast.success(res.data.message);
      dispatch(signOutSuccess()); // Dispatch sign-out success action

      navigate("/login"); // Redirect to login page
    } catch (error) {
      toast.error(error.message);
      dispatch(signOutFailure(error.message));
    }
  };

  return (
    <>
      <div className="bg-white flex items-center justify-between w-full px-1 md:px-6 py-2  md:py-4 shadow-md">
        {/* App title */}
        <Link
          to="/"
          className="hidden md:block text-slate-500 hover:text-slate-400 text-3xl font-medium"
        >
          Notes
        </Link>
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          handleChange={handleChange}
          handlesearch={handlesearch}
          onClearSearch={onClearSearch}
        />
        <div className="md:hidden block">
          <IoMdMenu
            size={28}
            onClick={() => setShowMenu(true)}
            className="cursor-pointer text-slate-700"
          />
        </div>
        {/* User Profile & Logout */}
        <div className="md:block hidden">
          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </div>
        {showMenu && (
          <div className="fixed top-0 right-0 h-full md:hidden w-32 bg-white shadow-lg z-50 flex flex-col gap-4 p-4 transition-transform animate-slide-in">
            <div className="flex justify-end">
              <MdClose
                size={24}
                onClick={() => setShowMenu(false)}
                className="cursor-pointer text-slate-700"
              />
            </div>
            <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
