export interface ProjectInfo {
    title: string;
    tech1?: string;
    tech2?: string;
    colour: string;
    descript?: string;
    videoId?: string | null;
    repoPath?: string | null;
}

export interface ProjectsProps {
  projects: ProjectInfo[];
  searchQuery: string;
  searchProjects: (tech: string[]) => void;
  handleSearch: (tech: string[]) => void;
  handleEnter: (e: React.KeyboardEvent<HTMLInputElement>, tech: string[]) => void;
  handleKeyPress: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
  

export const projects: ProjectInfo[] = [
    {
      title: "Stock Prediction Program",
      tech1: "Tensorflow",
      tech2: "Python",
      colour: "#6F0000",
      descript: "Details about Twitter Sentiment Analysis",
      videoId: "0E_31WqVzCY",
      repoPath: "patrickloeber/python-fun"
    },
    {
      title: "Netflix Clone",
      tech1: "React",
      tech2: "TypeScript",
      colour: "#456F00",
      descript: "The Netflix clone project is a web application developed using React JS, Tailwind CSS, and Firebase, aiming to replicate the user interface and some features of the popular streaming service, Netflix.",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    },
    {
      title: "Password Manager",
      tech1: "Python",
      tech2: "SQL",
      colour: "#006F5B",
      descript: "Details about Password Manager",
      videoId: "hkhyKJj28Ac",
      repoPath: "KalleHallden/pwManager"
    },
    {
      title: "Football Webscraper",
      tech1: "React",
      tech2: "TypeScript",
      colour: "#6F0050",
      descript: "Details about Football Webscraper",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    },
    {
      title: "Actorle",
      tech1: "React",
      tech2: "TypeScript",
      colour: "#45006F",
      descript: "Details about Actorle",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    }
];
  