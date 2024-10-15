import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { setTechStackFilter } from "../../store/slices/projectSlice";
import { filterProjects } from "../../api/projectAPI";

export const TechStackFilters: React.FC = () => {
    const techStackOptions = [
        "Android",
        "Angular",
        "ASP.NET",
        "BackboneJS",
        "Bootstrap",
        "C",
        "C++",
        "C#",
        "Cassandra",
        "CodeIgniter",
        "CSS",
        "Dart",
        "Deno",
        "Django",
        "Ember.js",
        "Express",
        "Flask",
        "Gatsby",
        "Go",
        "GraphQL",
        "Haskell",
        "HTML",
        "Java",
        "JavaScript",
        "jQuery",
        "Kotlin",
        "Laravel",
        "Materialize",
        "MERN",
        "MongoDB",
        "MySQL",
        "NestJS",
        "NextJS",
        "Node.js",
        "Oracle",
        "Pandas",
        "PHP",
        "PostgreSQL",
        "Python",
        "Rails",
        "React",
        "React Native",
        "Redis",
        "Redux",
        "Ruby",
        "Ruby on Rails",
        "Rust",
        "SCSS",
        "Spring",
        "Svelte",
        "TailwindCSS",
        "TensorFlow",
        "TypeScript",
        "VueJS",
    ];

    const dispatch = useAppDispatch();
    const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
    const [showMore, setShowMore] = useState(false);

    const handleFilter = (tech: string) => {
        setSelectedTechStack((prevSelected) => {
            const isChecked = prevSelected.includes(tech);
            const newSelected = isChecked
                ? prevSelected.filter((item) => item !== tech)
                : [...prevSelected, tech];

            dispatch(setTechStackFilter(selectedTechStack));
            console.log(selectedTechStack);

            return newSelected;
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
