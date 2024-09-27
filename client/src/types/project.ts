export interface ProjectInfo {
    project_name: string;
    created_at: string;
    tech1?: string;
    tech2?: string;
    colour: string;
    descript?: string;
    video_Id?: string | null;
    repo_Path?: string | null;
}

export interface ProjectsProps {
  projects: ProjectInfo[];
  searchQuery: string;
  searchProjects: (tech: string[]) => void;
  handleSearch: (tech: string[]) => void;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>, tech: string[]) => void;
  handleKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}