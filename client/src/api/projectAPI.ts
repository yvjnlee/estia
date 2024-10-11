import { Project, ProjectDB } from "../common/types";
import {
    fetchProjectById,
    fetchProjectByName,
    fetchProjects,
    fetchUserLikedProjects,
    fetchUserProjects,
    fetchUserSavedProjects,
    saveProject,
    likeProject,
} from "../store/slices/projectSlice";
import { AppDispatch } from "../store/store";

const mapProjectData = (project: ProjectDB) => {
    return {
        projectName: project.project_name,
        createdAt: project.created_at,
        tech1: project.tech1,
        tech2: project.tech2,
        colour: project.colour,
        description: project.description,
        videoId: project.video_Id,
        repoPath: project.repo_Path,
        projectId: project.project_id,
        theme: project.theme,
        difficulty: project.difficulty,
    };
};

export const getProjects = async (dispatch: AppDispatch) => {
    const projects = await dispatch(fetchProjects()).unwrap();
    const mappedProjects = projects.map((project: ProjectDB) => mapProjectData(project));
    return mappedProjects;
};

export const getProject = async (dispatch: AppDispatch, projectId: string) => {
    const project = await dispatch(fetchProjectById(projectId)).unwrap();
    return mapProjectData(project);
};

export const getProjectByName = async (dispatch: AppDispatch, projectName: string) => {
    const project = await dispatch(fetchProjectByName(projectName)).unwrap();
    return mapProjectData(project);
};

export const getUserProjects = async (dispatch: AppDispatch, userId: string) => {
    const projects = await dispatch(fetchUserProjects(userId)).unwrap();
    const mappedProjects = projects.map((project: ProjectDB) => mapProjectData(project));
    return mappedProjects;
};

export const getUserSavedProjects = async (dispatch: AppDispatch, userId: string) => {
    const projects = await dispatch(fetchUserSavedProjects(userId)).unwrap();
    const mappedProjects = projects.map((project: ProjectDB) => mapProjectData(project));
    return mappedProjects;
};

export const getUserLikedProjects = async (dispatch: AppDispatch, userId: string) => {
    const projects = await dispatch(fetchUserLikedProjects(userId)).unwrap();
    const mappedProjects = projects.map((project: ProjectDB) => mapProjectData(project));
    return mappedProjects;
};

export const filterProjects = async (projects: Project[], searchFilter?: string, techStackFilter?: string[], themeFilter?: string[], difficultyFilter?: string) => {
    if (!searchFilter && !techStackFilter && !themeFilter && !difficultyFilter) return projects;

    if (!projects) return [];

    const filteredProjects = projects.filter((project: Project) => {
        const matchesSearch =
            project.projectName?.toLowerCase().includes(searchFilter?.toLowerCase() || "") ||
            project.description?.toLowerCase().includes(searchFilter?.toLowerCase() || "");

        const matchesTechStack =
            !techStackFilter?.length ||
            techStackFilter.some((tech) => project?.tech1 === tech || project?.tech2 === tech);

        const matchesTheme = !themeFilter?.length || themeFilter?.some((theme) => project?.theme === theme);

        const matchesDifficulty = !difficultyFilter || project.difficulty === difficultyFilter;

        return matchesSearch && matchesTechStack && matchesTheme && matchesDifficulty;
    })

    return filteredProjects;
};

export const toggleSaveProject = async (dispatch: AppDispatch, projectId: string, userId: string) => {
    const project = await dispatch(saveProject({ projectId, userId })).unwrap();
    return mapProjectData(project);
};

export const toggleLikeProject = async (dispatch: AppDispatch, projectId: string, userId: string) => {
    const project = await dispatch(likeProject({ projectId, userId })).unwrap();
    return mapProjectData(project);
};