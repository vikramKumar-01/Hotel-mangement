// pages/ProfilePage.js
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProfilePageWithoutlogin = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/auth"); // redirect to login/signup
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null; // Optional: loading state

  return (
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-3xl font-bold">Welcome to your profile!</h1>
    </div>
  );
};

export default ProfilePageWithoutlogin;
