import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { Project } from "../../common/types";
import { filterProjects, getProjects } from "../../api/projectAPI";

export const ProjectFeed: React.FC = () => {
    const dispatch = useAppDispatch();
    const { projectsLoading } = useSelector((state: RootState) => state.projects);
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [allProjects, setAllProjects] = useState<Project[] | null>(null);

    const { searchFilter, techStackFilter, themeFilter, difficultyFilter } = useSelector((state: RootState) => state.projects);

    useEffect(() => {
        getProjects(dispatch).then((projects) => {
            setAllProjects(projects);
            setProjects(projects);
        });
    }, [dispatch]);
    
    useEffect(() => {
        if (allProjects && projects) {
            filterProjects(allProjects, searchFilter, techStackFilter, themeFilter, difficultyFilter)
                .then((filteredProjects) => {
                    if (filteredProjects) {
                        setProjects(filteredProjects);
                    }
                });
        }
    }, [searchFilter, techStackFilter, themeFilter, difficultyFilter]);

    return (
        <>
            {projectsLoading && <div className="loading-overlay"><div className="loading-spinner"></div></div>}

            {projects && projects.length > 0 && (
                <div className="projects-container">
                {projects && projects.length > 0 ? (
                    projects.map((project, index) => (
                        <div className="project-row" key={index} data-scroll-section>
                            <ProjectCard
                                projectName={project.projectName}
                                createdAt={project.createdAt}
                                tech1={project.tech1}
                                tech2={project.tech2}
                                colour={project.colour}
                                description={project.description}
                                difficulty={project.difficulty}
                            />
                        </div>
                    ))
                ) : (
                    <h3>No projects found</h3>
                )}
                </div>
            )}
        </>
    );
};
