import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import Home from "./Pages/Home";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import { ToastContainer  } from 'react-toastify';

function App() {
 

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <ToastContainer position="top-center" /> 
      </BrowserRouter>
    </>
  );
}

export default App;
