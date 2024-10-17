import React, { useEffect, useState } from "react";
import { ProjectInfo, ProjectsDB } from "../../types/project";

import { Link } from "react-router-dom";
import { supabase } from "../../common/clients";
import { User } from "../../common/types";
import { getSession } from "../../api/authAPI";
import { getUserSavedProjects } from "../../api/projectAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import ProjectCard from "../project/ProjectCard";

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
                            <ProjectCard
                            key={index}
                            projectId={project.projectId}
                            projectName={project.projectName}
                            tech1={project.tech1}
                            tech2={project.tech2}
                            difficulty={project.difficulty || "Beginner"} // Default difficulty if null
                            createdAt={project.createdAt} // Pass createdAt
                            colour={project.colour} // Pass colour
                        />
                        ))}
                    </div>
                ) : (
                    <p>No saved projects found.</p>
                )}
            </div>
        </>
    );
};
