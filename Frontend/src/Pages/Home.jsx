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
  const [userInfo, setUserInfo] = useState(null); // State to store user info
  const [allNotes, setAllNotes] = useState([]); // State to store all notes
  const [isSearch, setIsSearch] = useState(false);

  // State to manage modal for adding/editing notes
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShow: false,
    type: "add",
    data: null,
  });

  const { currentUser } = useSelector((state) => state.user); // Redux state to manage current user states

  const navigate = useNavigate();

  useEffect(() => {
    // If there is no logged-in user, redirect to the login page
    if (currentUser === null) {
      navigate("/login");
    } else {
      // If user is logged in, set user info and fetch all notes
      setUserInfo(currentUser);
      getAllNotes();
    }
  }, []);

  // Get All Notes
  const getAllNotes = async () => {
    try {
      // Send a GET request to fetch all notes with authentication cookies
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/note/all`,
        { withCredentials: true }
      );

      // If the API response indicates failure, log the error and return
      if (res.data.success === false) {
        console.log(res.data);
        return;
      }
      // Update state with fetched notes
      setAllNotes(res.data.notes);
    } catch (error) {
      console.log(error.message);
    }
  };

  // Handle edit
  const handleEdit = (noteDetails) => {
    // Update state to open the modal for editing a note
    setOpenAddEditModal({ isShow: true, type: "edit", data: noteDetails });
  };

  // delete note
  const deleteNote = async (data) => {
    const noteId = data._id; //Extract the note ID from the data object

    try {
      // Send a DELETE request to the backend API to remove the note
      const res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/note/delete/${noteId}`,
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      // Show a success message when the note is successfully deleted
      toast.success(res.data.message);
      // Refresh the list of notes after deletion
      getAllNotes();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle search
  const onSearchNote = async (query) => {
    try {
      // Send a GET request to the backend API to search for notes
      const res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/note/search`,
        {
          params: { query }, // Pass the query as a parameter
          withCredentials: true,
        }
      );
      // If the API response indicates failure, display an error message
      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }
      // Update the notes state with the search results
      setAllNotes(res.data.notes);
      setIsSearch(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Clear search
  const handleClearSearch = () => {
    setIsSearch(false); // Reset search state
    getAllNotes(); // Fetch all notes again
  };

  // Handle isPinned Updates
  const updateIsPinned = async (noteData) => {
    const noteId = noteData._id;

    try {
      // make a put request to update isPinned
      const res = await axios.put(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/note/update-note-pinned/${noteId}`,
        {
          isPinned: !noteData.isPinned, // Toggle pinned status
        },
        { withCredentials: true }
      );

      if (res.data.success === false) {
        toast.error(res.data.message);
        return;
      }

      toast.success(res.data.message);
      getAllNotes(); // Get all note again
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      {/* Navbar Component - Displays navigation bar with user info and search functionality */}
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />
      {/* Main Container for displaying notes and Modals*/}
      <div className="container mx-auto ">
        {allNotes?.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 ">
            {allNotes?.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.updatedAt}
                content={note.content}
                tags={note.tags}
                bgColor={note.bgColor}
                fontColor={note.fontColor}
                isPinned={note.isPinned}
                onEdit={() => {
                  handleEdit(note);
                }}
                onDelete={() => {
                  deleteNote(note);
                }}
                onPinNote={() => {
                  updateIsPinned(note);
                }}
              />
            ))}
          </div>
        ) : (
          // Message to show when no notes are found
          <p className="flex items-center justify-center mt-60 text-2xl">
            {isSearch
              ? "oops! No Note Found"
              : "Ready to capture your ideas? Click Add button to start noting down."}
          </p>
        )}
      </div>
      {/* Button to open modal for adding a new note */}
      <button
        onClick={() =>
          setOpenAddEditModal({ isShow: true, type: "add", data: null })
        }
        className=" font-medium bg-blue-700 rounded-xl text-white/90 p-5 absolute bottom-10 right-20 hover:bg-blue-500 cursor-pointer"
      >
        <FaPlus size={30} />
      </button>
      {/* Modal for Adding/Editing Notes */}
      <Modal
        isOpen={openAddEditModal.isShow}
        onRequestClose={() => {}}
        className="bg-white h-[83vh] mx-auto mt-14 p-2 overflow-auto border border-slate-400 rounded-md w-[60%]"
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
