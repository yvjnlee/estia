import React from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embded/YoutubeEmbed";
import GitHubRepo from "./embded/GithubEmbed";

// Import the new projects data
import { projects } from "../../types/project";

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
    tech1: "Not Found",
    tech2: "",
    colour: "#000000",
    descript: "Details not available",
    videoId: "No video link found",
    repoPath: "No repo found",
  };

  return (
    <>
      <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
      <div className="grid-container">
        <div className="grid-column">
          <div className="row">
            <div className="details-heading">
              <h1 className="details-title">{decodedTitle}</h1>
              <p className="details-subtitle">{project.descript}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-5">
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
        <div className="grid-column">
          <h2>Tech Stack</h2>
          <div className="row"></div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
