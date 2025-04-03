import React from "react";
import { getInitials } from "../utils/helper";

function ProfileInfo({ onLogout, userInfo }) {
  return (
    <div className="flex gap-4 items-center">
      {/* User Avatar with Initials */}
      <h1 className="text-xl text-slate-700 bg-slate-200 font-medium rounded-full px-3 py-1">
        {getInitials(userInfo?.userName)}
      </h1>
      {/* User Info & Logout Button */}
      <div className="flex gap-2 items-center">
        {/* Display Username */}
        <p className="text-lg text-slate-700 font-medium capitalize">
          {userInfo?.userName}
        </p>
        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="text-md text-white/80 bg-red-500 rounded-sm px-2 py-1 font-medium cursor-pointer"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default ProfileInfo;
