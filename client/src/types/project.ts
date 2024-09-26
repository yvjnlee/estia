import { SupabaseClient } from "@supabase/supabase-js";

export interface ProjectsProps {
  supabase: SupabaseClient;
  projects: ProjectInfo[];
  searchQuery: string;
  searchProjects: (tech: string[]) => void;
  handleSearch: (tech: string[]) => void;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>, tech: string[]) => void;
  handleKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

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
  supabase: SupabaseClient;
  projects: ProjectInfo[];
  searchQuery: string;
  searchProjects: (tech: string[]) => void;
  handleSearch: (tech: string[]) => void;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>, tech: string[]) => void;
  handleKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  

export const sampleProjects: ProjectInfo[] = [
    {
      project_name: "Stock Prediction Program",
      created_at: "2024-09-18 17:43:48+00",
      tech1: "Tensorflow",
      tech2: "Python",
      colour: "#6F0000",
      descript: "Details about Twitter Sentiment Analysis",
      video_Id: "0E_31WqVzCY",
      repo_Path: "patrickloeber/python-fun"
    },
    {
      project_name: "Netflix Clone",
      created_at: "2024-09-18 17:43:48+00",
      tech1: "React",
      tech2: "TypeScript",
      colour: "#456F00",
      descript: "The Netflix clone project is a web application developed using React JS, Tailwind CSS, and Firebase, aiming to replicate the user interface and some features of the popular streaming service, Netflix.",
      video_Id: "ATz8wg6sg30",
      repo_Path: "fireclint/netflix-react-tailwind"
    },
    {
      project_name: "Password Manager",
      created_at: "2024-09-18 17:43:48+00",
      tech1: "Python",
      tech2: "SQL",
      colour: "#006F5B",
      descript: "Details about Password Manager",
      video_Id: "hkhyKJj28Ac",
      repo_Path: "KalleHallden/pwManager"
    },
    {
      project_name: "Football Webscraper",
      created_at: "2024-09-18 17:43:48+00",
      tech1: "React",
      tech2: "TypeScript",
      colour: "#6F0050",
      descript: "Details about Football Webscraper",
      video_Id: "ATz8wg6sg30",
      repo_Path: "fireclint/netflix-react-tailwind"
    },
    {
      project_name: "Actorle",
      created_at: "2024-09-18 17:43:48+00",
      tech1: "React",
      tech2: "TypeScript",
      colour: "#45006F",
      descript: "Details about Actorle",
      video_Id: "ATz8wg6sg30",
      repo_Path: "fireclint/netflix-react-tailwind"
    }
];
  