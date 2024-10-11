import { TechStackFilters } from "./TechStackFilters";
import { ThemeFilters } from "./ThemeFilters";
import { DifficultyFilter } from "./DifficultyFilters";
import React from "react";


export const Filters: React.FC = () => {
    return (
        <>
            <DifficultyFilter />
            <ThemeFilters />
            <TechStackFilters />
        </>

    );
};