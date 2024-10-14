import L from '../../common/logger';
import { Comment, CommentInteraction } from '../../../common/types';
import { supabase } from '../../../common/clients';

// creating a comment interaction, this will result in an update in comment table as well
export class CommentInteractionsService {
  //helper function
  async updateLikes(comment: Comment, likes: number) {
    const { data: updatedCommentData, error: updateError } = await supabase
      .from('comments')
      .update({ likes: comment.likes + likes})
      .eq('comment_id', comment.commentId)

    if (updateError) {
      L.error(`Error when updating number of interactions with a comment: ${updateError}`)
    }
  }

  async getComment(projectId: string, commentId: string, userId: string) {
    const {data, error} = await supabase
      .from('comments')
      .eq('project_id', projectId)
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .select()
      .single()
    
      if (error) {
        L.error(`Error getting comment: ${error}`);
        return null
      }
      return data
  }
  
  async create(commentInteraction: CommentInteraction, projectId: string, commentId: string, userId: string): Promise<CommentInteraction | null> {
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
    const comment = await this.getComment(projectId, commentId, userId);
    this.updateLikes(comment, likes);

    return commentInteractionData;
  }

  async getAll(commentId: string): Promise<CommentInteraction[] | null> {
    L.info('Fetching all comment interactions');
    const { data, error } = await supabase.from('comment_interactions')
      .eq('comment_id', commentId)
      .select('*');
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
    commentInteractionData: Partial<CommentInteraction>,
    projectId: string,
    commentId: string,
    userId: string
  ): Promise<Comment | null> {
    L.info(`Updating comment with id: ${commentId}, ${userId}`);
    const { data, error } = await supabase
      .from('commentInteractions')
      .update(commentInteractionData)
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .select()
      .single();
    if (error) {
      L.error(`Error updating comment: ${error.message}`);
      return null;
    }
    let likes = 2;
    if (commentInteractionData.interaction === false) {
        likes = -2;
    }

    const comment = await this.getComment(projectId, commentId, userId)
    this.updateLikes(comment, likes);
  
    return data;
  }

// deleting a comment by selecting commentid and userid
  async delete(projectId: string, commentId: string, userId: string): Promise<boolean> {
    
    L.info(`Deleting comment with comment id: ${commentId} and user id: ${userId}`);
    const { data, error } = await supabase
        .from('comment_interactions')
        .delete()
        .eq('comment_id', commentId)
        .eq('user_id', userId)
        
    if (error) {
      L.error(`Error deleting comment: ${error.message}`);
      return false;
    }

    let likes = -1
    if (data[0].interaction === false) {
      likes = 1
    }
    
    const comment = await this.getComment(projectId, commentId, userId);
    this.updateLikes(comment, likes);

    return true;
  }
}

export default new CommentInteractionsService();
