import React, { useEffect, useState } from "react";
import { ProjectInfo, ProjectsDB } from "../../types/project";

import { Link } from "react-router-dom";
import { supabase } from "../../common/clients";
import { User } from "../../common/types";

export const UserSaved: React.FC = () => {
    const [savedProjects, setSavedProjects] = useState<ProjectInfo[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setUser(session?.user || null);
        };
        fetchSession();
    }, []);

    useEffect(() => {
        const fetchUserSaved = async () => {
            try {
                if (user) {
                    console.log("User fetched successfully:", user); // Debug user
                    const { data: savedData, error: savedError } = await supabase
                        .from("saved_projects")
                        .select("project_id")
                        .eq("profile_id", user.id);

                    if (savedError) {
                        console.error("Error fetching saved projects:", savedError);
                        return;
                    }

                    console.log("Saved projects fetched:", savedData); // Debug savedData

                    if (savedData && savedData.length > 0) {
                        const projectIds = savedData.map(
                            (row: { project_id: string }) => row.project_id
                        );
                        console.log("Project IDs to fetch:", projectIds); // Debug project IDs

                        const { data: projectsData, error: projectsError } = await supabase
                            .from("estia_projects")
                            .select("*")
                            .in("project_id", projectIds);

                        if (projectsError) {
                            console.error("Error fetching project details:", projectsError);
                            return;
                        }

                        console.log("Estia projects data:", projectsData);

                        const mappedProjects: ProjectInfo[] = projectsData.map(
                            (row: ProjectsDB) => ({
                                projectName: row.project_name,
                                createdAt: row.created_at,
                                tech1: row.tech1,
                                tech2: row.tech2,
                                colour: row.colour,
                                description: row.description,
                                videoId: row.video_Id,
                                repoPath: row.repo_Path,
                                projectId: row.project_id,
                                difficulty: row.difficulty,
                            })
                        );

                        setSavedProjects(mappedProjects);
                    }
                } else {
                    console.log("No user found."); // Debug when no user
                }
            } catch (err) {
                console.error("Error fetching saved projects:", err);
            }
        };

        fetchUserSaved();
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
