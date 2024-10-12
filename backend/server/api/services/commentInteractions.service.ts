import L from '../../common/logger';
import { Comment, CommentInteraction } from '../../../common/types';
import { supabase } from '../../../common/clients';
import { CommentsService } from './comments.service';
// creating a comment interaction, this will result in an update in comment table as well
export class CommentInteractionsService {
  async create(commentInteraction: CommentInteraction, comment: Comment): Promise<CommentInteraction | null> {
    L.info(`Creating new comment interaction for comment: ${commentInteraction.commentId}`);
    const { data, error } = await supabase
      .from('comment_iteractions')
      .insert(commentInteraction)
      .single();

    if (error) {
      L.error(`Error creating comment: ${error.message}`);
      return null;
    }
    let likes = 1;
    if (commentInteraction.interaction === false) {
        likes = -1;
    }

    CommentsService.update(commentInteraction.commentId, {
        interactions: comment.likes + likes; 
    })

    return data;
  }

  async getAll(): Promise<Comment[] | null> {
    L.info('Fetching all comments');
    const { data, error } = await supabase.from('comments').select('*');
    if (error) {
      L.error(`Error fetching all comments: ${error.message}`);
      return null;
    }
    return data;
  }

  async getByCommentId(id: string): Promise<CommentInteraction | null> {
    L.info(`Fetching comment with id: ${id}`);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      L.error(`Error fetching comment by id: ${error.message}`);
      return null;
    }
    return data;
  }

  async getByProjectId(postId: string): Promise<Comment[] | null> {
    L.info(`Fetching comments for post: ${postId}`);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('post_id', postId);
    if (error) {
      L.error(`Error fetching comments by post id: ${error.message}`);
      return null;
    }
    return data;
  }

  async update(
    id: string,
    commentData: Partial<Comment>
  ): Promise<Comment | null> {
    L.info(`Updating comment with id: ${id}`);
    const { data, error } = await supabase
      .from('comments')
      .update(commentData)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      L.error(`Error updating comment: ${error.message}`);
      return null;
    }
    return data;
  }

// deleting a comment by selecting commentid and userid
  async delete(commentId: string, userId: string): Promise<boolean> {
    L.info(`Deleting comment with comment id: ${commentId} and user id: ${userId}`);
    const { error } = await supabase
        .from('comment_interactions')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', userId);
    if (error) {
      L.error(`Error deleting comment: ${error.message}`);
      return false;
    }
    return true;
  }
}

export default new CommentInteractionsService();
