import React, { useState } from "react";
import { setThemeFilter } from "../../store/slices/projectSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { filterProjects } from "../../api/projectAPI";

import { themeOptions } from "../../storage/option";

export const ThemeFilters: React.FC = () => {

    const dispatch = useAppDispatch();
    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [showMore, setShowMore] = useState(false);

    const handleFilter = (tech: string) => {
        setSelectedThemes((prevSelected) => {
            const isChecked = prevSelected.includes(tech);
            const newSelected = isChecked
                ? prevSelected.filter((item) => item !== tech)
                : [...prevSelected, tech];

            dispatch(setThemeFilter(newSelected));
            console.log(newSelected);

            return newSelected;
        });
    };

    return (
        <div className="filters" data-scroll-section>
            <div className="dropdown-container">
                <label className="filter-label">Filter by Theme:</label>
                <div className="dropdown">
                    {themeOptions.slice(0, 5).map((theme) => (
                        <div key={theme} className="dropdown-item">
                            <input
                                type="checkbox"
                                id={theme}
                                value={theme}
                                checked={selectedThemes.includes(theme)}
                                onChange={() => handleFilter(theme)}
                            />
                            <label htmlFor={theme}>{theme}</label>
                        </div>
                    ))}
                    {showMore && (
                        <>
                            {themeOptions.slice(5).map((theme) => (
                                <div key={theme} className="dropdown-item">
                                    <input
                                        type="checkbox"
                                        id={theme}
                                        value={theme}
                                        checked={selectedThemes.includes(theme)}
                                        onChange={() => handleFilter(theme)}
                                    />
                                    <label htmlFor={theme}>{theme}</label>
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <button className="more-btn" onClick={() => setShowMore(!showMore)}>
                    {showMore ? "Show Less" : "Show More"}
                </button>
            </div>
        </div>
    );
};
