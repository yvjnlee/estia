import { SupabaseClient } from "@supabase/supabase-js";

export interface ProjectsDB {
  project_name: string;
  created_at: string;
  tech1?: string;
  tech2?: string;
  colour: string;
  description?: string;
  video_Id?: string;
  repo_Path?: string;
  theme?: string;
  Likes?: number;
  comment_thread_id?: number;
  project_id: string;
}

export interface ProjectsProps {
  supabase: SupabaseClient;
  projects: ProjectInfo[];
  searchQuery: string;
  searchProjects: (tech: string[]) => void;
  handleSearch: (tech: string[]) => void;
  handleEnter: (
    e: React.KeyboardEvent<HTMLInputElement>,
    tech: string[],
  ) => void;
  handleKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ProjectInfo {
  projectName: string;
  createdAt: string;
  tech1?: string;
  tech2?: string;
  colour: string;
  description?: string;
  videoId?: string | null;
  repoPath?: string | null;
}

export interface ProjectsProps {
  supabase: SupabaseClient;
  projects: ProjectInfo[];
  searchQuery: string;
  searchProjects: (tech: string[]) => void;
  handleSearch: (tech: string[]) => void;
  handleEnter: (
    e: React.KeyboardEvent<HTMLInputElement>,
    tech: string[],
  ) => void;
  handleKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
