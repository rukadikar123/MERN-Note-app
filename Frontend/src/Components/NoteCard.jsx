import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { RiUnpinFill } from "react-icons/ri";
import moment from "moment";

function NoteCard({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
  bgColor,
  fontColor,
  onClick
}) {
  return (
    <>
      {/* Note Card Container */}
      <div onClick={onClick}
        style={{ backgroundColor: bgColor, color: fontColor }}
        className="flex flex-col justify-around p-2 md:p-4 space-y-4 border-2 w-full cursor-pointer h-[30vh] hover:shadow-xl transition-all ease-in-out border-slate-400 rounded-sm"
      >
        {/* Title and Pin Section */}
        <div className="flex items-center justify-between border-gray-400 border-b pb-2">
          <div className=" flex flex-col space-y-1">
            <h1 className="md:text-2xl text-xl font-bold">{title}</h1>
            <p className="text-sm ">{moment(date).format("Do MMM YYYY")}</p>
          </div>
          {/* Pin and Unpin Button */}
          <div onClick={onPinNote}>
            {isPinned ? (
              <RiUnpinFill size={26} />
            ) : (
              <MdOutlinePushPin size={26} />
            )}
          </div>
        </div>
        {/* Note Content */}
        <div className="flex-1  mb-2 min-h-[4.5rem] border-gray-400 border-b pb-2">
          <p className="clamp-3-lines ">{content}</p>
        </div>
        {/* Tags, Edit, and Delete Actions */}
        <div className="flex justify-between items-center">
          {/* Display Tags */}
          <p className="text-sm ">{tags?.map((tag) => ` #${tag} `)}</p>
          {/* Action Buttons: Edit & Delete */}
          <div className="flex gap-4">
            <FaEdit onClick={onEdit} size={22} />
            <MdDelete onClick={onDelete} size={24} />
          </div>
        </div>
      </div>
    </>
  );
}

export default NoteCard;
