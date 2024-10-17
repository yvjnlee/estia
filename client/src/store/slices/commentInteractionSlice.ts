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
    async ({ newCommentInteraction }: { newCommentInteraction: CommentInteractionDB }) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/commentInteractions/`,
            "POST",
            newCommentInteraction
        )
    }
);


export const fetchAllCommentInteractions = createAsyncThunk("commentInteraction/fetchAllCommentInteractions", 
    async (commentId: string) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteractions/comment/${commentId}`, "GET");
    }
);

export const fetchCommentInteraction = createAsyncThunk(
    "comments/fetchCommentInteraction",
    async ({ commentId, userId }: { commentId: string, userId: string }) => {
        return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteractions/comment/${commentId}/user/${userId}`, "GET");
    }
);

export const updateCommentInteraction = createAsyncThunk(
    "comments/updateCommentInteraction",
    async ({ commentId, userId, updates }: { commentId: string, userId: string, updates: Partial<CommentInteractionDB> }) => {
        const res= await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/commentInteractions/comment/${commentId}/user/${userId}`,
            "PATCH",
            updates
        )

        return res;
    }
);

export const deleteCommentInteraction = createAsyncThunk("commentInteraction/deleteCommentInteraction", 
    async ({ commentId, userId}: { commentId: string, userId: string }) => {
        await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteractions/comment/${commentId}/user/${userId}`, "DELETE");
        return commentId; // y do we return this?
});

const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentInteraction.pending, (state) => {
                state.commentInteractionLoading = true;
                state.commentInteractionError = null;
            })
            .addCase(fetchCommentInteraction.fulfilled, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteraction = action.payload;
            })
            .addCase(fetchCommentInteraction.rejected, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteractionError = action.error.message || "An error occurred while fetching comment interaction";
            })
            .addCase(createCommentInteraction.pending, (state) => {
                state.commentInteractionLoading = true;
                state.commentInteraction = null;
            })
            .addCase(createCommentInteraction.fulfilled, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteraction = state.commentInteraction ? [...state.commentInteraction, action.payload] : [action.payload];
            })
            .addCase(createCommentInteraction.rejected, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteractionError = action.error.message || "An error occurred while creating comment interaction";
            })
            .addCase(fetchAllCommentInteractions.pending, (state) => {
                state.commentInteractionLoading = true;
                state.commentInteraction = null;
            })
            .addCase(fetchAllCommentInteractions.fulfilled, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteraction = action.payload;
            })
            .addCase(fetchAllCommentInteractions.rejected, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteractionError = action.error.message || "An error occurred while fetching all comment interactions";
            })
            .addCase(updateCommentInteraction.pending, (state) => {
                state.commentInteractionLoading = true;
            })
            .addCase(updateCommentInteraction.fulfilled, (state, action) => {
                state.commentInteractionLoading = false;
                if (state.commentInteraction) {
                    const index = state.commentInteraction.findIndex(c => c.comment_id === action.payload.comment_id && c.user_id === action.payload.user_id);
                    if (index !== -1) {
                        state.commentInteraction[index] = action.payload;
                    }
                }
            })
            .addCase(updateCommentInteraction.rejected, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteractionError = action.error.message || "An error occurred while updating comment interaction";
            })
            .addCase(deleteCommentInteraction.pending, (state) => {
                state.commentInteractionLoading = true;
            })
            .addCase(deleteCommentInteraction.fulfilled, (state, action) => {
                state.commentInteractionLoading = false;
                if (state.commentInteraction) {
                    state.commentInteraction = state.commentInteraction.filter(c => c.comment_id !== action.payload);
                }
            })
            .addCase(deleteCommentInteraction.rejected, (state, action) => {
                state.commentInteractionLoading = false;
                state.commentInteractionError = action.error.message || "An error occurred while deleting comment interaction";
            });
            
    },
});

export default commentSlice.reducer;
