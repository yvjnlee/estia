import React, { createContext, useContext, useState, useEffect } from "react";
import { ProjectInfo, ProjectsDB, ProjectsProps } from "../types/project";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext<ProjectsProps | undefined>(undefined);

export const ProjectProvider: React.FC<{
    children: React.ReactNode;
}> = ({ children }) => {
    const { supabase } = useAuth(); // Ensure you have supabase here
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
    const [projects, setProjects] = useState<ProjectInfo[] | null>();
    const [projectFeed, setProjectFeed] = useState<ProjectInfo[] | null>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("estia_projects")
          .select("*");
        if (error) {
          console.log(error);
        }
        // console.log(data);
        if (data) {
          const mappedData : ProjectInfo[] = data.map((row: ProjectsDB) => ({
            projectName: row.project_name,
            createdAt: row.created_at,
            tech1: row.tech1,
            tech2: row.tech2,
            colour: row.colour,
            description: row.description,
            videoId: row.video_Id,
            repoPath: row.repo_Path,
            projectId: row.project_id,
          }));

                    setProjects(mappedData);
                    setProjectFeed(mappedData);
                }
            } catch (err) {
                console.log(err);
            } finally {
                // console.log("got data")
            }
        };
        fetchData();
    }, [supabase]);

    const searchProjects = () => {
        const lowercasedQuery = searchQuery.toLowerCase();
        const filtered = projects?.filter((project) => {
            const matchesSearchQuery =
                project.projectName?.toLowerCase().includes(lowercasedQuery) ||
                project.description?.toLowerCase().includes(lowercasedQuery);

            const matchesTechStack =
                selectedTechStack.length === 0 ||
                selectedTechStack.some((tech) => project.tech1 === tech || project.tech2 === tech);

            return matchesSearchQuery && matchesTechStack;
        });

        setProjectFeed(filtered);
    };

    useEffect(() => {
        searchProjects();
    }, [searchQuery, selectedTechStack]);

    const onSearch = (tech: string[]) => {
        setSelectedTechStack(tech);
    };

    const onEnter = (e: React.KeyboardEvent<HTMLInputElement>, tech: string[]) => {
        if (e.key === "Enter") {
            setSelectedTechStack(tech);
        }
    };

    const onKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const value = {
        supabase, // Include supabase in the context value
        projects: projectFeed as ProjectInfo[],
        searchQuery: searchQuery,
        searchProjects: (tech: string[]) => setSelectedTechStack(tech),
        handleSearch: onSearch,
        handleEnter: onEnter,
        handleKeyPress: onKeyPress,
    };

    return <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>;
};

export const useProject = () => {
    const context = useContext(ProjectContext);
    if (context === undefined) {
        throw new Error("useProject must be used within a ProjectProvider");
    }
    return context;
};
