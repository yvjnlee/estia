import React from "react";
import Project from "./ProjectCard";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";

export const ProjectFeed: React.FC = () => {
    const { projects } = useSelector((state: RootState) => state.projects);

    return (
        <div className="projects-container">
            {projects && projects.length > 0 ? (
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
