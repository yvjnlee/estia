/* eslint-disable indent */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAPI } from "../../utils/fetchAPI";
import { Project } from "../../common/types";

interface ProjectState {
    projects: Project[] | null;
    projectsLoading: boolean;
    projectsError: string | null;
}

const initialState: ProjectState = {
    projects: null,
    projectsLoading: false,
    projectsError: null,
};

// Thunks
export const createProject = createAsyncThunk(
    "projects/createProject",
    async (newProject: Project) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects`, "POST", newProject);
    }
);

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
    return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects`, "GET");
});

export const fetchProjectById = createAsyncThunk(
    "projects/fetchProjectById",
    async (id: string) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects/${id}`, "GET");
    }
);

export const updateProject = createAsyncThunk(
    "projects/updateProject",
    async ({ id, updates }: { id: string; updates: Partial<Project> }) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/projects/${id}`,
            "PATCH",
            updates
        );
    }
);

export const deleteProject = createAsyncThunk("projects/deleteProject", async (id: string) => {
    await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects/${id}`, "DELETE");
    return id;
});

export const fetchUserProjects = createAsyncThunk(
    "projects/fetchUserProjects",
    async (userId: string) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/users/${userId}/projects`,
            "GET"
        );
    }
);

export const searchProjects = createAsyncThunk(
    "projects/searchProjects",
    async (params: { searchQuery?: string; techStack?: string[] }, { getState }) => {
        const state = getState() as { projects: { projects: Project[] } };
        const { projects } = state.projects;

        const lowercasedQuery = params.searchQuery?.toLowerCase();
        const selectedTechStack = params.techStack;

        if (lowercasedQuery && selectedTechStack) {
            const filtered = projects?.filter((project) => {
                const matchesSearchQuery =
                    project.projectName?.toLowerCase().includes(lowercasedQuery) ||
                    project.description?.toLowerCase().includes(lowercasedQuery);

                const matchesTechStack =
                    selectedTechStack.length === 0 ||
                    selectedTechStack.some(
                        (tech) => project.tech1 === tech || project.tech2 === tech
                    );

                return matchesSearchQuery && matchesTechStack;
            });

            // Return the filtered projects instead of modifying state directly
            return filtered;
        }
        // If no filtering is done, return the original projects
        return projects;
    }
);

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchProjects.pending, (state) => {
                state.projectsLoading = true;
                state.projectsError = null;
            })
            .addCase(searchProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
                state.projectsLoading = false;
                state.projects = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.projectsLoading = true;
                    state.projectsError = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/fulfilled"),
                (state, action: PayloadAction<Project | Project[]>) => {
                    state.projectsLoading = false;

                    if (Array.isArray(action.payload)) {
                        // Handle fetchProjects and fetchUserProjects
                        state.projects = action.payload;
                    } else if (action.payload) {
                        // Handle create/update actions
                        if (
                            action.type.startsWith("projects/createProject") ||
                            action.type.startsWith("projects/updateProject")
                        ) {
                            state.projects = state.projects
                                ? [
                                      ...state.projects.filter(
                                          (p) =>
                                              p.projectId !==
                                              (Array.isArray(action.payload)
                                                  ? action.payload[0].projectId
                                                  : action.payload.projectId)
                                      ),
                                      Array.isArray(action.payload)
                                          ? action.payload[0]
                                          : action.payload,
                                  ]
                                : [
                                      Array.isArray(action.payload)
                                          ? action.payload[0]
                                          : action.payload,
                                  ];
                        }
                    }
                }
            );
    },
});

export default projectSlice.reducer;
