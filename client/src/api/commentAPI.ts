import { Comment, CommentDB } from "../common/types";
import {
    fetchCommentById,
    fetchAllComments,
    createComment,
    updateComment,
    deleteComment,
    fetchCommentsByProjectId,
} from "../store/slices/commentSlice";
import { AppDispatch } from "../store/store";

const mapCommentData = (comment: CommentDB) => {
    return {
        commentId: comment.comment_id,
        content: comment.content,
        userId: comment.user_id,
        projectId: comment.project_id,
        likes: comment.likes,
        username: comment.username,
    };
};

const mapToPartialComment = (comment: Partial<Comment>) => {
    return {
        content: comment.content,
        user_id: comment.userId,
        project_id: comment.projectId,
        likes: comment.likes,
        username: comment.username,
    };
};

export const getComments = async (dispatch: AppDispatch) => {
    const comments = await dispatch(fetchAllComments()).unwrap();
    if (Array.isArray(comments)) {
        return comments.map((comment: CommentDB) => mapCommentData(comment));
    }
    return [];
};

export const getCommentsByProjectId = async (dispatch: AppDispatch, projectId: string) => {
    const comments = await dispatch(fetchCommentsByProjectId(projectId)).unwrap();
    if (Array.isArray(comments)) {
        return comments.map((comment: CommentDB) => mapCommentData(comment));
    }
    return [];
};

export const addComment = async (dispatch: AppDispatch, commentData: Partial<Comment>) => {
    const partialComment: Partial<Comment> = mapToPartialComment(commentData);
    console.log(partialComment);
    const comment = await dispatch(createComment(partialComment)).unwrap();
    if (comment) {
        return mapCommentData(comment);
    }
};

export const editComment = async (dispatch: AppDispatch, commentData: { commentId: string; updates: Partial<Comment> }) => {
    const comment = await dispatch(updateComment(commentData)).unwrap();
    if (comment) {
        return mapCommentData(comment);
    }
};

export const removeComment = async (dispatch: AppDispatch, commentId: string) => {
    await dispatch(deleteComment(commentId)).unwrap();
};

export const filterComments = async (comments: Comment[], searchFilter?: string, authorFilter?: string) => {
    if (!searchFilter && !authorFilter) return comments;

    if (!comments) return [];

    const filteredComments = comments?.filter((comment: Comment) => {
        const matchesSearch = comment.content.toLowerCase().includes(searchFilter?.toLowerCase() || "");
        const matchesAuthor = !authorFilter || comment.userId === authorFilter;

        return matchesSearch && matchesAuthor;
    });

    return filteredComments;
};
