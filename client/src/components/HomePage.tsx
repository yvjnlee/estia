// src/components/HomePage.tsx
import React, { useEffect, useRef } from 'react';
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
  return (
    <div className="main-container">
      <div className="heading-container">
        <h2 className="main-h2" data-scroll-section>
          start building today
        </h2>
      </div>
      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-row" key={index} data-scroll-section>
            <Project
              title={project.title}
              tech1={project.tech1}
              tech2={project.tech2}
              colour={project.colour}
              descript={project.descript}
            />
          </div>
        ))}
        {projects.map((project, index) => (
          <div className="project-row" key={index} data-scroll-section>
            <Project
              title={project.title}
              tech1={project.tech1}
              tech2={project.tech2}
              colour={project.colour}
              descript={project.descript}
            />
          </div>
        ))}
        {projects.map((project, index) => (
          <div className="project-row" key={index} data-scroll-section>
            <Project
              title={project.title}
              tech1={project.tech1}
              tech2={project.tech2}
              colour={project.colour}
              descript={project.descript}
            />
          </div>
        ))}
        
      </div>
    </div>
  );
};

export default HomePage;
