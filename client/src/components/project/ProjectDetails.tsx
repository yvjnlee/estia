import React from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";
import { useProject } from "../../context/ProjectContext";
import { useAuth } from "../../context"; // Ensure you're using useAuth for user context

// Imported icons
import LikeImage from "../../img/ThumbsUp.svg";
import FavImage from "../../img/Star.svg";

// Import components
import { Navbar } from "../navbar/Navbar";
import TechStack from "./TechStack";
import DifficultyLevel from "./DifficultyLevel";
import DiscussionBoard from "./DiscussionBoard";

const ProjectDetails: React.FC = () => {
  const { projects } = useProject();
  const navigate = useNavigate(); // Hook for navigation
  const { supabase, user } = useAuth(); // Ensure you're getting the user properly

  // Get the current URL and extract the project title
  const url = window.location.href;
  const urlParts = url.split("/");
  const rawTitle = urlParts[urlParts.length - 1];

  // Decode the project name from URL
  const decodedTitle = decodeURIComponent(rawTitle);

  // Get the project details based on the decoded title parameter
  const project = projects?.find((project) => project.projectName === decodedTitle);

  // Function to save the project
  const saveProject = async (projectData: any) => {
    if (user) { // Check if the user is logged in
      const profile_id = user.id; // Use the user id from useAuth
      const project_id = projectData.projectId; // Get project_id from projectData

      if (profile_id && project_id) {
        try {
          const { data, error } = await supabase
            .from('saved_projects')
            .insert([{ profile_id: profile_id, project_id: project_id }])
            .select();

          if (error) {
            throw new Error(`Failed to save project: ${error.message}`);
          }

          console.log('Project saved successfully:', data);
        } catch (error) {
          console.error('Error saving project:', error);
        }
      } else {
        console.error('Missing profile_id or project_id');
      }
    } else {
      console.error('User is not logged in');
    }
  };

  // Function to like the project
  const likeProject = (projectData: any) => {
    if (user) { // Check if the user is logged in
      const profile_id = user.id;
      const { projectId } = projectData;

      if (profile_id && projectId) {
        console.log('User liked project:', projectId);
        // Add liking functionality here, e.g., updating a database
      } else {
        console.error('Missing profile_id or project_id');
      }
    } else {
      console.error('User is not logged in');
    }
  };

  return (
    <>
      <Navbar />
      <div className="details-main-container">
        {/* Left side of page */}
        <div className="grid-container">
          <div className="">
            <button onClick={() => navigate(-1)} className="back-button">
              Back
            </button>
            <div className="details-container">
              <div className="title-and-description">
                <h1 className="details-title">{project?.projectName}</h1>
              </div>
              <div className="description-container">
                <YouTubeEmbed videoId={project?.videoId as string} />
                <p className="details-subtitle">{project?.description}</p>
              </div>
            </div>
            <div className="button-container">
              <button
                className="save-and-like-button"
                onClick={() => saveProject(project)}
              >
                <img className="like-fav-icon" src={FavImage} alt="Save" />
                <p>Save</p>
              </button>
              <button
                className="save-and-like-button"
                onClick={() => likeProject(project)}
              >
                <img className="like-fav-icon" src={LikeImage} alt="Like" />
                <p>Like</p>
              </button>
            </div>
            <div className="">
              <DiscussionBoard />
            </div>
          </div>

          {/* Right side of page */}
          <div className="additional-information-container">
            <TechStack
              tech1={project?.tech1 || ""}
              tech2={project?.tech2 || ""}
            />
            <GitHubRepo repoPath={project?.repoPath as string} />
            <DifficultyLevel />
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
