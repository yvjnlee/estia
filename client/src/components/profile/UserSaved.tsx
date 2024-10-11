import React, { useEffect, useState } from "react";
import { ProjectInfo, ProjectsDB } from "../../types/project";

import { Link } from "react-router-dom";
import { supabase } from "../../common/clients";
import { User } from "../../common/types";
import { getSession } from "../../api/authAPI";
import { getUserSavedProjects } from "../../api/projectAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const UserSaved: React.FC = () => {
    const [savedProjects, setSavedProjects] = useState<ProjectInfo[]>([]);
    const [user, setUser] = useState<User | null>(null);
    const dispatch = useAppDispatch();

    useEffect(() => {
        getSession().then((session) => {
            setUser(session?.user || null);
        });
    }, []);

    useEffect(() => {
        if (user) {
            getUserSavedProjects(dispatch, user.id).then((projects) => {
                setSavedProjects(projects || []);
            });
        }   
    }, [user]);

    const containerStyle: React.CSSProperties = {
        //backgroundColor: colour,
        backgroundColor: "#151B23",
        cursor: "pointer",
        height: "13rem",
        width: "18rem",
        marginTop: "1rem",
        borderRadius: "4px",
        padding: "24px",
        display: "flex",
        justifyContent: "flex-start",
        transition: "transform 0.3s ease, filter 0.3s ease",
        // border: "2px solid grey",
    };

    return (
        <>
            <h2 className="saved-heading">Saved Projects</h2>
            <div className="outer-saved-section-div">
                {savedProjects.length > 0 ? (
                    <div className="project-theme-section">
                        {savedProjects.map((project: ProjectInfo, index: number) => (
                            <Link
                                to={`/project/${project.projectName}`}
                                style={{ textDecoration: "none", color: "inherit" }}
                                key={index}
                            >
                                <div className="project-container" style={containerStyle}>
                                    <h2
                                        className={`project-difficulty ${project.difficulty?.toLowerCase() || "beginner"}`}
                                    >
                                        {project.difficulty || "Beginner"}
                                    </h2>
                                    <h2 className="project-title">{project.projectName}</h2>
                                    <div className="project-tech">
                                        <span className="tech-item">
                                            {project.tech1}
                                            {project.tech2 ? `, ${project.tech2}` : ""}
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p>No saved projects found.</p>
                )}
            </div>
        </>
    );
};
