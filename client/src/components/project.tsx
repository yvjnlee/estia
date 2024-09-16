import React, { useState, useRef, useEffect } from 'react';

interface ProjectProps {
  title: string;
  tech1: string;
  tech2: string;
  colour: string;
  descript?: string;
}

const Project: React.FC<ProjectProps> = ({ title, tech1, tech2, colour, descript }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isModalOpen]);

  const containerStyle = {
    backgroundColor: colour,
    cursor: 'pointer',
  };

  return (
    <>
      <div
        className="project-container"
        style={containerStyle}
        onClick={openModal}
        ref={projectRef}
      >
        <h2 className="project-title">{title}</h2>
        <div className="project-tech">
          <span className="tech-item">{tech1}</span>
          <span className="tech-item">{tech2}</span>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
          <button className="close-button" onClick={closeModal}>Close</button>
            <h2>{title}</h2>
            <p>{descript}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Project;
