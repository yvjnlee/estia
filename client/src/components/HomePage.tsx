import React, { useState, useEffect, useRef } from 'react';
import Project from './Project';
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';

// Define the props interface for the Project component
interface ProjectData {
  title: string;
  tech1: string;
  tech2: string;
  colour: string;
  descript?: string;
}

const projects: ProjectData[] = [
  { title: "Syllabus Extractor", tech1: "React", tech2: "TypeScript", colour: "#6F0000" },
  { title: "Netflix Clone", tech1: "React", tech2: "TypeScript", colour: "#456F00", descript: "The Netflix clone project is a web application developed using HTML, CSS, and JavaScript, aiming to replicate the user interface and some features of the popular streaming service, Netflix." },
  { title: "Spanish Writing Assistant", tech1: "React", tech2: "TypeScript", colour: "#006F5B" },
  { title: "Football Webscraper", tech1: "React", tech2: "TypeScript", colour: "#6F0050" },
  { title: "Actorle", tech1: "React", tech2: "TypeScript", colour: "#45006F" },
  { title: "Football Webscraper", tech1: "React", tech2: "TypeScript", colour: "#000B6F" },
];

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<ProjectData[]>(projects);
  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    const filtered = projects.filter(project =>
      project.title.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredProjects(filtered);
  }, [searchQuery]);

  return (
    <div className="main-container">
      <div className="heading-container">
        <h2 className="main-h2" data-scroll-section>
          start building today
        </h2>
        <input
          type="text"
          placeholder="Search projects..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <div className="projects-container">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div className="project-row" key={index} data-scroll-section>
              <Project
                title={project.title}
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
         {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div className="project-row" key={index} data-scroll-section>
              <Project
                title={project.title}
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
         {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div className="project-row" key={index} data-scroll-section>
              <Project
                title={project.title}
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
         {filteredProjects.length > 0 ? (
          filteredProjects.map((project, index) => (
            <div className="project-row" key={index} data-scroll-section>
              <Project
                title={project.title}
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
