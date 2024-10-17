import { CommentInteraction, CommentInteractionDB } from "../common/types";
import {
    fetchCommentInteraction,
    fetchAllCommentInteractions,
    createCommentInteraction,
    updateCommentInteraction,
    deleteCommentInteraction,
} from "../store/slices/commentInteractionSlice";
import { AppDispatch } from "../store/store";

const mapCommentInteractionData = (commentInteraction: CommentInteractionDB) => {
    return {
        commentId: commentInteraction.comment_id,
        userId: commentInteraction.user_id,
        interaction: commentInteraction.interaction
    };
};

export const getCommentInteraction = async (dispatch: AppDispatch, commentId: string, userId: string) => {
    const commentInteraction = await dispatch(fetchCommentInteraction({ commentId, userId })).unwrap();
    if (!commentInteraction) {
        return null;
    }
    console.log(commentInteraction.user_id)
    const mappedComments = commentInteraction.map((commentInteraction: CommentInteractionDB) => mapCommentInteractionData(commentInteraction));
    return mappedComments;
};

export const addCommentInteraction = async (dispatch: AppDispatch, newCommentInteraction: CommentInteractionDB, projectId: string, commentId: string, userId: string) => {
    const commentInteraction = await dispatch(createCommentInteraction({ newCommentInteraction, projectId, commentId, userId })).unwrap();
    return mapCommentInteractionData(commentInteraction);
};

export const editCommentInteraction = async (dispatch: AppDispatch, projectId: string, commentId: string, userId: string, updates: Partial<CommentInteractionDB> ) => {
    const commentInteraction = await dispatch(updateCommentInteraction({projectId, commentId, userId, updates})).unwrap();
    return mapCommentInteractionData(commentInteraction);
};

export const removeCommentInteraction = async (dispatch: AppDispatch, projectId: string, commentId: string, userId: string) => {
    await dispatch(deleteCommentInteraction({projectId, commentId, userId})).unwrap();
};
