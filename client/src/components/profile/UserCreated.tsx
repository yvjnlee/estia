import React, { useEffect, useState } from "react";
import { ProjectInfo, ProjectsDB } from "../../types/project";
// import { useNavigate } from "react-router-dom";
import { supabase } from "../../common/clients";

import ProjectCard from "../project/ProjectCard";
import { User } from "../../common/types";

export const UserCreated: React.FC = () => {
    const [userProjects, setUserProjects] = useState<ProjectInfo[]>([]);
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

    // const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProjects = async () => {
            try {
                if (user) {
                    const { data, error } = await supabase
                        .from("estia_projects")
                        .select("*")
                        .eq("created_by", user.id);

                    if (error) {
                        console.log("Error fetching projects:", error);
                        return;
                    }

                    if (data) {
                        const mappedData: ProjectInfo[] = data.map((row: ProjectsDB) => ({
                            projectId: row.project_id,
                            projectName: row.project_name,
                            createdAt: row.created_at,
                            tech1: row.tech1,
                            tech2: row.tech2,
                            colour: row.colour,
                            description: row.description,
                            videoId: row.video_Id,
                            repoPath: row.repo_Path,
                            difficulty: row.difficulty,
                        }));

                        setUserProjects(mappedData);
                    }
                }
            } catch (err) {
                console.error("Error:", err);
            }
        };

        fetchUserProjects();
    }, [supabase, user]);

    return (
        <>
            <h2 className="saved-heading">Your Created Projects</h2>
            <div className="outer-saved-section-div">
                <div className="project-theme-section">
                    {userProjects.length > 0 ? (
                        userProjects.map((project: ProjectInfo, index: number) => (
                            <ProjectCard
                                key={index}
                                projectName={project.projectName}
                                tech1={project.tech1}
                                tech2={project.tech2}
                                difficulty={project.difficulty || "Beginner"} // Default difficulty if null
                                createdAt={project.createdAt} // Pass createdAt
                                colour={project.colour} // Pass colour
                            />
                        ))
                    ) : (
                        <p>No projects found.</p>
                    )}
                </div>
            </div>
        </>
    );
};
