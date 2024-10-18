import React from "react";
import { Link } from "react-router-dom";
import { Project } from "../../common/types/";

const ProjectCard: React.FC<Project> = ({ projectId, projectName, tech1, tech2, difficulty, }) => {
    return (
        <Link to={`/project/${projectId}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="project-container">
                <h2 className={`project-difficulty ${difficulty?.toLowerCase() || "beginner"}`}>
                    {difficulty || "Beginner"}
                </h2>           
                <h2 className="project-title">{projectName}</h2>
                <div className="project-tech">
                    <span className="tech-item">
                        {tech1}
                        {tech2 ? `, ${tech2}` : ""}
                    </span>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;