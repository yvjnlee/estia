import React, { createContext, useContext, useState, useEffect } from "react";
import { ProjectInfo, ProjectsDB, ProjectsProps } from "../types/project";
import { useAuth } from "./AuthContext";

const ProjectContext = createContext<ProjectsProps | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { supabase } = useAuth(); // Ensure supabase is available
    const [searchQuery, setSearchQuery] = useState<string>("");

    const  [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
    const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
    const [selectedTheme, setSelectedTheme] = useState<string>("");

    const [projects, setProjects] = useState<ProjectInfo[] | null>(null);
    const [projectFeed, setProjectFeed] = useState<ProjectInfo[] | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                .from("estia_projects")
                .select("*");
                
                if (error) {
                    console.error(error);
                } else if (data) {
                    const mappedData: ProjectInfo[] = data.map((row: ProjectsDB) => ({
                        projectName: row.project_name,
                        createdAt: row.created_at,
                        tech1: row.tech1,
                        tech2: row.tech2,
                        colour: row.colour,
                        description: row.description,
                        videoId: row.video_Id,
                        repoPath: row.repo_Path,
                        projectId: row.project_id,
                        theme: row.theme,
                        difficulty: row.difficulty,
                        likes: row.likes,
                    }));
                    setProjects(mappedData);
                    setProjectFeed(mappedData);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [supabase]);

    const searchProjects = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    
    // Split the query by commas and trim whitespace from each term
    const searchTerms = lowercasedQuery.split(',').map(term => term.trim()).filter(term => term.length > 0);
    
    const filtered = projects?.filter((project) => {
        // Check if the project matches any of the search terms
        const matchesSearchQuery = searchTerms.some(term => 
            project.projectName.toLowerCase().includes(term) ||
            project.description?.toLowerCase().includes(term) ||
            project.tech1?.toLowerCase().includes(term) ||
            project.tech2?.toLowerCase().includes(term)
        );

        const matchesTechStack =
            selectedTechStack.length === 0 ||
            selectedTechStack.some((tech) => project.tech1 === tech || project.tech2 === tech);

        const matchesTheme = !selectedTheme || project.theme === selectedTheme;

        const matchesDifficulty = !selectedDifficulty || project.difficulty === selectedDifficulty;

        return matchesSearchQuery && matchesTechStack && matchesTheme && matchesDifficulty;
    });

    return filtered || [];
};

    useEffect(() => {
        const filteredProjects = searchProjects();
        setProjectFeed(filteredProjects);
    }, [searchQuery, selectedTechStack, selectedTheme, selectedDifficulty]);

    const handleSearch = (tech: string[], theme: string, difficulty: string) => {
        setSelectedTechStack(tech);
        setSelectedTheme(theme);
        setSelectedDifficulty(difficulty);

    };

    const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, tech: string[]) => {
        if (e.key === "Enter") {
            setSelectedTechStack(tech);
        }
    };

    const handleKeyPress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const value = {
        supabase,
        projects: projectFeed as ProjectInfo[],
        searchQuery,
        handleSearch,
        handleEnter,
        handleKeyPress,
        searchProjects,
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
