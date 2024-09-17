import React from 'react';
import { useNavigate } from 'react-router-dom';

// Define your project data
const projectData: Record<string, { title: string; descript: string }> = {
  "Syllabus Extractor": { title: "Syllabus Extractor", descript: "Details about Syllabus Extractor" },
  "Netflix Clone": { title: "Netflix Clone", descript: "The Netflix clone project is a web application developed using HTML, CSS, and JavaScript, aiming to replicate the user interface and some features of the popular streaming service, Netflix." },
  "Spanish Writing Assistant": { title: "Spanish Writing Assistant", descript: "Details about Spanish Writing Assistant" },
  "Football Webscraper": { title: "Football Webscraper", descript: "Details about Football Webscraper" },
  "Actorle": { title: "Actorle", descript: "Details about Actorle" }
};

const ProjectDetails: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Extract the project name from the URL
  const url = window.location.href;
  const urlParts = url.split('/');
  const rawTitle = urlParts[urlParts.length - 1];
  console.log('Raw Title from URL:', rawTitle);

  // Decode the project name
  const decodedTitle = decodeURIComponent(rawTitle);
  console.log('Decoded Title from URL:', decodedTitle);
  console.log('Available project data keys:', Object.keys(projectData));

  // Get the project details based on the decoded title parameter
  const project = decodedTitle && projectData[decodedTitle]
    ? projectData[decodedTitle]
    : { title: "Not Found", descript: "Details not available" };

  return (
    <>
    <button onClick={() => navigate(-1)} className="back-button">Back</button>
    <div className="details-container">
      <h1 className='details-title'>{project.title}</h1>
      <p className='details-subtitle'>{project.descript}</p>
    </div>
    </>
  );
};

export default ProjectDetails;
