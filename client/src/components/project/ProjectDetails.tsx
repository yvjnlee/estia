import React from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embded/YoutubeEmbed";
import GitHubRepo from "./embded/GithubEmbed";
// Import the new projects data
import { projects } from "../../types/project";

// Import components
import {Navbar} from "../navbar/Navbar";
import TechStack from "./TechStack";
import DifficultyLevel from "./DifficultyLevel";
import Comments from "./Comments";

const ProjectDetails: React.FC = () => {
  const navigate = useNavigate(); // Hook for navigation

  // Get the current URL and extract the project title
  const url = window.location.href;
  const urlParts = url.split("/");
  const rawTitle = urlParts[urlParts.length - 1];

  // Decode the project name from URL
  const decodedTitle = decodeURIComponent(rawTitle);

  // Get the project details based on the decoded title parameter
  const project = projects.find(
    (project) => project.title === decodedTitle,
  ) || {
    title: `${decodedTitle} was not found`,
    tech1: "Not Found",
    tech2: "",
    colour: "#000000",
    descript: "Details not available",
    videoId: "No video link found",
    repoPath: "No repo found",
  };

  return (
    <>
    <Navbar/>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>

      {/* Left side of page */}
      <div className="grid-container">
        <div className="grid-col-5">
          <div className="details-container">
       
                <h1 className="details-title">{project.title}</h1>
                <p className="details-subtitle">{project.descript}</p>

          <div className="row">
            <div className="col-6">
              <div className="embed-container">
                <YouTubeEmbed videoId={project.videoId as string} />
              </div>
            </div>

            <div className="col-5">
              <div>
                <GitHubRepo repoPath={project.repoPath as string} />
              </div>
            </div>
          </div>
          </div>
          <div className="row">
            <Comments/>
          </div>
        </div>

        {/* Right side of page */}
        <div className="grid-col-4">
          <div className="row">
            <TechStack tech1={project.tech1} tech2={project.tech2}/>
          </div>

          <div className="row">
            <DifficultyLevel/>
          </div>

          <div className="row">
            <div className="sidebar-container">
              <h1>Similar Projects</h1>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default ProjectDetails;
