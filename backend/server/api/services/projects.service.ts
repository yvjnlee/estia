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
  async all(): Promise<Project[] | null> {
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

  async byId(projectId: string): Promise<Project | null> {
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

  async byName(projectName: string): Promise<Project | null> {
    L.info(`Fetching projects with name: ${projectName}`);

    try {
      const { data, error } = await supabase
        .from('estia_projects')
        .select('*')
        .eq('project_name', projectName)
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
  async byUserId(userId: string): Promise<Project[] | null> {
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
}

export default new ProjectsService();
