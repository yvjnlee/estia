import { TechStackFilters } from "./TechStackFilters";
import { ThemeFilters } from "./ThemeFilters";
import { DifficultyFilter } from "./DifficultyFilters";
import React from "react";


export const Filters: React.FC = () => {
    return (
        <>
        <div style={{display: "flex", flexDirection: "column"}}>
            <DifficultyFilter />
            <ThemeFilters />
            <TechStackFilters />
            </div>
        </>

    );
};