export interface CommentInteractionDB {
    comment_id: string,
    user_id: string,
    interaction: boolean
}

export interface CommentInteraction {
    commentId: string;
    userId: string;
    interaction: boolean
}