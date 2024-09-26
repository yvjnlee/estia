import React from 'react';
import { Link } from 'react-router-dom';
import { ProjectInfo } from '../../types/project';

const Project: React.FC<ProjectInfo> = ({ title, tech1, tech2, colour }) => {
  // Define the style object with the correct type
  const containerStyle: React.CSSProperties = {
    backgroundColor: colour,
    cursor: 'pointer',
    height: '13rem',
    width: '14.36rem',
    borderRadius: '4px',
    padding: '24px',
    display: 'flex',
    flexDirection: 'column', // 'column' is a valid value for `flexDirection`
    justifyContent: 'flex-start',
    transition: 'transform 0.3s ease, filter 0.3s ease',
  };

  return (
    <Link  to={`/project/${title}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="project-container" style={containerStyle}>
        <h2 className="project-title">{title}</h2>
        <div className="project-tech">
          <span className="tech-item">{tech1}</span>
          <span className="tech-item">{tech2}</span>
        </div>
      </div>
    </Link>
  );
};

export default Project;
