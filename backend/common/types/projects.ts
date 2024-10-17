export interface ProjectDB {
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

export interface Project {
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
