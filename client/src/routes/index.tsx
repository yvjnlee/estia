// src/routes/AppRoutes.tsx
import { Route, Routes } from "react-router-dom";
import ProjectsRoutes from "./ProjectRoutes";

import ScrollToTop from "../actions/ScrollToTop";

import AddProjectPage from "../pages/AddProjectPage";
import { LandingPage } from "../pages/LandingPage";
import ProfileRoutes from "./ProfileRoutes";

import PreferencePage from "../pages/PreferencePage";
import GiveProject from "../components/search/ai/GiveProjectPage";
import ProjectGenerator from "../components/search/ai/ProjectGenerator"

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/add-project/*" element={<AddProjectPage />} />
                
                <Route path="/preference/" element={<PreferencePage />} />
                <Route path="/preference/give-project" element={<GiveProject />} />
                <Route path="/preference/project-idea" element={<ProjectGenerator />} />

                <Route path="/project/*" element={<ProjectsRoutes />} />
                <Route path="/profile/*" element={<ProfileRoutes />} />
            </Routes>
        </>

    );
};

export default AppRoutes;
