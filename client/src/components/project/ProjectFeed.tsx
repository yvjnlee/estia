import React from "react";
import { useProject } from "../../context/ProjectContext";
import Project from "./Project";

export const ProjectFeed: React.FC = () => {

    const { projects } = useProject();

  return (
    <div className="projects-container">
      {projects.length > 0 ? (
        projects.map((project, index) => (
          <div className="project-row" key={index} data-scroll-section>
            <Project
              title={project.title}
              tech1={project.tech1}
              tech2={project.tech2}
              colour={project.colour}
              descript={project.descript}
            />
          </div>
        ))
      ) : (
        <p>No projects found</p>
      )}
    </div>
  );
};
