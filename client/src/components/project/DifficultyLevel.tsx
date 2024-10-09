import React from "react";

interface DifficultyProps {
    difficulty: string; // i hate typescript why do i gotta do this
}


const DifficultyLevel: React.FC<DifficultyProps>  = ( { difficulty }) => {
    return (
        <div className={`difficulty-pill ${difficulty?.toLowerCase() || "beginner"}`}>
           {difficulty || "Beginner"}
        </div>
    );
};

export default DifficultyLevel;
