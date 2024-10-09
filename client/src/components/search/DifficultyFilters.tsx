import React, { useState, useEffect } from "react";
import { useProject } from "../../context/ProjectContext";

export const DifficultyFilter: React.FC = () => {
    const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];
    
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");
    
    const { handleSearch, searchProjects } = useProject();

    // Handle change for difficulty selection
    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        // Trigger project search whenever difficulty is updated
        handleSearch([], "", difficulty);
    };

    useEffect(() => {
        searchProjects();
    }, [selectedDifficulty, searchProjects]);

    return (
        <div className="difficulty-filter">
            <label className="difficulty-filter-label">Select Difficulty:</label>
            <select
                value={selectedDifficulty}
                className="difficulty-select"
                onChange={(e) => handleDifficultyChange(e.target.value)}
            >
                <option value="">-- Select Difficulty --</option>
                {difficultyOptions.map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                        {difficulty}
                    </option>
                ))}
            </select>
        </div>
    );
};
