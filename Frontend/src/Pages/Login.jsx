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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("please enter valid email address");
      return;
    }

    if (!password) {
      setError("please enter a password");
      return;
    }
    setError("");

    // login api
    try {
      dispatch(signinStart);

      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true }
      );
      if (response.data.success === false) {
        dispatch(signInFailure(response.data.message));
        toast.error(response.data.message)
      }
      toast.success(response.data.message)
      dispatch(signInSuccess(response.data.user));

      navigate("/");
    } catch (error) {
      toast.error(error.message)
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="flex items-center justify-center h-[80vh] ">
      <div className=" p-6 bg-slate-200 w-1/3">
        <form onSubmit={handleLogin} className="flex flex-col gap-8">
          <h3 className="text-center text-3xl font-medium text-slate-700">
            Login
          </h3>
          <input
            className="w-full text-sm  border-2 bg-slate-100 border-slate-300 outline-none rounded-md py-2 px-2"
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="flex items-center border-2 rounded-md px-1  bg-slate-100 border-slate-300 ">
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
              {isShowPassword ? <FaEyeSlash size={25} /> : <FaEye size={25} />}
            </div>
          </div>
          {error && <p className="text-sm text-red-400 ">{error}</p>}
          <button className="text-lg font-medium bg-green-500 rounded-sm text-white/90 py-1 hover:bg-green-400 cursor-pointer">
            Login
          </button>
          <div className="flex items-center gap-4 ">
            <p className="text-black/70">Not Registered yet?</p>
            <Link
              className="text-lg text-blue-800 hover:text-blue-500"
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
