import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";

// Imported icons
import LikeImage from "../../img/ThumbsUp.svg";
import LikedImage from "../../img/Liked.svg";
import FavImage from "../../img/Star.svg";
import SavedImage from "../../img/Starred.svg";

// Import components
import TechStack from "./TechStack";
import DifficultyLevel from "./DifficultyLevel";
import DiscussionBoard from "./DiscussionBoard";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { getProjectById, getUserLikedProjects, getUserSavedProjects, toggleLikeProject, toggleSaveProject } from "../../api/projectAPI";
import { Project, User, Comment } from "../../common/types";
import { SavedProject, LikedProject } from "../../types/project";
import { getSession } from "../../api/authAPI";
import { getCommentsByProjectId } from "../../api/commentAPI";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const ProjectDetails: React.FC = () => {
    const navigate = useNavigate(); // Hook for navigation
    const dispatch = useAppDispatch();

    const [project, setProject] = useState<Project | null>(null);
    const [projectLoading, setProjectLoading] = useState<boolean>(true);
    const [user, setUser] = useState<User | null>(null);
    const [isLiked, setIsLiked] = useState(false); // Manage liked state
    const [isSaved, setIsSaved] = useState(false); // Manage saved state
    const [comments, setComments] = useState<Comment[]>([]);

    const { creatingComment } = useSelector((state: RootState) => state.comments);
    const { interactingComment } = useSelector((state: RootState) => state.comments);
    
    // Get the current URL and extract the project title
    const url = window.location.href;
    const urlParts = url.split("/");
    const rawTitle = urlParts[urlParts.length - 1];
  
    // Decode the project id from URL
    const projectId = decodeURIComponent(rawTitle);

    // Get the project details based on the decoded title parameter
    useEffect(() => {
        if (projectId) {
            getProjectById(dispatch, projectId).then((project) => {
              if (project) {
                setProject(project);
                setProjectLoading(false);
              }
            });
        }
    }, [dispatch, projectId]);

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
            const isProjectSaved = savedProjects.some(
                (savedProject: SavedProject) => savedProject.projectName === project?.projectName
            );
            setIsSaved(isProjectSaved);
        }
        return false;
    }

    const checkIfLiked = async () => {
        if (user) {
            const likedProjects = await getUserLikedProjects(dispatch, user.id);
            const isProjectLiked = likedProjects.some(
                (likedProject: LikedProject) => likedProject.projectName === project?.projectName
            );
            setIsLiked(isProjectLiked);
        }
        return false;
    }

    useEffect(() => {
        if (project) {
            checkIfSaved();
            checkIfLiked();
        }
    }, [project, user]);

    const handleSave = async () => {
        if (project && user) {
            await toggleSaveProject(dispatch, project.projectId as string, user.id as string);
            const savedProjects = await getUserSavedProjects(dispatch, user.id);
            const isProjectSaved = savedProjects.some(
                (savedProject: SavedProject) => savedProject.projectName === project.projectName
            );
            setIsSaved(isProjectSaved);
        }
    };

    const handleLike = async () => {
        if (project && user) {
            await toggleLikeProject(dispatch, project.projectId as string, user.id as string);
            const likedProjects = await getUserLikedProjects(dispatch, user.id);
            const isProjectLiked = likedProjects.some(
                (likedProject: LikedProject) => likedProject.projectName === project.projectName
            );
            setIsLiked(isProjectLiked);
        }
    };

    useEffect(() => {
        getCommentsByProjectId(dispatch, projectId).then((comments) => {
            if (comments) {
                setComments(comments);
            }
        });
    }, [creatingComment, interactingComment]);

    const saveButtonClass = isSaved ? "saved" : "save";
    const likeButtonClass = isLiked ? "liked" : "like";

    // Render loading indicator if still loading
    if (projectLoading) {
        return <div className="loading">
            <div className="loading-animation">
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>;
    }

    // Render the component once all data is fetched
    return (
        <>
                  <div className="details-main-container">
                <div className="grid-container">
                    <div>
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
                                <img
                                    className="like-fav-icon"
                                    src={isSaved ? SavedImage : FavImage}
                                    alt="Save"
                                />
                                <p className="project-details-button-text">
                                    {isSaved ? "Saved" : "Save"}
                                </p>
                            </button>

                            <button
                                className={`save-and-like-button ${likeButtonClass}`}
                                onClick={handleLike}
                            >
                                <img
                                    className="like-fav-icon"
                                    src={isLiked ? LikedImage : LikeImage}
                                    alt="Like"
                                />
                                <p className="project-details-button-text">
                                    {isLiked ? "Unlike" : "Like"}
                                </p>
                            </button>
                        </div>
                        <DiscussionBoard comments={comments} project={project} />
                    </div>
                    
                    <div className="additional-information-container">
                        <GitHubRepo repoPath={project?.repoPath as string} />
                        <TechStack tech1={project?.tech1 || ""} tech2={project?.tech2 || ""} />
                    </div>
                </div>
            </div>
        </>
    );
};
