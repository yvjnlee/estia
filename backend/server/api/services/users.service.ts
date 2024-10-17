import L from '../../common/logger';
import { User } from '../../../common/types';
import { supabase } from '../../../common/clients';

export class UsersService {
  async create(user: User): Promise<User | null> {
    L.info(`Creating new profile: ${user.username}`);
    const { data, error } = await supabase
      .from('profiles')
      .insert(user)
      .select()
      .single();
    if (error) {
      L.error(`Error creating profile: ${error.message}`);
      return null;
    }
    return data;
  }

  async all(): Promise<User[] | null> {
    L.info('Fetching all profiles');
    const { data, error } = await supabase.from('profiles').select('*');
    if (error) {
      L.error(`Error fetching all profiles: ${error.message}`);
      return null;
    }
    return data;
  }

  async byId(id: string): Promise<User | null> {
    L.info(`Fetching profile with id: ${id}`);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    if (error) {
      L.error(`Error fetching profile by id: ${error.message}`);
      return null;
    }
    return data;
  }

  async byUsername(username: string): Promise<User | null> {
    L.info(`Fetching profile with username: ${username}`);
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('username', username)
      .single();
    if (error) {
      L.error(`Error fetching profile by username: ${error.message}`);
      return null;
    }
    return data;
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    L.info(`Updating profile with id: ${id}`);
    const { data, error } = await supabase
      .from('profiles')
      .update(userData)
      .eq('id', id)
      .select()
      .single();
    if (error) {
      L.error(`Error updating profile: ${error.message}`);
      return null;
    }
    return data;
  }

  async delete(id: string): Promise<boolean> {
    L.info(`Deleting profile with id: ${id}`);
    const { error } = await supabase.from('profiles').delete().eq('id', id);
    if (error) {
      L.error(`Error deleting profile: ${error.message}`);
      return false;
    }
    return true;
  }
}

export default new UsersService();
