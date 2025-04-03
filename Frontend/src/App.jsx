import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import UserProtectWrapper from "./Components/UserProtectWrapper";

function App() {
  const { currentUser } = useSelector((state) => state.user);
console.log(currentUser);

  

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
          <Route path="/login" element={currentUser ? <Navigate to="/" />  :<Login />} />

          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer position="top-center" />
      </BrowserRouter>
    </>
  );
}

export default App;
