import React from 'react';

// Define props type
interface ProjectProps {
    title: string;
    tech1: string;
    tech2: string;
    colour: string;

    // we can add more later accordingly
}

const Project: React.FC<ProjectProps> = ({ title, tech1, tech2, colour }) => {
    const containerStyle = {
        backgroundColor: colour
    };

    return (

        <div className="project-container" style={containerStyle}>
            <h2 className="project-title">{title}</h2>
            <div className="project-tech">
                <span className="tech-item">{tech1}</span>
                <span className="tech-item">{tech2}</span>
            </div>
        </div>
    );
};

export default Project;
