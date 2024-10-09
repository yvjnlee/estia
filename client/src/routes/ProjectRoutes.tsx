import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProjectDetails from "../components/project/ProjectDetails";
import { RootState } from "../store/store";
import { useSelector } from "react-redux";

const ProjectsRoutes = () => {
    const { projects, projectsLoading } = useSelector((state: RootState) => state.projects);

    // Add check for projects before trying to map over them
    if (!projects || !Array.isArray(projects) || projectsLoading) {
        return <div>Loading projects...</div>;
    }

    return (
        <Routes>
            {/* need to change home page home */}
            <Route path="/" element={<HomePage />} />

            {/* <Route path=":projectId" element={<ProjectDetails />} /> */}

            {projects.map((project, index) => (
                <Route key={index} path={`/${project.projectName}`} element={<ProjectDetails />} />
            ))}
        </Routes>
    );
};

export default ProjectsRoutes;
