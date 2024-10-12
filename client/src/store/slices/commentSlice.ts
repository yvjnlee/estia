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

export const fetchComments = createAsyncThunk("comments/fetchComments", async () => {
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
            .addCase(fetchComments.pending, (state) => {
                state.commentsLoading = true;
                state.commentsError = null;
            })
            .addCase(fetchComments.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = action.payload;
            })
            .addCase(fetchComments.rejected, (state, action) => {
                state.commentsLoading = false;
                state.commentsError = action.error.message || "An error occurred while fetching comments";
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = state.comments ? [...state.comments, action.payload] : [action.payload];
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
            .addCase(deleteComment.fulfilled, (state, action) => {
                state.commentsLoading = false;
                if (state.comments) {
                    state.comments = state.comments.filter(c => c.comment_id !== action.payload);
                }
            })
            .addCase(fetchCommentsByProject.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = action.payload;
            });
    },
});

export default commentSlice.reducer;
