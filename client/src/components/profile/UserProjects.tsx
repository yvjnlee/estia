import React, { useEffect, useState } from "react";
import { RootState, AppDispatch } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { fetchUserProjects } from "../../store/slices/projectSlice";
import { supabase } from "../../common/clients";
import { Project } from "../../common/types";

export const UserProjects: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { projects, projectsLoading, projectsError } = useSelector(
        (state: RootState) => state.projects
    );
    const [userId, setUserId] = useState<string>("");

    useEffect(() => {
        const fetchSession = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();
            setUserId(session?.user.id || "");
        };
        fetchSession();
    }, []);

    useEffect(() => {
        if (userId) {
            dispatch(fetchUserProjects(userId));
        }
    }, [dispatch, userId]);

    if (projectsLoading) return <div>Loading projects...</div>;
    if (projectsError) return <div>Error: {projectsError}</div>;

    return (
        <>
            {projects?.map((project: Project, index: number) => (
                <div key={project.projectId || index}>
                    <p>{project.projectName}</p>
                </div>
            ))}
        </>
    );
};
