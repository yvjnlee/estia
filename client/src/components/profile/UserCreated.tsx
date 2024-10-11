import React, { useEffect, useState } from "react";
import { ProjectInfo, ProjectsDB } from "../../types/project";
import { supabase } from "../../common/clients";

import ProjectCard from "../project/ProjectCard";
import { User } from "../../common/types";
import { getSession } from "../../api/authAPI";
import { getUserProjects } from "../../api/projectAPI";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const UserCreated: React.FC = () => {
    const dispatch = useAppDispatch();
    const [userProjects, setUserProjects] = useState<ProjectInfo[]>([]);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        getSession().then((session) => {    
            setUser(session?.user || null);
        });
    }, []);

    // const navigate = useNavigate();

    useEffect(() => {
        try {
            if (user) {
                getUserProjects(dispatch, user.id).then((projects) => {
                    setUserProjects(projects);
                });
            }
        } catch (err) {
            console.error("Error:", err);
        }
    }, [user]);

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
