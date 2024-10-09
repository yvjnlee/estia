import React from "react";
import { Link } from "react-router-dom";
import { Project } from "../../common/types";

const ProjectCard: React.FC<Project> = ({ projectName, tech1, tech2, colour }) => {
    const containerStyle: React.CSSProperties = {
        backgroundColor: colour,
        cursor: "pointer",
        height: "13rem",
        width: "20.36rem",
        borderRadius: "4px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        transition: "transform 0.3s ease, filter 0.3s ease",
    };

    return (
        <Link to={`/project/${projectName}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="project-container" style={containerStyle}>
                <h2 className="project-title">{projectName}</h2>
                <div className="project-tech">
                    <span className="tech-item">{tech1}</span>
                    <span className="tech-item">{tech2}</span>
                </div>
            </div>
        </Link>
    );
};

export default ProjectCard;
