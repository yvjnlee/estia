import React, { useEffect, useState } from "react";
import { AppDispatch } from "../../store/store";
import { useDispatch } from "react-redux";
import { Project } from "../../common/types";
import { getUserProjects } from "../../api/projectAPI";
import { ProfileProps } from "../../types";

export const UserProjects: React.FC<ProfileProps> = ({ profile }) => {
    const dispatch = useDispatch<AppDispatch>();
    const userId = profile?.id;

    const [projects, setProjects] = useState<Project[]>([]);
    const [projectsLoading, setProjectsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (userId) {
            setProjectsLoading(true);
            getUserProjects(dispatch, userId)
                .then((fetchedProjects) => {
                    setProjects(fetchedProjects || []);
                    setProjectsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching user projects:", err);
                    setProjectsLoading(false);
                });
        } else {
            setProjectsLoading(false);
        }
    }, [dispatch, userId]);

    if (projectsLoading) return <div className="loading">

    <div className="loading-animation">
        <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
        <div className="box">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
</div>;
    if (projects.length === 0) return <div>No projects found.</div>;

    return (
        <>
            {projects.map((project: Project, index: number) => (
                <div key={project.projectId || `project-${index}`}>
                    <p>{project.projectName || "Unnamed Project"}</p>
                </div>
            ))}
        </>
    );
};
