import React from "react";
import { Link } from "react-router-dom";
import { ProjectInfo } from "../../types/project";

const ProjectCard: React.FC<ProjectInfo> = ({ projectName, tech1, tech2, difficulty, }) => {
    const containerStyle: React.CSSProperties = {
        //backgroundColor: colour,
        backgroundColor: "#151B23",
        cursor: "pointer",
        height: "13rem",
        width: "27rem",
        borderRadius: "4px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        transition: "transform 0.3s ease, filter 0.3s ease",
        // border: "2px solid grey",
    };

    return (
        <Link to={`/project/${projectName}`} style={{ textDecoration: "none", color: "inherit" }}>
            <div className="project-container" style={containerStyle}>
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
