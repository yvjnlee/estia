// src/routes/AppRoutes.tsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import ProjectsRoutes from "./ProjectRoutes";

import ScrollToTop from "../actions/ScrollToTop";

import AddProjectPage from "../pages/AddProjectPage";
import ProfileRoutes from "./ProfileRoutes";

import PreferencePage from "../pages/PreferencePage";
import GiveProject from "../components/search/ai/GiveProjectPage";
import ProjectGenerator from "../components/search/ai/ProjectGenerator"
import { Layout } from "../components/layout/Layout";
import { LoginPage } from "../pages/LoginPage";
import { LandingPage } from "../pages/LandingPage";

const AppRoutes = () => {
    return (
        <>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<LandingPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/add-project/*" element={<AddProjectPage />} />
                    <Route path="/preference/" element={<PreferencePage />} />
                    <Route path="/preference/give-project" element={<GiveProject />} />
                    <Route path="/preference/project-idea" element={<ProjectGenerator />} />

                    <Route path="/project/*" element={<ProjectsRoutes />} />
                    <Route path="/profile/*" element={<ProfileRoutes />} />
                </Route>
            </Routes>
        </>
    );
};

export default AppRoutes;
