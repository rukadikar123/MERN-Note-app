import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../utils/helper";
import { useDispatch } from "react-redux";
import { signInFailure, signinStart, signInSuccess } from "../Redux/userSlice";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState(""); // Stores email input
  const [password, setPassword] = useState(""); // Stores password input
  const [error, setError] = useState(""); // Stores validation errors
  const [isShowPassword, setIsShowPassword] = useState(false); // Controls password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle user login
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents default form submission behavior

    if (!validateEmail(email)) {
      setError("please enter valid email address");
      return;
    }

    if (!password) {
      setError("please enter a password");
      return;
    }
    setError(""); // Reset error message if inputs are valid

    // login api
    try {
      dispatch(signinStart); // Dispatch action to indicate login process started
      // API request to login endpoint
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message)); // Dispatch failure action with error message
        toast.error(response.data.message); // Show error notification
      }
      toast.success(response.data.message);
      dispatch(signInSuccess(response.data.user)); // Dispatch success action with user data

      navigate("/"); // Redirect user to home page after successful login
    } catch (error) {
      toast.error(error.message);
      dispatch(signInFailure(error.message)); // Dispatch failure action with error message
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] ">
      {/* Login form container */}
      <div className=" md:p-6 bg-slate-200 md:w-1/3 p-4 w-[85%]">
        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <h3 className="text-center text-2xl md:text-3xl font-medium text-slate-700">
            Login
          </h3>
          {/* Email Input */}
          <input
            className="w-full text-sm  border-2 bg-slate-100 border-slate-300 outline-none rounded-md md:py-2 py-1 px-2"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center border-2 rounded-md px-1  bg-slate-100 border-slate-300 ">
            {/* Password Input with Show/Hide Feature */}
            <input
              className="w-full text-sm    outline-none  md:py-2 py-1 px-2 appearance-none"
              type={isShowPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* Show/Hide Password Icon */}
            <div
              onClick={() => setIsShowPassword(!isShowPassword)}
              className={`cursor-pointer ${password ? "block" : "hidden"}`}
            >
              {isShowPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </div>
          </div>
          {/* Display error message if exists */}
          {error && <p className="text-sm text-red-400 ">{error}</p>}
          {/* Login Button */}
          <button className="md:text-lg text-md font-medium bg-green-500 rounded-sm text-white/90 py-1 hover:bg-green-400 cursor-pointer">
            Login
          </button>
          {/* Sign-up Link */}
          <div className="flex items-center gap-4 ">
            <p className="text-black/70">Not Registered yet?</p>
            <Link
              className="md:text-lg text-md text-blue-800 hover:text-blue-500"
              to="/signup"
            >
              Create an Account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
