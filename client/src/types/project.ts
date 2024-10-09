/* eslint-disable no-unused-vars */
import React from "react";
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
  difficulty?: string;
}


export interface ProjectsProps {
  supabase: SupabaseClient;
  projects: ProjectInfo[]; 
  searchQuery: string; 
  handleSearch: (tech: string[], theme: string, difficulty: string) => void; 
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>, tech: string[]) => void; 
  handleKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => void; 
  searchProjects: () => ProjectInfo[];
}

export interface ProjectInfo {
    projectId?: string;
    projectName: string;
    createdAt: string;
    tech1?: string;
    tech2?: string;
    colour: string;
    description?: string;
    videoId?: string | null;
    repoPath?: string | null;
    theme?: string;
    difficulty?: string;
}
