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
    async (newCommentInteraction: CommentInteraction) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/commentInteraction/`,
            "POST",
            newCommentInteraction
        );
    }
);

export const fetchCommentInteraction = createAsyncThunk("commentInteraction/fetchCommentInteraction", async () => {
    return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteraction/`, "GET");
});

// export const fetchCommentInteractionById = createAsyncThunk(
//     "comments/fetchCommentById",
//     async (id: string) => {
//         return await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/comments/${id}`, "GET");
//     }
// );

export const updateCommentInteraction = createAsyncThunk(
    "comments/updateCommentInteraction",
    async ({ commentId, updates }: { commentId: string; updates: Partial<Comment> }) => {
        return await fetchAPI(
            `${process.env.REACT_APP_API_BASE_URL}/commentInteraction/${commentId}`,
            "PATCH",
            updates
        );
    }
);

export const deleteCommentInteraction = createAsyncThunk("commentInteraction/deleteCommentInteraction", async (id: string) => {
    await fetchAPI(`${process.env.REACT_APP_API_BASE_URL}/commentInteraction/${id}`, "DELETE");
    return id;
});

// export const fetchCommentsByProject = createAsyncThunk(
//     "comments/fetchCommentsByProject",
//     async (projectId: string) => {
//         return await fetchAPI(
//             `${process.env.REACT_APP_API_BASE_URL}/comments/project/${projectId}`,
//             "GET"
//         );
//     }
// );

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
