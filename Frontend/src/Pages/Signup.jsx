import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  // State variables to handle user inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const navigate = useNavigate();

  // Function to handle user signup
  const handleSignup = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    if (!name) {
      setError("please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("please enter valid email address");
      return;
    }

    if (!password) {
      setError("please enter a password");
      return;
    }
    setError(""); // Clear previous error messages

    try {
      // Sending signup request to backend
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/signup`,
        { userName: name, email, password },
        { withCredentials: true }
      );
      // If the response indicates a failure, show error message
      if (res.data.success === false) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      setError("");
      navigate("/login"); // Redirect to login page after successful signup
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setError(error.message);
    }
  };
  return (
    <>
      <div className="flex items-center justify-center h-[80vh] ">
        <div className=" p-6 bg-slate-200 w-1/3">
          {/* Signup form */}
          <form onSubmit={handleSignup} className="flex flex-col gap-8">
            <h3 className="text-center text-3xl font-medium text-slate-700">
              Register
            </h3>
            {/* Input field for Name */}
            <input
              className="w-full text-sm  border-2 bg-slate-100 border-slate-300 outline-none rounded-md py-2 px-2"
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Input field for Email */}
            <input
              className="w-full text-sm  border-2 bg-slate-100 border-slate-300 outline-none rounded-md py-2 px-2"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="flex items-center border-2 rounded-md px-1  bg-slate-100 border-slate-300 ">
              {/* Password input field with visibility toggle */}
              <input
                className="w-full text-sm    outline-none  py-2 px-2 appearance-none"
                type={isShowPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div
                onClick={() => setIsShowPassword(!isShowPassword)}
                className={`cursor-pointer ${password ? "block" : "hidden"}`}
              >
                {isShowPassword ? (
                  <FaEyeSlash size={25} />
                ) : (
                  <FaEye size={25} />
                )}
              </div>
            </div>
            {/* Display validation errors if any */}
            {error && <p className="text-sm text-red-400 ">{error}</p>}
            {/* Signup button */}
            <button className="text-lg font-medium bg-green-500 rounded-sm text-white/90 py-1 hover:bg-green-400 cursor-pointer">
              Signup
            </button>
            {/* Link to navigate to login if user already has an account */}
            <div className="flex items-center gap-4 ">
              <p className="text-black/70">Already have an account?</p>
              <Link
                className="text-lg text-blue-800 hover:text-blue-500"
                to="/login"
              >
                Login here
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
