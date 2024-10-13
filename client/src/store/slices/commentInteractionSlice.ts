import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAPI } from "../../utils/fetchAPI";
import { CommentInteraction, CommentInteractionDB } from "../../common/types";

interface CommentInteractionState {
    commentInteraction: CommentInteractionDB[] | null;
    commentInteractionLoading: boolean;
    commentInteractionError: string | null;
}

const initialState: CommentInteractionState = {
    commentInteraction: null,
    commentInteractionLoading: false,
    commentInteractionError: null,
};

// Thunks
export const createCommentInteraction = createAsyncThunk(
    "commentInteraction/createCommentInteraction",
    async (newCommentInteraction: CommentInteraction, commentId: string, userId: string) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/commentInteraction/${commentId}/${userId}`,
            "POST",
            newCommentInteraction
        );
    }
);


export const fetchAllCommentInteraction = createAsyncThunk("commentInteraction/fetchAllCommentInteractions", 
    async (commentId: string) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteraction/${commentId}`, "GET");
    }
);

export const fetchCommentInteraction = createAsyncThunk(
    "comments/fetchCommentInteraction",
    async (commentId: string, userId: string) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteractions/${commentId}/${userId}`, "GET");
    }
);

export const updateCommentInteraction = createAsyncThunk(
    "comments/updateCommentInteraction",
    async ({ commentId, updates }: { commentId: string; updates: Partial<CommentInteraction> }) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/commentInteraction/${commentId}/${userId}`,
            "PATCH",
            updates
        );
    }
);

export const deleteCommentInteraction = createAsyncThunk("commentInteraction/deleteCommentInteraction", 
    async (commentId: string, userId: string) => {
        await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteraction/${commentId}/${userId}`, "DELETE");
        return commentId; // y do we return this?
});

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentInteractions.pending, (state) => {
                state.commentsLoading = true;
                state.commentsError = null;
            })
            .addCase(fetchCommentInteractions.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = action.payload;
            })
            .addCase(fetchCommentInteractions.rejected, (state, action) => {
                state.commentsLoading = false;
                state.commentsError = action.error.message || "An error occurred while fetching comments";
            })
            .addCase(createCommentInteraction.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = state.comments ? [...state.comments, action.payload] : [action.payload];
            })
            .addCase(updateCommentInteraction.fulfilled, (state, action) => {
                state.commentsLoading = false;
                if (state.comments) {
                    const index = state.comments.findIndex(c => c.comment_id === action.payload.comment_id);
                    if (index !== -1) {
                        state.comments[index] = action.payload;
                    }
                }
            })
            .addCase(deleteCommentInteraction.fulfilled, (state, action) => {
                state.commentsLoading = false;
                if (state.comments) {
                    state.comments = state.comments.filter(c => c.comment_id !== action.payload);
                }
            })
            .addCase(fetchCommentInteraction.fulfilled, (state, action) => {
                state.commentsLoading = false;
                state.comments = action.payload;
            });
    },
});

export default commentSlice.reducer;
