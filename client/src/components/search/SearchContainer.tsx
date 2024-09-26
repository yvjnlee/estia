import React, { useState } from "react";
import { SearchBar } from "./SearchBar";
import { Filters } from "./Filters";

export const SearchContainer: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="heading-container">
      <div className="heading-content">
        <h2 className="main-h2" data-scroll-section>
          start building today
        </h2>

        <div className="search-bar-and-filters">
          <SearchBar />

          <button className="filters-button" onClick={handleToggleFilters}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        {/* Smooth height transition */}
        <div className={`filters-container ${showFilters ? "show" : ""}`}>
          <Filters />
        </div>
      </div>
    </div>
  );
};
