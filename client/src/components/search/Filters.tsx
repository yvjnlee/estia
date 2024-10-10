import { TechStackFilters } from "./TechStackFIlters";
import { ThemeFilters } from "./ThemeFilters";
import { DifficultyFilter } from "./DifficultyFilters";


export const Filters: React.FC = () => {
    return (
        <>
          <DifficultyFilter/>
          <ThemeFilters/>
          <TechStackFilters/>
        </>

    );
};
