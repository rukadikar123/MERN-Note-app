import { BrowserRouter, Routes, Route, Navigate,  } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { ToastContainer  } from 'react-toastify';
import {  useSelector } from "react-redux";
import { useEffect } from "react";

function App() {
  const { currentUser } = useSelector((state) => state.user);


  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      const currentTime = Date.now();

      if (currentTime > storedUser.expiry) {
        // ✅ User session expired, remove from localStorage & Redux
        localStorage.removeItem("user");
        // dispatch(signOutSuccess());
      } 
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer position="top-center" /> 
      </BrowserRouter>
    </>
  );
}

export default App;
