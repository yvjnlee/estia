import React from "react";
import { useProject } from "../../context/ProjectContext";

export const SearchBar: React.FC = () => {
    const { searchQuery, handleEnter, handleKeyPress, handleSearch } = useProject();

    return (
        <div className="search-container" data-scroll-section>
            <input
              type="text"
              placeholder="Search projects..."
              value={ searchQuery }
              onChange={ handleKeyPress }
              onKeyPress={ () => handleEnter }
              className="search-bar"
            />
            <button onClick={ () => handleSearch} className="search-button">
              Search
            </button>
        </div>
    );
}