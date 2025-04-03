import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, signOutSuccess } from "../Redux/userSlice";

function UserProtectWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const token = localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {

    if (!token) {
      navigate("/login");
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false);
          dispatch(getProfile(res.data.user));
        }
      }).catch((err) => {
        console.error("Auth check failed:", err);
        localStorage.removeItem("AccessToken"); // ✅ Remove expired token
        dispatch(signOutSuccess()); // ✅ Clear Redux state
        navigate("/login"); // ✅ Redirect if session is invalid
      });
  }, [navigate, dispatch, token]);

  if (isLoading) {
    return <div className="text-3xl text-center">Loading...</div>;
  }
  return <div>{children}</div>;
}

export default UserProtectWrapper;
