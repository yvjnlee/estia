import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setDifficultyFilter } from "../../store/slices/projectSlice";
import { filterProjects } from "../../api/projectAPI";

export const DifficultyFilter: React.FC = () => {
    const dispatch = useAppDispatch();

    const difficultyOptions = ["Beginner", "Intermediate", "Advanced"];
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("");

    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        dispatch(setDifficultyFilter(difficulty));
        console.log(selectedDifficulty);
    };

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
