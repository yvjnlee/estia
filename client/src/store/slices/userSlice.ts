/* eslint-disable indent */
/* eslint-disable no-undef */
import { createAsyncThunk, createSlice, PayloadAction, SerializedError } from "@reduxjs/toolkit";
import { fetchAPI } from "../../utils/fetchAPI";
import { User } from "../../common/types";
interface userState {
    users: User[] | null;
    usersLoading: boolean;
    usersError: string | null;
}

const initialState: userState = {
    users: null,
    usersLoading: false,
    usersError: null,
};

// Thunks
export const createUser = createAsyncThunk("users/createUser", async (newuser: User) => {
    return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/users/`, "POST", newuser);
});

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/users/`, "GET");
});

export const fetchUserById = createAsyncThunk("users/fetchUserById", async (id: string) => {
    return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/users/id/${id}`, "GET");
});

export const updateUser = createAsyncThunk(
    "users/updateUser",
    async ({ id, updates }: { id: string; updates: Partial<User> }) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/users/${id}`,
            "PATCH",
            updates
        );
    }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (id: string) => {
    await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/users/${id}`, "DELETE");
    return id;
});

export const fetchUserByUsername = createAsyncThunk(
    "users/fetchUserByUsername",
    async (username: string) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/users/username/${username}`,
            "GET"
        );
    }
);

// Slice
const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.users = action.payload;
                state.usersLoading = false;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.error.message || "An error occurred while fetching users";
            })
            .addCase(fetchUserById.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(fetchUserById.fulfilled, (state, action) => {
                if (state.users) {
                    state.users = state.users.map((user) =>
                        user.id === action.payload.id ? action.payload : user
                    );
                } else {
                    state.users = [action.payload];
                }
                state.usersLoading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.error.message || "An error occurred while fetching user";
            })
            .addCase(createUser.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(createUser.fulfilled, (state, action) => {
                state.usersLoading = false;
                state.users = state.users ? [...state.users, action.payload] : [action.payload];
            })
            .addCase(createUser.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.error.message || "An error occurred while creating user";
            })
            .addCase(updateUser.pending, (state) => {
                state.usersLoading = false;
            })
            .addCase(updateUser.fulfilled, (state, action) => {
                if (state.users) {
                    state.users = state.users.map((user) =>
                        user.id === action.payload.id ? action.payload : user
                    );
                }
                state.usersLoading = false;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.error.message || "An error occurred while updating user";
            })
            .addCase(deleteUser.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                if (state.users) {
                    state.users = state.users.filter((user) => user.id !== action.payload);
                }
                state.usersLoading = false;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.error.message || "An error occurred while deleting user";
            })
            .addCase(fetchUserByUsername.pending, (state) => {
                state.usersLoading = true;
            })
            .addCase(fetchUserByUsername.fulfilled, (state, action) => {
                if (state.users) {
                    state.users = state.users.map((user) =>
                        user.username === action.payload.username ? action.payload : user
                    );
                } else {
                    state.users = [action.payload];
                }
                state.usersLoading = false;
            })
            .addCase(fetchUserByUsername.rejected, (state, action) => {
                state.usersLoading = false;
                state.usersError = action.error.message || "An error occurred while fetching user";
            })
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.usersLoading = true;
                    state.usersError = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action: PayloadAction<unknown, string, never, SerializedError>) => {
                    state.usersLoading = false;
                    state.usersError = action.error.message || null;
                }
            );
    },
});

export default userSlice.reducer;
