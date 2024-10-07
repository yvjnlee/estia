import React, { useEffect, useState } from "react";
import { ProjectInfo, ProjectsDB } from "../../types/project";
import { useAuth } from "../../context";

export const UserProjects: React.FC = () => {
    const { supabase, user } = useAuth();
    const [userProjects, setUserProjects] = useState<ProjectInfo[]>([]);

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
            {userProjects.length > 0 ? (
                userProjects.map((project: ProjectInfo, index: number) => (
                    <div key={index}>
                        <p>{project.projectName}</p>
                    </div>
                ))
            ) : (
                <p>No projects found.</p>
            )}
        </>
    );
};
