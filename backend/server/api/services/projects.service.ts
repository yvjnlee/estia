import L from '../../common/logger';
import { Project } from '../../../common/types';
import { supabase } from '../../../common/clients';

export class ProjectsService {
  // Create
  async create(newProject: Project): Promise<Project | null> {
    L.info(`Creating project with name: ${newProject.projectName}`);

    try {
      const { data, error } = await supabase
        .from('estia_projects')
        .insert(newProject)
        .select();

      if (error) {
        L.error(`Error creating project: ${error.message}`);
        return null;
      }

      return data[0] || null;
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  // Read
  async getAll(): Promise<Project[] | null> {
    L.info('Fetching all projects');

    try {
      const { data, error } = await supabase.from('estia_projects').select('*');

      if (error) {
        L.error(`Error fetching projects: ${error.message}`);
        return null;
      }

      return data || null;
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  async getByProjectId(projectId: string): Promise<Project | null> {
    L.info(`Fetching project with id: ${projectId}`);

    try {
      const { data, error } = await supabase
        .from('estia_projects')
        .select('*')
        .eq('project_id', projectId)
        .single();

      if (error) {
        L.error(`Error fetching project: ${error.message}`);
        return null;
      }

      return data || null;
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  async getByProjectName(projectName: string): Promise<Project[] | null> {
    L.info(`Fetching projects with name: ${projectName}`);

    try {
      const { data, error } = await supabase
        .from('estia_projects')
        .select('*')
        .eq('project_name', projectName);

      if (error) {
        L.error(`Error fetching project: ${error.message}`);
        return null;
      }

      return data || null;
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  // Update
  async update(
    projectId: string,
    updatedProject: Partial<Project>
  ): Promise<Project | null> {
    L.info(`Updating project with id: ${projectId}`);

    try {
      const { data, error } = await supabase
        .from('estia_projects')
        .update(updatedProject)
        .eq('project_id', projectId)
        .select();

      if (error) {
        L.error(`Error updating project: ${error.message}`);
        return null;
      }

      return data[0] || null;
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  // Delete
  async delete(projectId: string): Promise<boolean> {
    L.info(`Deleting project with id: ${projectId}`);

    try {
      const { error } = await supabase
        .from('estia_projects')
        .delete()
        .eq('project_id', projectId);

      if (error) {
        L.error(`Error deleting project: ${error.message}`);
        return false;
      }

      return true;
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return false;
    }
  }

  // Search projects by user ID
  async getByUserId(userId: string): Promise<Project[] | null> {
    L.info(`Fetching projects for user with id: ${userId}`);

    try {
      const { data, error } = await supabase
        .from('estia_projects')
        .select('*')
        .eq('created_by', userId);

      if (error) {
        L.error(`Error fetching projects for user: ${error.message}`);
        return null;
      }

      return data || null;
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  async getBySavedUserId(userId: string): Promise<Project[] | null> {
    L.info(`Fetching projects saved by user with id: ${userId}`);

    try {
      const { data, error } = await supabase
        .from('saved_projects')
        .select('*')
        .eq('profile_id', userId);

      if (error) {
        L.error(`Error fetching projects saved by user: ${error.message}`);
        return null;
      }

      if (data) {
        const projectIds = data.map((project) => project.project_id);
        const { data: projectsData, error: projectsError } = await supabase
          .from('estia_projects')
          .select('*')
          .in('project_id', projectIds);

        if (projectsError) {
          L.error(`Error fetching project details: ${projectsError.message}`);
          return null;
        }

        return projectsData || null;
      } else {
        return null;
      }
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  async getByLikedUserId(userId: string): Promise<Project[] | null> {
    L.info(`Fetching projects liked by user with id: ${userId}`);

    try {
      const { data, error } = await supabase
        .from('liked_projects')
        .select('*')
        .eq('profile_id', userId);

      if (error) {
        L.error(`Error fetching projects saved by user: ${error.message}`);
        return null;
      }

      if (data) {
        const projectIds = data.map((project) => project.project_id);
        const { data: projectsData, error: projectsError } = await supabase
          .from('estia_projects')
          .select('*')
          .in('project_id', projectIds);

        if (projectsError) {
          L.error(`Error fetching project details: ${projectsError.message}`);
          return null;
        }

        return projectsData || null;
      } else {
        return null;
      }
    } catch (err) {
      L.error(`Unexpected error: ${err}`);
      return null;
    }
  }

  async saveProject(projectId: string, userId: string): Promise<boolean> {
    L.info(`Toggling save status for project ${projectId} by user ${userId}`);

    try {
      // Check if the project is already saved
      const { data: existingSave, error: checkError } = await supabase
        .from('saved_projects')
        .select()
        .eq('profile_id', userId)
        .eq('project_id', projectId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        L.error(`Error checking saved status: ${checkError.message}`);
        return false;
      }

      if (existingSave) {
        // Unsave project
        const { error: deleteError } = await supabase
          .from('saved_projects')
          .delete()
          .eq('profile_id', userId)
          .eq('project_id', projectId);

        if (deleteError) {
          L.error(`Error unsaving project: ${deleteError.message}`);
          return false;
        }
      } else {
        // Save project
        const { error: insertError } = await supabase
          .from('saved_projects')
          .insert([{ profile_id: userId, project_id: projectId }]);

        if (insertError) {
          L.error(`Error saving project: ${insertError.message}`);
          return false;
        }
      }

      return true;
    } catch (err) {
      L.error(`Unexpected error in saveProject: ${err}`);
      return false;
    }
  }

  async likeProject(projectId: string, userId: string): Promise<boolean> {
    L.info(`Toggling like status for project ${projectId} by user ${userId}`);

    try {
      // Check if the project is already liked
      const { data: existingLike, error: checkError } = await supabase
        .from('liked_projects')
        .select()
        .eq('profile_id', userId)
        .eq('project_id', projectId)
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        L.error(`Error checking liked status: ${checkError.message}`);
        return false;
      }

      if (existingLike) {
        // Unlike project
        const { error: deleteError } = await supabase
          .from('liked_projects')
          .delete()
          .eq('profile_id', userId)
          .eq('project_id', projectId);

        if (deleteError) {
          L.error(`Error unliking project: ${deleteError.message}`);
          return false;
        }
      } else {
        // Like project
        const { error: insertError } = await supabase
          .from('liked_projects')
          .insert([{ profile_id: userId, project_id: projectId }]);

        if (insertError) {
          L.error(`Error liking project: ${insertError.message}`);
          return false;
        }
      }

      return true;
    } catch (err) {
      L.error(`Unexpected error in likeProject: ${err}`);
      return false;
    }
  }
}

export default new ProjectsService();
