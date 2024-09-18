export interface Project {
    tech1: string;
    tech2?: string;
    colour: string;
    descript?: string;
    videoId?: string;
    repoPath?: string;
  }
  

export const projects: Record<string, {
    tech1: string;
    tech2: string;
    colour: string;
    descript: string;
    videoId: string;
    repoPath: string;
  }> = {
    "Twitter Sentiment Analysis": {
      tech1: "Tensorflow",
      tech2: "Python",
      colour: "#6F0000",
      descript: "Details about Twitter Sentiment Analysis",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    },
    "Netflix Clone": {
      tech1: "React",
      tech2: "TypeScript",
      colour: "#456F00",
      descript: "The Netflix clone project is a web application developed using React JS, Tailwind CSS, and Firebase, aiming to replicate the user interface and some features of the popular streaming service, Netflix.",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    },
    "Spanish Writing Assistant": {
      tech1: "React",
      tech2: "TypeScript",
      colour: "#006F5B",
      descript: "Details about Spanish Writing Assistant",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    },
    "Football Webscraper": {
      tech1: "React",
      tech2: "TypeScript",
      colour: "#6F0050",
      descript: "Details about Football Webscraper",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    },
    "Actorle": {
      tech1: "React",
      tech2: "TypeScript",
      colour: "#45006F",
      descript: "Details about Actorle",
      videoId: "ATz8wg6sg30",
      repoPath: "fireclint/netflix-react-tailwind"
    }
  };
  