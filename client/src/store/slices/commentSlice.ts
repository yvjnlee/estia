import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../utils/fetchAPI";
import { Comment, CommentDB } from "../../common/types";

interface CommentState {
    comments: CommentDB[] | null;
    commentsLoading: boolean;
    commentsError: string | null;
}

const initialState: CommentState = {
    comments: null,
    commentsLoading: false,
    commentsError: null,
};

// Thunks
export const createComment = createAsyncThunk(
    "comments/createComment",
    async (newComment: Omit<Comment, 'commentId'>) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/comments/`,
            "POST",
            newComment
        );
    }
);

export const fetchAllComments = createAsyncThunk("comments/fetchComments", async () => {
    return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/comments/`, "GET");
});

export const fetchCommentById = createAsyncThunk(
    "comments/fetchCommentById",
    async (id: string) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`, "GET");
    }
);

export const updateComment = createAsyncThunk(
    "comments/updateComment",
    async ({ commentId, updates }: { commentId: string; updates: Partial<Comment> }) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/comments/${commentId}`,
            "PATCH",
            updates
        );
    }
);

export const deleteComment = createAsyncThunk("comments/deleteComment", async (id: string) => {
    await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`, "DELETE");
    return id;
});

export const fetchCommentsByProject = createAsyncThunk(
    "comments/fetchCommentsByProject",
    async (projectId: string) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/comments/project/${projectId}`,
            "GET"
        );
    }
);

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllComments.pending, (state) => {
                state.commentsLoading = true;
            })
            .addCase(fetchAllComments.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = action.payload;
            })
            .addCase(fetchAllComments.rejected, (state, action) => {
                state.commentsLoading = false;
                state.commentsError = action.error.message || "An error occurred while fetching comments";
            })

            .addCase(createComment.pending, (state) => {
                state.commentsLoading = true;
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = state.comments ? [...state.comments, action.payload] : [action.payload];
            })
            .addCase(createComment.rejected, (state, action) => {
                state.commentsLoading = false;
                state.commentsError = action.error.message || "An error occurred while creating comments";
            })

            .addCase(updateComment.pending, (state) => {
                state.commentsLoading = true;
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.commentsLoading = false;
                if (state.comments) {
                    const index = state.comments.findIndex(c => c.comment_id === action.payload.comment_id);
                    if (index !== -1) {
                        state.comments[index] = action.payload;
                    }
                }
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.commentsLoading = false;
                state.commentsError = action.error.message || "An error occurred while updating comments";
            })

            .addCase(deleteComment.pending, (state) => {
                state.commentsLoading = true;
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.commentsLoading = false;
                if (state.comments) {
                    state.comments = state.comments.filter(c => c.comment_id !== action.payload);
                }
            })
            .addCase(deleteComment.rejected, (state, action) => {
                state.commentsLoading = false;
                state.commentsError = action.error.message || "An error occurred while deleting comments";
            })

            .addCase(fetchCommentsByProject.pending, (state) => {
                state.commentsLoading = true;
            })
            .addCase(fetchCommentsByProject.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = action.payload;
            })
            .addCase(fetchCommentsByProject.rejected, (state, action) => {
                state.commentsLoading = false;
                state.commentsError = action.error.message || "An error occurred while fetching comment";
            })
    },
});

export default commentSlice.reducer;
