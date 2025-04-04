import React from "react";
import { getInitials } from "../utils/helper";

function ProfileInfo({ onLogout, userInfo }) {
  return (
    <div className="md:flex md:flex-row  flex-col  gap-4 md:items-center">
      {/* User Avatar with Initials */}
      <h1 className="md:text-xl text-md text-slate-700 mb-2 md:mb-0  md:w-full w-[7vw] bg-slate-200 font-medium  rounded-full px-2 md:px-3 md:py-1">
        {getInitials(userInfo?.userName)}
      </h1>
      {/* User Info & Logout Button */}
      <div className="md:flex md:flex-row flex-col  gap-2 md:items-center">
        {/* Display Username */}
        <p className="md:text-lg text-md text-slate-700 md:mt-2 mb-2 font-medium capitalize">
          {userInfo?.userName}
        </p>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="md:text-md text-sm text-white/80 bg-red-500 rounded-sm px-1 md:px-2 md:py-1 font-medium cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
