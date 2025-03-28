import React, { useEffect, useState } from "react";
import NoteCard from "../Components/NoteCard";
import Navbar from "../Components/Navbar";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import AddEditNotes from "../Components/AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [allNotes, setAllNotes] = useState([]);

  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser === null) {
      navigate("/login");
    } else {
      setUserInfo(currentUser);
      getAllNotes();
    }
  }, []);

  const getAllNotes = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/note/all`,
        { withCredentials: true }
      );
      if (res.data.success === false) {
        console.log(res.data);
        return;
      }
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar userInfo={userInfo} />
      <div className="container mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 ">
          {allNotes?.map((note) => (
            <NoteCard key={note._id}
              title={note.title}
              date={note.createdAt}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            /> 
          ))}
        </div>
      </div>
      <button
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
        className=" font-medium bg-blue-700 rounded-xl text-white/90 p-5 absolute bottom-10 right-20 hover:bg-blue-500 cursor-pointer"
      >
        <FaPlus size={30} />
      </button>

      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        className="bg-white h-[75vh] mx-auto mt-24 p-2 overflow-auto border border-slate-400 rounded-md w-[50%]"
        contentLabel=""
      >
        <AddEditNotes
          onClose={() =>
            setOpenAddEditModal({ isShow: false, type: "add", data: null })
          }
          noteData={openAddEditModal.data}
          type={openAddEditModal.type}
        />
      </Modal>
    </>
  );
}

export default Home;
