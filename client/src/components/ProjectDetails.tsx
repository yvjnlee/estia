import React from 'react';
import { useNavigate } from 'react-router-dom';
import YouTubeEmbed from './YoutubeEmbed';
import GitHubEmbed from './GithubEmbed';

// Define your project data
const projectData: Record<string, { title: string; descript: string; videoId: string; repoPath: string }> = {
  "Twitter Sentiment Analysis": { title: "Twitter Sentiment Analysis", descript: "Details about Twitter Sentiment Analysis", videoId:"ATz8wg6sg30", repoPath:"fireclint/netflix-react-tailwind" },
  "Netflix Clone": { title: "Netflix Clone", descript: "The Netflix clone project is a web application developed using React JS, Tailwind CSS, and Firebase, aiming to replicate the user interface and some features of the popular streaming service, Netflix.", videoId:"ATz8wg6sg30", repoPath:"fireclint/netflix-react-tailwind" },
  "Spanish Writing Assistant": { title: "Spanish Writing Assistant", descript: "Details about Spanish Writing Assistant", videoId:"ATz8wg6sg30", repoPath:"fireclint/netflix-react-tailwind" },
  "Football Webscraper": { title: "Football Webscraper", descript: "Details about Football Webscraper", videoId:"ATz8wg6sg30", repoPath: "fireclint/netflix-react-tailwind" },
  "Actorle": { title: "Actorle", descript: "Details about Actorle", videoId:"ATz8wg6sg30", repoPath: "fireclint/netflix-react-tailwind" }
};

const ProjectDetails: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  const url = window.location.href;
  const urlParts = url.split('/');
  const rawTitle = urlParts[urlParts.length - 1];

  // Decode the project name
  const decodedTitle = decodeURIComponent(rawTitle);


  // Get the project details based on the decoded title parameter
  const project = decodedTitle && projectData[decodedTitle]
    ? projectData[decodedTitle]
    : { title: "Not Found", descript: "Details not available", videoId: "No video link found", repoPath: "No repo found" };

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <div className="details-container">
        <div className='details-heading'>
          <h1 className='details-title'>{project.title}</h1>
          <p className='details-subtitle'>{project.descript}</p>
        </div>
        <div className='embed-container'>
          <YouTubeEmbed videoId={project.videoId} />
          <GitHubEmbed repoPath={project.repoPath} />
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
