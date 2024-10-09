import React, { useState } from "react";
import { searchProjects } from "../../store/slices/projectSlice";
import { useAppDispatch } from "../../hooks/useAppDispatch";

export const Filters: React.FC = () => {
    const techStackOptions = [
        "React",
        "TypeScript",
        "Python",
        "Tensorflow",
        "TailwindCSS",
        "Next.js",
        "GraphQL",
        "Angular",
        "HTML/CSS",
        "C++",
    ];
    const dispatch = useAppDispatch();
    const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
    const [showMore, setShowMore] = useState(false); // State to toggle the visibility

    const handleFilter = (tech: string) => {
        setSelectedTechStack((prevSelected) => {
            const isChecked = prevSelected.includes(tech);
            const newSelected = isChecked
                ? prevSelected.filter((item) => item !== tech)
                : [...prevSelected, tech];
            return newSelected;
        });

        dispatch(searchProjects({ techStack: selectedTechStack }))
            .unwrap()
            .then((projects) => {
                console.log(projects);
            })
            .catch((error) => {
                console.error("Error fetching projects:", error);
            });
    };

    return (
        <div className="filters" data-scroll-section>
            <div className="dropdown-container">
                <label className="filter-label">Filter by Tech Stack:</label>
                <div className="dropdown">
                    {techStackOptions.slice(0, 5).map((tech) => (
                        <div key={tech} className="dropdown-item">
                            <input
                                type="checkbox"
                                id={tech}
                                value={tech}
                                checked={selectedTechStack.includes(tech)}
                                onChange={() => handleFilter(tech)}
                            />
                            <label htmlFor={tech}>{tech}</label>
                        </div>
                    ))}
                    {showMore && (
                        <>
                            {techStackOptions.slice(5).map((tech) => (
                                <div key={tech} className="dropdown-item">
                                    <input
                                        type="checkbox"
                                        id={tech}
                                        value={tech}
                                        checked={selectedTechStack.includes(tech)}
                                        onChange={() => handleFilter(tech)}
                                    />
                                    <label htmlFor={tech}>{tech}</label>
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
