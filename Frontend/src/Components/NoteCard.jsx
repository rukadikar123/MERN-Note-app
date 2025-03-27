import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiUnpinFill } from "react-icons/ri";



function NoteCard({isPinned, setIsPinned,}) {
  return (
    <>
        <div className="flex flex-col gap-4  p-4 bg-slate-200 cursor-pointer h-[30vh] hover:shadow-xl transition-all ease-in-out border-slate-400 rounded-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-medium">Wake up at 7 am</h1>
          <p className="text-lg ">date</p>
        </div>
        <div onClick={()=>setIsPinned(!isPinned)} >
            {
                isPinned ?  <RiUnpinFill size={26}/> : <MdOutlinePushPin size={26}/> 
            }
        </div>
      </div>
      <div>
        {/* <p className="text-slate-800">{content?.slice(0,50)}</p> */}
      </div>
      <div className="flex justify-between items-center">
        <p className="text-lg">tags</p>
        <div className="flex gap-2">
            <FaEdit size={22}/>
            <MdDelete size={24}/>
        </div>
      </div>
    </div>
    
    </>
  );
}

export default NoteCard;
