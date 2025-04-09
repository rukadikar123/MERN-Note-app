import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getProfile, signOutSuccess } from "../Redux/userSlice";

function UserProtectWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const userData = localStorage.getItem("AccessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      if (!userData) {
        navigate("/login");
        return;
      }
  
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/profile`, {
          withCredentials: true,
        });
  
        if (res.status === 200) {
          setIsLoading(false);
          dispatch(getProfile(res?.data?.user));
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        localStorage.removeItem("AccessToken");
        dispatch(signOutSuccess());
        navigate("/login");
      }
    };
  
    checkAuth();
  }, [navigate, dispatch, userData]); // Dependencies for the effect

  // Show loading message until authentication check is complete
  if (isLoading) {
    return <div className="text-3xl text-center">Loading...</div>;
  }

  // Render children components if authentication is successful
  return <div>{children}</div>;
}

export default UserProtectWrapper;
