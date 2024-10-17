import L from '../../common/logger';
import { Comment } from '../../../common/types';
import { supabase } from '../../../common/clients';

export class CommentsService {
  async create(comment: Partial<Comment>): Promise<Comment | null> {
    L.info(`Creating new comment for post: ${comment.projectId}`);

    console.log("IN SERVICE");
    console.log(comment);

    const { data, error } = await supabase
      .from('comments')
      .insert(comment)
      .single();
    if (error) {
      L.error(`Error creating comment: ${error.message}`);
      return null;
    }
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

  async getByCommentId(id: string): Promise<Comment | null> {
    L.info(`Fetching comment with id: ${id}`);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('comment_id', id)
      .single();
    if (error) {
      L.error(`Error fetching comment by id: ${error.message}`);
      return null;
    }
    return data;
  }

  // returns an array of all comments
  async getByProjectId(projectId: string): Promise<Comment[] | null> {
    L.info(`Fetching comments for post: ${projectId}`);
    const { data, error } = await supabase
      .from('comments')
      .select('*')
      .eq('project_id', projectId);
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
      .eq('comment_id', id)
      .select()
      .single();
    if (error) {
      L.error(`Error updating comment: ${error.message}`);
      return null;
    }
    return data;
  }

  async delete(id: string): Promise<boolean> {
    L.info(`Deleting comment with id: ${id}`);
    const { error } = await supabase.from('comments').delete().eq('comment_id', id);
    if (error) {
      L.error(`Error deleting comment: ${error.message}`);
      return false;
    }
    return true;
  }
}

export default new CommentsService();
