import React from "react";
import { SearchBar } from "./SearchBar";
import { Filters } from "./Filters";

export const SearchContainer: React.FC = () => {
  return (
    <div className="heading-container">
      <div className="heading-content">
        <h2 className="main-h2" data-scroll-section>
          start building today
        </h2>

        <SearchBar />

        <Filters />
      </div>
    </div>
  );
};
