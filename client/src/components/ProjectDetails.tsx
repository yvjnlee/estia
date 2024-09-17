import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Define your project data
const projectData: Record<string, { title: string; descript: string }> = {
  "Syllabus Extractor": { title: "Syllabus Extractor", descript: "Details about Syllabus Extractor" },
  "Netflix Clone": { title: "Netflix Clone", descript: "The Netflix clone project is a web application developed using HTML, CSS, and JavaScript, aiming to replicate the user interface and some features of the popular streaming service, Netflix." },
  "Spanish Writing Assistant": { title: "Spanish Writing Assistant", descript: "Details about Spanish Writing Assistant" },
  "Football Webscraper": { title: "Football Webscraper", descript: "Details about Football Webscraper" },
  "Actorle": { title: "Actorle", descript: "Details about Actorle" }
};

const ProjectDetails: React.FC = () => {
  const { title } = useParams<{ title: string }>();
  const navigate = useNavigate(); // Hook for navigation
  
  // Log the raw and decoded title for debugging
  console.log('Raw Title from URL:', title);
  const decodedTitle = title ? decodeURIComponent(title) : '';
  console.log('Decoded Title from URL:', decodedTitle);
  console.log('Available project data keys:', Object.keys(projectData));

  // Get the project details based on the decoded title parameter
  const project = decodedTitle && projectData[decodedTitle] ? projectData[decodedTitle] : { title: "Not Found", descript: "Details not available" };

  return (
    <div className="project-detail-container">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <h1>{project.title}</h1>
      <p>{project.descript}</p>
    </div>
  );
};

export default ProjectDetails;
