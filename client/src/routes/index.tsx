import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectsRoutes from './ProjectRoutes';

import { LandingPage } from '../pages/LandingPage';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* Project Routes */}
        <Route path="/project/*" element={ <ProjectsRoutes /> } />
    </Routes>
  );
};

export default AppRoutes;
