import React, { useEffect, useState } from "react";
import NoteCard from "../Components/NoteCard";
import Navbar from "../Components/Navbar";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import AddEditNotes from "../Components/AddEditNotes";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Home() {
  const [userInfo, setUserInfo] = useState(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [allNotes, setAllNotes] = useState([]);
  const [isSearch, setIsSearch]=useState(false)

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

  const handleEdit=(noteDetails)=>{
    setOpenAddEditModal({isShow:true, type:'edit', data:noteDetails})
  }


  // delete note

  const deleteNote=async(data)=>{
    const noteId=data._id

    try {
      const res=await axios.delete(`${import.meta.env.VITE_BASE_URL}/api/note/delete/${noteId}`, {withCredentials:true})

      if(res.data.success===false){
        toast.error(res.data.message)
        return

      }

      toast.success(res.data.message)
      getAllNotes()

    } catch (error) {
      toast.error(error.message)
    }
  } 

  const onSearchNote=async(query)=>{
    try {
      const res=await axios.get(`${import.meta.env.VITE_BASE_URL}/api/note/search`,{
        params:{query},
        withCredentials:true})
      if(res.data.success===false){
          toast.error(res.data.message)
          return
      }

      setAllNotes(res.data.notes)
      setIsSearch(true)
      

    } catch (error) {
       toast.error(error.message) 
    }
  }

  const handleClearSearch=()=>{
    setIsSearch(false)
    getAllNotes()
  }


  const updateIsPinned=async(noteData)=>{
    const noteId=noteData._id

    try {
      const res=await axios.put(`${import.meta.env.VITE_BASE_URL}/api/note/update-note-pinned/${noteId}`, {
        isPinned:!noteData.isPinned
      }, {withCredentials:true})

      if(res.data.success===false){
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <>
      <Navbar userInfo={userInfo} onSearchNote={onSearchNote} handleClearSearch={handleClearSearch}/>
      <div className="container mx-auto ">
        {allNotes.length > 0 ? <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 ">
          {allNotes?.map((note) => (
            <NoteCard key={note._id}
              title={note.title}
              date={note.createdAt}
              content={note.content}
              tags={note.tags}
              isPinned={note.isPinned}
              onEdit={() => {handleEdit(note)}}
              onDelete={() => {deleteNote(note)}}
              onPinNote={() => {updateIsPinned(note)}}
            /> 
          ))}
        </div> : <p className="flex items-center justify-center mt-60 text-2xl">{isSearch ? "oops! No Note Found": "Ready to capture your ideas? Click Add button to start noting down."}</p>}
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
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
}

export default Home;
