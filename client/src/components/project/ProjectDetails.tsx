import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";
import { useProject } from "../../context/ProjectContext";
import { useAuth } from "../../context"; // Ensure you're using useAuth for user context
import { CommentInfo, CommentDB } from "../../types/comment";
import supabase from "../../SupabaseClient";

// Imported icons
import LikeImage from "../../img/ThumbsUp.svg";
import LikedImage from "../../img/Liked.svg";

import FavImage from "../../img/Star.svg";
import SavedImage from "../../img/Starred.svg"

// Import components
import { Navbar } from "../navbar/Navbar";
import TechStack from "./TechStack";
import DifficultyLevel from "./DifficultyLevel";
import DiscussionBoard from "./DiscussionBoard";

const ProjectDetails: React.FC = () => {
  const { projects } = useProject();
  const navigate = useNavigate(); // Hook for navigation
  const { supabase, user } = useAuth(); // Ensure you're getting the user properly

  const [isLiked, setIsLiked] = useState(false); // Manage liked state
  const [isSaved, setIsSaved] = useState(false); // Manage saved state
  const [comments, setComments] = useState<CommentInfo[]>([]);

  // Get the current URL and extract the project title
  const url = window.location.href;
  const urlParts = url.split("/");
  const rawTitle = urlParts[urlParts.length - 1];
  const decodedTitle = decodeURIComponent(rawTitle);

  // Get the project details based on the decoded title parameter
  const project = projects.find((project) => project.projectName === decodedTitle);

  if (!project) {
    throw new Error("This project doesn't exist");
  }

  // Function to check if the project is already saved
  const checkIfSaved = async () => {
    if (user) {
      const { data: savedProjects, error } = await supabase
        .from("saved_projects")
        .select("project_id")
        .eq("profile_id", user.id)
        .eq("project_id", project.projectId); // Check if this project is saved

      if (savedProjects && savedProjects.length > 0) {
        setIsSaved(true); // Project is already saved
      } else {
        setIsSaved(false); // Project is not saved
      }
    }
  };


  // Function to check if the project is already saved
  const checkIfLiked = async () => {
    if (user) {
      const { data: likedProjects, error } = await supabase
        .from("liked_projects")
        .select("project_id")
        .eq("profile_id", user.id)
        .eq("project_id", project.projectId); // Check if this project is liked

      if (likedProjects && likedProjects.length > 0) {
        setIsLiked(true); // Project is already liked
      } else {
        setIsLiked(false); // Project is not liked
      }
    }
  };

  // Run checkIfSaved when component mounts
  useEffect(() => {
    checkIfSaved();
    checkIfLiked();
  }, [user, project]);

  // Function to save or unsave the project
  const toggleSaveProject = async () => {
    if (user) {
      if (isSaved) {
        // Unsave project
        const { error } = await supabase
          .from("saved_projects")
          .delete()
          .eq("profile_id", user.id)
          .eq("project_id", project.projectId);

        if (!error) {
          setIsSaved(false); // Update state to "not saved"
        }
      } else {
        // Save project
        const { error } = await supabase
          .from("saved_projects")
          .insert([{ profile_id: user.id, project_id: project.projectId }]);

        if (!error) {
          setIsSaved(true); // Update state to "saved"
        }
      }
    } else {
      console.error("User is not logged in");
    }
  };


  // Function to save or unsave the project
  const toggleLikeProject = async () => {
    if (user) {
      if (isLiked) {
        // Unlike project
        const { error } = await supabase
          .from("liked_projects")
          .delete()
          .eq("profile_id", user.id)
          .eq("project_id", project.projectId);

        if (!error) {
          setIsLiked(false); // Update state to "not liked"
        }
      } else {
        // Like project
        const { error } = await supabase
          .from("liked_projects")
          .insert([{ profile_id: user.id, project_id: project.projectId }]);

        if (!error) {
          setIsLiked(true); // Update state to "liked"
        }
      }
    } else {
      console.error("User is not logged in");
    }
  };



  // fetching the comments
  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from("comments")
        .select("*")
        .eq("project_id", project.projectId);

      if (error) {
        console.log(error);
      }

      if (data) {
        const mappedData: CommentInfo[] = data.map((row: CommentDB) => ({
          commentId: row.comment_id,
          projectId: row.project_id,
          userId: row.user_id,
          content: row.content,
          likes: row.likes,
          username: row.username,
        }));
        setComments(mappedData);
      }
    };
    fetchComments();
  }, [project]);

  const saveButtonClass = isSaved ? "saved" : "save"; // classname for save button
  const likeButtonClass = isLiked ? "saved" : "save"; // using same class name as it is same aesthetics


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
              <div className="title-and-difficulty-container">
                <h1 className="details-title">{project?.projectName}</h1>
                <DifficultyLevel difficulty={project.difficulty as string} />
              </div>
              <div className="embed-container">
                <div className="description-container">
                  <YouTubeEmbed videoId={project?.videoId as string} />
                  <p className="details-subtitle">{project?.description}</p>
                </div>
              </div>
            </div>
            <div className="button-container">
              <button
                className={`save-and-like-button ${saveButtonClass}`}
                onClick={toggleSaveProject}
              >
                <img className="like-fav-icon" src={isSaved ? SavedImage : FavImage} alt="Save" />
                <p className="project-details-button-text">{isSaved ? "Saved" : "Save"}</p>
              </button>

              <button className={`save-and-like-button ${likeButtonClass}`}
                onClick={toggleLikeProject}>
                <img className="like-fav-icon" src={isLiked ? LikedImage : LikeImage} alt="Like" />
                <p className="project-details-button-text">{isLiked ? "Unlike" : "Like"}</p>
              </button>
            </div>
            <div className="">
              <DiscussionBoard project={project} comments={comments} />
            </div>
          </div>

          {/* Right side of page */}
          <div className="additional-information-container">
            <GitHubRepo repoPath={project?.repoPath as string} />
            <TechStack tech1={project?.tech1 || ""} tech2={project?.tech2 || ""} />
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
