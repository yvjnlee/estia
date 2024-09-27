import React from "react";
import { useProject } from "../../../context";
import { SearchBar } from "../SearchBar";
import { Filters } from "../Filters";

export const ProjectSearch: React.FC = () => {
  const { searchQuery, handleEnter, handleKeyPress, handleSearch } =
    useProject();

  return (
    <div className="heading-container">
      <div className="heading-content">
        <h2 className="main-h2" data-scroll-section>
          start building today
        </h2>

        <SearchBar
          searchQuery={searchQuery}
          handleEnter={handleEnter}
          handleKeyPress={handleKeyPress}
          handleSearch={handleSearch}
        />

        <Filters />
      </div>
    </div>
  );
};
