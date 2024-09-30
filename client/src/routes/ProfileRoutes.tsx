import React from "react";
import { Routes, Route } from "react-router-dom";
import { ProfilePage } from "../pages/ProfilePage";

const ProfileRoutes = () => {
  
  return (
    <Routes>
      <Route path=":username" element={<ProfilePage />} />
    </Routes>
  );
};

export default ProfileRoutes;
