import React, { useState } from "react";
import { useProject } from "../../context/ProjectContext";

export const Filters: React.FC = () => {
  // Tech stack options
  const techStackOptions = [
    "React",
    "TypeScript",
    "Python",
    "Tensorflow",
    "TailwindCSS",
  ];

  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);

  const { searchProjects } = useProject();

  // Toggle the tech stack selection
  const handleFilter = (tech: string) => {
    setSelectedTechStack((prevSelected) => {
      const isChecked = prevSelected.includes(tech);
      const newSelected = isChecked
        ? prevSelected.filter((item) => item !== tech) // Uncheck the tech
        : [...prevSelected, tech]; // Check the tech

      // Call filterProjects with the updated selection
      searchProjects(newSelected);

      return newSelected; // Return the updated selection
    });
  };

  return (
    <div className="filters" data-scroll-section>
      {/* Dropdown for Tech Stack */}
      <div className="dropdown-container">
        <label className="filter-label">Filter by Tech Stack:</label>
        <div className="dropdown">
          {techStackOptions.map((tech) => (
            <div key={tech} className="dropdown-item">
              <input
                type="checkbox"
                id={tech}
                value={tech}
                checked={selectedTechStack.includes(tech)} // Checked state based on selectedTechStack
                onChange={() => handleFilter(tech)} // Update and filter on change
              />
              <label htmlFor={tech}>{tech}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
