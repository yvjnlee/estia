import React, { useState, useEffect } from "react";
import { useProject } from "../../context/ProjectContext";

export const ThemeFilters: React.FC = () => {
    const themeOptions = [
        "Game Development", "Full Stack", "Portfolio", "Clone App (Full Stack)",
        "Clone App (Frontend)", "Frontend", "Backend", "Machine Learning", "Simple", "Web Development",
    ];

    const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
    const [showMore, setShowMore] = useState(false); // To toggle visibility

    const { handleSearch, searchProjects } = useProject();

    const handleFilter = (theme: string) => {
        setSelectedThemes((prevSelected) => {
            const isChecked = prevSelected.includes(theme);
            const newSelected = isChecked
                ? prevSelected.filter((item) => item !== theme)
                : [...prevSelected, theme];
            
            // Trigger project search whenever filter is updated
            handleSearch([], newSelected.length ? newSelected[0] : "");
            return newSelected;
        });
    };

    useEffect(() => {
        searchProjects();
    }, [selectedThemes, searchProjects]);

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
