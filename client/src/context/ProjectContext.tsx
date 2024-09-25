import React, { createContext, useContext, useState } from "react";
import { ProjectsProps } from "../types/project";
import { projects } from "../types/project";

const ProjectContext = createContext<ProjectsProps | undefined>(undefined);

export const ProjectProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(projects);

  // Filter projects based on search query and selected tech stack
  const filterProjects = (
    selectedTechStack?: string[],
  ) => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = projects.filter((project) => {
      const matchesSearchQuery =
        project.title?.toLowerCase().includes(lowercasedQuery) ||
        project.descript?.toLowerCase().includes(lowercasedQuery);

      const matchesTechStack =
        selectedTechStack?.length === 0 ||
        selectedTechStack?.some(
          (tech) => project.tech1 === tech || project.tech2 === tech,
        );

      return matchesSearchQuery && matchesTechStack;
    });

    if (selectedTechStack?.length === 0) {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(filtered);
    }
  };

  // Handle search when button is clicked
  const handleSearch = (tech: string[]) => {
    filterProjects(tech);
  };

  // Handle search when Enter key is pressed
  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    tech: string[],
  ) => {
    if (e.key === "Enter") {
      filterProjects(tech);
    }
  };

  // Handle key presses
  const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const value = {
    projects: filteredProjects,
    searchQuery: searchQuery,
    filterProjects: filterProjects,
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
    throw new Error("useProject must be used within an ProjectProvider");
  }
  return context;
};
