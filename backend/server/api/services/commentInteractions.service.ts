import L from '../../common/logger';
import { Comment, CommentDB, CommentInteraction, CommentInteractionDB } from '../../../common/types';
import { supabase } from '../../../common/clients';

// creating a comment interaction, this will result in an update in comment table as well
export class CommentInteractionsService {
  //helper function
  async updateLikes(comment: CommentDB, likes: number) {
    console.log(comment)
    console.log(comment.likes)
    const { data: updatedCommentData, error: updateError } = await supabase
      .from('comments')
      .update({ likes: comment.likes + likes})
      .eq('comment_id', comment.comment_id)
      .select()

    if (updateError) {
      L.error(`Error when updating number of interactions with a comment: ${updateError}`)
    }
    console.log(`updated: ${updatedCommentData}`)
    return updatedCommentData;
  }

  async getComment(projectId: string, commentId: string, userId: string) {
    console.log(projectId)
    console.log(commentId)
    console.log(userId)
    const {data, error} = await supabase
      .from('comments')
      .select()
      .eq('project_id', projectId)
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single()
    
      if (error) {
        L.error(`Error getting comment: ${error}`);
        return null // if no rows are found or if other errors occur
      }
      console.log(`get comment: ${data}`)
      return data;
  }
  
  async create(commentInteraction: CommentInteractionDB, projectId: string, commentId: string, userId: string): Promise<CommentInteraction | null> {
    L.info(`Creating new comment interaction for comment: ${commentInteraction.comment_id}`);
    const { data: commentInteractionData, error: commentInteractionError } = await supabase
      .from('comment_interactions')
      .insert(commentInteraction)
      .select()
      .single()

    if ( commentInteractionError ) {
      L.error(`Error creating comment interaction: ${commentInteractionError.message}`);
      return null;
    }

    let likes = 1;
    if (commentInteraction.interaction === false) {
        likes = -1;
    }
    const comment = await this.getComment(projectId, commentId, userId);
    
    await this.updateLikes(comment, likes);
    console.log(commentInteractionData)
    return commentInteractionData;
  }

  async getAll(commentId: string): Promise<CommentInteraction[] | null> {
    L.info('Fetching all comment interactions');
    const { data, error } = await supabase.from('comment_interactions')
      .select('*')
      .eq('comment_id', commentId)
  
    if (error) {
      L.error(`Error fetching all comment interactions: ${error.message}`);
      return null;
    }
    return data;
  }

  async getInteraction(commentId: string, userId: string): Promise<CommentInteraction | null> {
    L.info(`Fetching comment with id: ${commentId}, ${userId}`);
    const { data, error } = await supabase
      .from('comment_interactions')
      .select()
      .eq('comment_id', commentId)
      .eq('user_id', userId)
      .single();
    if (error) {
      L.error(`Error fetching comment by id: ${error.message}`);
      return null;
    }
    console.log(data)
    return data;
  }

  async update(
    commentInteractionData: Partial<CommentInteractionDB>,
    projectId: string,
    commentId: string,
    userId: string
  ): Promise<Comment | null> {
    L.info(`Updating comment with id: ${commentId}, ${userId}`);
    const { data, error } = await supabase
      .from('comment_interactions')
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
    await this.updateLikes(comment, likes);
  
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
        .select()

    if (error) {
      L.error(`Error deleting comment: ${error.message}`);
      return false;
    }
    if (data) {
      const interactionData = data as CommentInteraction[];

      let likes = -1
      if (interactionData[0].interaction === false) {
        likes = 1
      }
      
      const comment = await this.getComment(projectId, commentId, userId);
      await this.updateLikes(comment, likes);

      return true;
    }
    
    return false;
  }
}

export default new CommentInteractionsService();
