export interface CommentDB {
  comment_id: number;
  project_id: string;
  user_id: string;
  content: string;
  likes: number;
  username: string;
}

export interface Comment {
  commentId: number;
  projectId: string;
  userId: string;
  content: string;
  likes: number;
  username: string;
}
