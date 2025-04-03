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
    // If no userData is found, redirect to login page
    if (!userData) {
      navigate("/login");
    }
    // API request to check user authentication
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/auth/profile`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setIsLoading(false); // Stop loading after successful response
          dispatch(getProfile(res.data.user)); // Store user profile in Redux
        }
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        localStorage.removeItem("AccessToken");
        dispatch(signOutSuccess()); //  Clear Redux state
        navigate("/login"); // Redirect to login if authentication fails
      });
  }, [navigate, dispatch, userData]); // Dependencies for the effect

  // Show loading message until authentication check is complete
  if (isLoading) {
    return <div className="text-3xl text-center">Loading...</div>;
  }

  // Render children components if authentication is successful
  return <div>{children}</div>;
}

export default UserProtectWrapper;
