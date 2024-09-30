// src/routes/AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectsRoutes from './ProjectRoutes';

import AddProjectPage from "../pages/AddProjectPage";
import { LandingPage } from '../pages/LandingPage';
import ProfileRoutes from './ProfileRoutes';
import PreferencePage from '../pages/PreferencePage';
import GiveProject from '../components/search/ai/GiveProjectPage';


const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/add-project/*" element={ <AddProjectPage /> } />
        <Route path="/preference/" element={ <PreferencePage /> } />
        <Route path="/preference/give-project" element={<GiveProject />} /> 
        <Route path="/project/*" element={ <ProjectsRoutes /> } />
        <Route path="/profile/*" element={ <ProfileRoutes /> } />
    </Routes>
  );
};

export default AppRoutes;
