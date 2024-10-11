import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";

// Import the new projects data

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
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getProjectByName, getUserLikedProjects, getUserSavedProjects, toggleLikeProject, toggleSaveProject } from "../../api/projectAPI";
import { Project, User, Comment } from "../../common/types";
import { getSession } from "../../api/authAPI";
import { getComments } from "../../api/commentAPI";

const ProjectDetails: React.FC = () => {
    const navigate = useNavigate(); // Hook for navigation
    const dispatch = useAppDispatch();

    const [project, setProject] = useState<Project | null>(null);
    const [projectLoading, setProjectLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [isLiked, setIsLiked] = useState(false); // Manage liked state
    const [isSaved, setIsSaved] = useState(false); // Manage saved state
    const [comments, setComments] = useState<Comment[]>([]);
    // Get the current URL and extract the project title
    const url = window.location.href;
    const urlParts = url.split("/");
    const rawTitle = urlParts[urlParts.length - 1];

    // Decode the project name from URL
  
  // Decode the project name from URL
  const decodedTitle = decodeURIComponent(rawTitle);

    // Get the project details based on the decoded title parameter
    useEffect(() => {
        if (decodedTitle) {
            getProjectByName(dispatch, decodedTitle).then((project) => {
                setProject(project);
                setProjectLoading(false);
            });
        }
    }, [dispatch, decodedTitle]);

    useEffect(() => {
        getSession().then((session) => {
            if (session?.user) {
                setUser(session.user);
            }
        });
    }, []);

    const checkIfSaved = async () => {
        if (user) {
            const savedProjects = await getUserSavedProjects(dispatch, user.id);
            return savedProjects.includes(project?.projectName);
        }
        return false;
    }

    const checkIfLiked = async () => {
        if (user) {
            const likedProjects = await getUserLikedProjects(dispatch, user.id);
            return likedProjects.includes(project?.projectName);
        }
        return false;
    }

    useEffect(() => {
        checkIfSaved();
        checkIfLiked();
    }, [project, user]);

    const handleSave = () => {
        toggleSaveProject(dispatch, project?.projectId as string, user?.id as string);
    }

    const handleLike = () => {
        toggleLikeProject(dispatch, project?.projectId as string, user?.id as string);
    }

    useEffect(() => {
        getComments(dispatch).then((comments) => {
            setComments(comments);
        });
    }, [dispatch]);

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
                <DifficultyLevel difficulty={project?.difficulty as string} />
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
                onClick={handleSave}
              >
                <img className="like-fav-icon" src={isSaved ? SavedImage : FavImage} alt="Save" />
                <p className="project-details-button-text">{isSaved ? "Saved" : "Save"}</p>
              </button>

              <button className={`save-and-like-button ${likeButtonClass}`}
                onClick={handleLike}>
                <img className="like-fav-icon" src={isLiked ? LikedImage : LikeImage} alt="Like" />
                <p className="project-details-button-text">{isLiked ? "Unlike" : "Like"}</p>
              </button>
            </div>
            <div className="">
              <DiscussionBoard comments={comments} />
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
