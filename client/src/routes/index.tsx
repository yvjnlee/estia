import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectsRoutes from './ProjectRoutes';

import { LandingPage } from '../pages/LandingPage';
import ProfileRoutes from './ProfileRoutes';

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/project/*" element={ <ProjectsRoutes /> } />
        <Route path="/profile/*" element={ <ProfileRoutes /> } />
    </Routes>
  );
};

export default AppRoutes;
