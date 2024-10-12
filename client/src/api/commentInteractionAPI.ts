import { CommentInteraction, CommentInteractionDB } from "../common/types";
import {
    fetchCommentById,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
} from "../store/slices/commentSlice";
import { AppDispatch } from "../store/store";

const mapCommentInteractionData = (commentInteraction: CommentInteractionDB) => {
    return {
        commentId: commentInteraction.comment_id,
        userId: commentInteraction.user_id,
        interaction: commentInteraction.interaction
    };
};