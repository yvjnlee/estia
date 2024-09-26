import React from "react";
import { Routes, Route } from "react-router-dom";
import { projects } from "../components/LocomotiveScrollBar";

import HomePage from "../pages/HomePage";
import ProjectDetails from "../components/project/ProjectDetails";

const ProjectsRoutes = () => {
  return (
    <Routes>
      {/* need to change home page home */}
      <Route path="/" element={<HomePage />} />

      {/* <Route path=":projectId" element={<ProjectDetails />} /> */}

      {projects.map((project, index) => (
        <Route
          key={index}
          path={`/${project.title}`}
          element={<ProjectDetails />}
        />
      ))}
    </Routes>
  );
};

export default ProjectsRoutes;
