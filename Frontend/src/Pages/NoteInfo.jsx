import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";

function NoteInfo() {
  // Extract note info from localstorage
  const noteInfo = JSON.parse(localStorage.getItem("noteInfo"));
  if (!noteInfo) {
    // if No note found render this
    return (
      
      <div className="flex flex-col items-center justify-center h-screen">
        <h2 className="text-xl text-gray-600 mb-4">No Note Selected</h2>
      </div>
    );
  }
  return (
    <div className="w-[80%] md:h-[85vh] h-[75vh]  flex flex-col gap-2 mx-auto mt-16 p-6 border rounded-lg shadow-md bg-white">
      <Link to="/" className="absolute text-lg  md:text-2xl font-bold top-4 right-6 md:right-20">
        Back to Home
      </Link>
      <h1 className="md:text-3xl text-2xl font-bold text-slate-800 mb-2">
        {noteInfo.title}
      </h1>
      <p className="text-sm text-gray-500 mb-6">
        Created on: {moment(noteInfo.createdAt).format("Do MMMM YYYY")}
      </p>
      <div className="text-md h-[60vh] overflow-y-auto whitespace-pre-wrap break-words text-gray-700">
        {noteInfo.content}
      </div>
    </div>
  );
}

export default NoteInfo;
