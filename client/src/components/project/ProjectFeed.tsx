import React from "react";
import { useProject } from "../../context/ProjectContext";
import Project from "./ProjectCard";

export const ProjectFeed: React.FC = () => {
  const { projects } = useProject();

  return (
    <div className="projects-container">
      {projects?.length > 0 ? (
        projects.map((project, index) => (
          <div className="project-row" key={index} data-scroll-section>
            <Project
              projectName={project.projectName}
              createdAt={project.createdAt}
              tech1={project.tech1}
              tech2={project.tech2}
              colour={project.colour}
              description={project.description}
            />
          </div>
        ))
      ) : (
        <h3>No projects found</h3>
      )}
    </div>
  );
};
