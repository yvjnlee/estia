import React, { createContext, useContext, useState, useEffect } from "react";
import { ProjectInfo, ProjectsProps } from "../types/project";
import { sampleProjects } from "../types/project";
import { useAuth } from "./AuthContext";
import { SupabaseClient } from "@supabase/supabase-js";

const ProjectContext = createContext<ProjectsProps | undefined>(undefined);

export const ProjectProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { supabase } = useAuth(); // Ensure you have supabase here
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [projects, setProjects] = useState(sampleProjects);
  const [projectFeed, setProjectFeed] = useState(sampleProjects);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let { data, error } = await supabase
          .from('estia_projects')
          .select('*');
        if (error) {
          console.log(error)
        }
        setProjects(data as ProjectInfo[]); // Set the fetched data to state
        setProjectFeed(data as ProjectInfo[]); // Set the fetched data to state
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [supabase]);

  const searchProjects = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = projects.filter((project) => {
      const matchesSearchQuery =
        project.project_name?.toLowerCase().includes(lowercasedQuery) ||
        project.descript?.toLowerCase().includes(lowercasedQuery);

      const matchesTechStack =
        selectedTechStack.length === 0 ||
        selectedTechStack.some(
          (tech) => project.tech1 === tech || project.tech2 === tech
        );

      return matchesSearchQuery && matchesTechStack;
    });

    setProjectFeed(filtered);
  };

  useEffect(() => {
    searchProjects();
  }, [searchQuery, selectedTechStack]);

  const handleSearch = (tech: string[]) => {
    setSelectedTechStack(tech);
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tech: string[]
  ) => {
    if (e.key === "Enter") {
      setSelectedTechStack(tech);
    }
  };

  const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const value = {
    supabase, // Include supabase in the context value
    projects: projectFeed,
    searchQuery: searchQuery,
    searchProjects: (tech: string[]) => setSelectedTechStack(tech),
    handleSearch: handleSearch,
    handleEnter: handleEnter,
    handleKeyPress: handleKeyPress,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProject must be used within a ProjectProvider");
  }
  return context;
};
