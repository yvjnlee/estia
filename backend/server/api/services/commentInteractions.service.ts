import L from '../../common/logger';
import { Comment, CommentInteraction } from '../../../common/types';
import { supabase } from '../../../common/clients';

// creating a comment interaction, this will result in an update in comment table as well
export class CommentInteractionsService {
  async create(commentInteraction: CommentInteraction, comment: Comment): Promise<CommentInteraction | null> {
    L.info(`Creating new comment interaction for comment: ${commentInteraction.commentId}`);
    const { data: commentInteractionData, error: commentInteractionError } = await supabase
      .from('comment_iteractions')
      .insert(commentInteraction)
      .single();

    if ( commentInteractionError ) {
      L.error(`Error creating comment: ${commentInteractionError.message}`);
      return null;
    }
    let likes = 1;
    if (commentInteraction.interaction === false) {
        likes = -1;
    }

    const { data: updatedCommentData, error: updateError } = await supabase
      .from('comments')
      .update({ likes: comment.likes + likes})

    if (updateError) {
      L.error(`Error when updating number of interactions with a comment: ${updateError}`)
    }

    return commentInteractionData;
  }

  async getAll(): Promise<CommentInteraction[] | null> {
    L.info('Fetching all comments interactions');
    const { data, error } = await supabase.from('comment_interactions').select('*');
    if (error) {
      L.error(`Error fetching all comments: ${error.message}`);
      return null;
    }
    return data;
  }

  async getInteraction(commentId: string, userId: string): Promise<CommentInteraction | null> {
    L.info(`Fetching comment with id: ${commentId}, ${userId}`);
    const { data, error } = await supabase
      .from('comment_interactions')
      .select('*')
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single();
    if (error) {
      L.error(`Error fetching comment by id: ${error.message}`);
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
