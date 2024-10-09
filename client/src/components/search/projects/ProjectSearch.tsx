import React, { useState } from "react";
import { SearchBar } from "../SearchBar";
import { Filters } from "../Filters";

import GreyFilter from "../../../img/Grey_Filters.svg";
import WhiteFilter from "../../../img/White_Filters.svg";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { searchProjects } from "../../../store/slices/projectSlice";

export const ProjectSearch: React.FC = () => {
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const dispatch = useAppDispatch();

    const handleEnter = () => {
        handleSearch(searchQuery);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch(searchQuery);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        dispatch(searchProjects({ searchQuery }))
            .unwrap()
            .then((projects) => {
                console.log(projects);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    };

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
