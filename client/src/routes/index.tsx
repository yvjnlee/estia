// src/routes/AppRoutes.tsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectsRoutes from './ProjectRoutes';

import AddProjectPage from "../pages/AddProjectPage";
import { LandingPage } from '../pages/LandingPage';
import PreferencePage from '../pages/PreferencePage';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />

            {/* Wrap the nested routes with AppLayout without repeating the path */}
                <Route path="/preference" element={<PreferencePage />} />
                <Route path="/add-project" element={<AddProjectPage />} />
                <Route path="/project/*" element={<ProjectsRoutes />} />
  
        </Routes>
    );
};

export default AppRoutes;
