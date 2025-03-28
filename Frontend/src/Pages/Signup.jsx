import React, { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { validateEmail } from "../utils/helper";
function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();

    if(!name){
      setError("please enter your name")
      return 
    }

    if (!validateEmail(email)) {
      setError("please enter valid email address");
      return;
    }

    if (!password) {
      setError("please enter a password");
      return;
    }
    setError("");
  };
  return (
    <>
    <div className="flex items-center justify-center h-[80vh] ">
      <div className=" p-6 bg-slate-200 w-1/3">
        <form onSubmit={handleSignup} className="flex flex-col gap-8">
          <h3 className="text-center text-3xl font-medium text-slate-700">
            Register
          </h3>
          <input
            className="w-full text-sm  border-2 bg-slate-100 border-slate-300 outline-none rounded-md py-2 px-2"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            Signup
          </button>
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
