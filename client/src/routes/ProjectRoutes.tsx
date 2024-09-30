import React from "react";
import { Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import ProjectDetails from "../components/project/ProjectDetails";
import { useProject } from "../context/ProjectContext";

const ProjectsRoutes = () => {
  const { projects } = useProject();
  
  return (
    <Routes>
      {/* need to change home page home */}
      <Route path="/" element={<HomePage />} />

      {/* <Route path=":projectId" element={<ProjectDetails />} /> */}

      {projects.map((project, index) => (
        <Route
          key={index}
          path={`/${project.project_name}`}
          element={<ProjectDetails />}
        />
      ))}
    </Routes>
  );
};

export default ProjectsRoutes;
