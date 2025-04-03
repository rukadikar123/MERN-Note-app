import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import UserProtectWrapper from "./Components/UserProtectWrapper";
import { useEffect } from "react";
import { getProfile } from "./Redux/userSlice";

function App() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  // Restore user from LocalStorage on page load
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("AccessToken"));
    if (storedUser) {
      dispatch(getProfile(storedUser)); // ✅ Restore user in Redux
    }
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <UserProtectWrapper>
                <Home />
              </UserProtectWrapper>
            }
          />
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" replace /> : <Login />}
          />

          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
