import React, { useState } from "react";
import NoteCard from "../Components/NoteCard";
import { FaPlus } from "react-icons/fa";
import Modal from "react-modal";
import AddEditNotes from "../Components/AddEditNotes";

function Home() {
  const [isPinned, setIsPinned] = useState(false);
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <div className="container mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 ">
          <NoteCard isPinned={isPinned} setIsPinned={setIsPinned} />
          <NoteCard />
          <NoteCard />
          <NoteCard />
          <NoteCard />
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
        <AddEditNotes  onClose={()=>setOpenAddEditModal({isShow:false, type:"add", data:null})}
            noteData={openAddEditModal.data}
            type={openAddEditModal.type}
          />
      </Modal>
    </>
  );
}

export default Home;
