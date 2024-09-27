import React, { useState } from "react";
import { useProject } from "../../../context";
import { SearchBar } from "../SearchBar";
import { Filters } from "../Filters";

import GreyFilter from "../../../img/Grey_Filters.svg";
import WhiteFilter from "../../../img/White_Filters.svg";

export const ProjectSearch: React.FC = () => {
  const { searchQuery, handleEnter, handleKeyPress, handleSearch } = useProject();

  const [showFilters, setShowFilters] = useState<boolean>(false);

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
          <SearchBar
            searchQuery={searchQuery}
            handleEnter={handleEnter}
            handleKeyPress={handleKeyPress}
            handleSearch={handleSearch}
          />

          <button
            className={
              showFilters
                ? "filters-button white-filter"
                : "filters-button grey-Filter"
            }
            onClick={handleToggleFilters}
          >
            <img
              className="filters-logo"
              src={showFilters ? WhiteFilter : GreyFilter}
              alt="Filter Icon"
            />
            Filters
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
