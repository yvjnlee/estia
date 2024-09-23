import React, { useState, useEffect, useRef } from 'react';
import Project from './Project';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import { projects } from '../data/data'; // Import from the external data file

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTechStack, setSelectedTechStack] = useState<string[]>([]);
  const [filteredProjects, setFilteredProjects] = useState(Object.entries(projects));
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Tech stack options
  const techStackOptions = ['React', 'TypeScript', 'Python', 'Tensorflow', 'TailwindCSS'];

  // Toggle the tech stack selection
  const handleTechStackChange = (tech: string) => {
    if (selectedTechStack.includes(tech)) {
      setSelectedTechStack(selectedTechStack.filter((item) => item !== tech));
    } else {
      setSelectedTechStack([...selectedTechStack, tech]);
    }
  };

  // Filter projects based on search query and selected tech stack
  const filterProjects = () => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = Object.entries(projects).filter(([title, project]) => {
      const matchesSearchQuery =
        title.toLowerCase().includes(lowercasedQuery) ||
        project.descript.toLowerCase().includes(lowercasedQuery);

      const matchesTechStack =
        selectedTechStack.length === 0 ||
        selectedTechStack.some((tech) => project.tech1 === tech || project.tech2 === tech);

      return matchesSearchQuery && matchesTechStack;
    });
    setFilteredProjects(filtered);
  };

  useEffect(() => {
    const scrollElement = scrollRef.current;

    if (scrollElement) {
      const locomotiveScroll = new LocomotiveScroll({
        el: scrollElement,
        smooth: true,
        getDirection: true,
      });

      return () => {
        locomotiveScroll.destroy();
      };
    }
  }, []);

  // Handle search when Enter key is pressed
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      filterProjects();
    }
  };

  // Handle search when button is clicked
  const handleSearch = () => {
    filterProjects();
  };

  // Function to repeat projects
  const repeatProjects = (projectsArray: [string, any][], times: number) => {
    let repeatedProjects: [string, any][] = [];
    for (let i = 0; i < times; i++) {
      repeatedProjects = repeatedProjects.concat(projectsArray);
    }
    return repeatedProjects;
  };

  // Repeat the filtered projects 4 times
  const repeatedProjects = repeatProjects(filteredProjects, 4);

  return (
    <div className="main-container" ref={scrollRef}>
      <div className="heading-container">
        <div className="heading-content">
          <h2 className="main-h2" data-scroll-section>
            start building today
          </h2>
          <div className="search-container" data-scroll-section>
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="search-bar"
            />
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
          </div>
          <div className="filters" data-scroll-section>
            {/* Dropdown for Tech Stack */}
            <div className="dropdown-container">
              <label className='filter-label'>Filter by Tech Stack:</label>
              <div className="dropdown">
                {techStackOptions.map((tech) => (
                  <div key={tech} className="dropdown-item">
                    <input
                      type="checkbox"
                      id={tech}
                      value={tech}
                      checked={selectedTechStack.includes(tech)}
                      onChange={() => handleTechStackChange(tech)}
                    />
                    <label htmlFor={tech}>{tech}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="projects-container">
        {repeatedProjects.length > 0 ? (
          repeatedProjects.map(([title, project], index) => (
            <div className="project-row" key={index} data-scroll-section>
              <Project
                title={title}
                tech1={project.tech1}
                tech2={project.tech2}
                colour={project.colour}
                descript={project.descript}
              />
            </div>
          ))
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
