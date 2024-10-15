import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchAPI } from "../../utils/fetchAPI";
import { Project, ProjectDB } from "../../common/types";
import { RootState } from "../store";

interface ProjectState {
    projects: ProjectDB[] | null;
    projectsLoading: boolean;
    projectsError: string | null;
    searchFilter: string;
    techStackFilter: string[];
    themeFilter: string[];
    difficultyFilter: string;
}

const initialState: ProjectState = {
    projects: null,
    projectsLoading: false,
    projectsError: null,
    searchFilter: '',
    techStackFilter: [],
    themeFilter: [],
    difficultyFilter: '',
};

// Thunks
export const createProject = createAsyncThunk(
    "projects/createProject",
    async (newProject: Project) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/projects/`,
            "POST",
            newProject
        );
    }
);

export const fetchProjects = createAsyncThunk("projects/fetchProjects", async () => {
    return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects/`, "GET");
});

export const fetchProjectById = createAsyncThunk(
    "projects/fetchProjectById",
    async (id: string) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects/id/${id}`, "GET");
    }
);

export const fetchProjectByName = createAsyncThunk(
    "projects/fetchProjectByName",
    async (projectName: string) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/projects/name/${projectName}`,
            "GET"
        );
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
            `${process.env.REACT_APP_API_BASE_URL}/projects/user/${userId}`,
            "GET"
        );
    }
);

export const fetchUserSavedProjects = createAsyncThunk(
    "projects/fetchUserSavedProjects",
    async (userId: string) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/projects/saved/${userId}`,
            "GET"
        );
    }
);

export const fetchUserLikedProjects = createAsyncThunk(
    "projects/fetchUserLikedProjects",
    async (userId: string) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects/liked/${userId}`, "GET");
    }
);

export const saveProject = createAsyncThunk(
    "projects/saveProject",
    async ({ projectId, userId }: { projectId: string; userId: string }) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects/save/${projectId}/${userId}`, "POST");
    }
);

export const likeProject = createAsyncThunk(
    "projects/likeProject",
    async ({ projectId, userId }: { projectId: string; userId: string }) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/projects/like/${projectId}/${userId}`, "POST");
    }
);

const projectSlice = createSlice({
    name: "projects",
    initialState,
    reducers: {
        // Add reducers for updating filter states
        setSearchFilter: (state, action: PayloadAction<string>) => {
            state.searchFilter = action.payload;
        },
        setTechStackFilter: (state, action: PayloadAction<string[]>) => {
            state.techStackFilter = action.payload;
        },
        setThemeFilter: (state, action: PayloadAction<string[]>) => {
            state.themeFilter = action.payload;
        },
        setDifficultyFilter: (state, action: PayloadAction<string>) => {
            state.difficultyFilter = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProjects.pending, (state) => {
                state.projectsLoading = true;
            })
            .addCase(fetchProjects.fulfilled, (state, action) => {
                state.projectsLoading = false;
                state.projects = action.payload;
            })
            .addCase(fetchProjects.rejected, (state, action) => {
                state.projectsLoading = false;
                state.projectsError = action.error.message || "An error occurred while fetching projects";
            })
            .addCase(createProject.pending, (state) => {
                state.projectsLoading = true;
            })
            .addCase(createProject.fulfilled, (state, action) => {
                state.projectsLoading = false;
                state.projects = state.projects ? [...state.projects, action.payload] : [action.payload];
            })
            .addCase(createProject.rejected, (state, action) => {
                state.projectsLoading = false;
                state.projectsError = action.error.message || "An error occurred while creating projects";
            })
            .addCase(updateProject.pending, (state) => {
                state.projectsLoading = true;
            })
            .addCase(updateProject.fulfilled, (state, action) => {
                state.projectsLoading = false;
                if (state.projects) {
                    const index = state.projects.findIndex(p => p.project_id === action.payload.project_id);
                    if (index !== -1) {
                        state.projects[index] = action.payload;
                    }
                }
            })
            .addCase(updateProject.rejected, (state, action) => {
                state.projectsLoading = false;
                state.projectsError = action.error.message || "An error occurred while updating projects";
                
            })
            .addCase(deleteProject.pending, (state) => {
                state.projectsLoading = true;
            })
            .addCase(deleteProject.fulfilled, (state, action) => {
                state.projectsLoading = false;
                if (state.projects) {
                    state.projects = state.projects.filter(p => p.project_id !== action.payload);
                }
            })
            .addCase(deleteProject.rejected, (state, action) => {
                state.projectsLoading = false;
                state.projectsError = action.error.message || "An error occurred while deleting projects";
            });
    },
});

// Export action creators
export const { setSearchFilter, setTechStackFilter, setThemeFilter, setDifficultyFilter } = projectSlice.actions;

export default projectSlice.reducer;
