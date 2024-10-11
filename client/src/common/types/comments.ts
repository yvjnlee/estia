export interface CommentDB {
    comment_id: string;
    project_id: string;
    user_id: string;
    content: string;
    likes: number;
    username: string;
}

export interface Comment {
    commentId: string;
    projectId: string;
    userId: string;
    content: string;
    likes: number;
    username: string;
}
