import { Comment, CommentDB } from "../common/types";
import {
    fetchCommentById,
    fetchComments,
    createComment,
    updateComment,
    deleteComment,
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

export const getComments = async (dispatch: AppDispatch) => {
    const comments = await dispatch(fetchComments()).unwrap();
    const mappedComments = comments.map((comment: CommentDB) => mapCommentData(comment));
    return mappedComments;
};

export const addComment = async (dispatch: AppDispatch, commentData: Omit<Comment, 'commentId'>) => {
    const comment = await dispatch(createComment(commentData)).unwrap();
    return mapCommentData(comment);
};

export const editComment = async (dispatch: AppDispatch, commentData: { commentId: string; updates: Partial<Comment> }) => {
    const comment = await dispatch(updateComment(commentData)).unwrap();
    return mapCommentData(comment);
};

export const removeComment = async (dispatch: AppDispatch, commentId: string) => {
    await dispatch(deleteComment(commentId)).unwrap();
};

export const filterComments = async (comments: Comment[], searchFilter?: string, authorFilter?: string) => {
    if (!searchFilter && !authorFilter) return comments;

    if (!comments) return [];

    const filteredComments = comments.filter((comment: Comment) => {
        const matchesSearch = comment.content.toLowerCase().includes(searchFilter?.toLowerCase() || "");
        const matchesAuthor = !authorFilter || comment.userId === authorFilter;

        return matchesSearch && matchesAuthor;
    });

    return filteredComments;
};
