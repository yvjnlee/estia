import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";

// Imported icons
import LikeImage from "../../img/ThumbsUp.svg";
import LikedImage from "../../img/Liked.svg";
import FavImage from "../../img/Star.svg";
import SavedImage from "../../img/Starred.svg";

// Import components
import { Navbar } from "../navbar/Navbar";
import TechStack from "./TechStack";
import DifficultyLevel from "./DifficultyLevel";
import DiscussionBoard from "./DiscussionBoard";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import {
    getProjectByName,
    getUserLikedProjects,
    getUserSavedProjects,
    toggleLikeProject,
    toggleSaveProject,
} from "../../api/projectAPI";
import { Project, User, Comment } from "../../common/types";
import { SavedProject, LikedProject } from "../../types/project";
import { getSession } from "../../api/authAPI";
import { getComments } from "../../api/commentAPI";

const ProjectDetails: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [project, setProject] = useState<Project | null>(null);
    const [user, setUser] = useState<User | null>(null);
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [loading, setLoading] = useState(true);

    const url = window.location.href;
    const urlParts = url.split("/");
    const rawTitle = urlParts[urlParts.length - 1];
    const decodedTitle = decodeURIComponent(rawTitle);

    // Fetch all necessary data
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch project details and session data concurrently
                const [project, session] = await Promise.all([
                    getProjectByName(dispatch, decodedTitle),
                    getSession(),
                ]);
                setProject(project);
                setUser(session?.user || null);

                // Fetch comments
                const commentsData = await getComments(dispatch);
                setComments(commentsData);

                // If user is logged in, check if the project is liked or saved
                if (session?.user) {
                    const [savedProjects, likedProjects] = await Promise.all([
                        getUserSavedProjects(dispatch, session.user.id),
                        getUserLikedProjects(dispatch, session.user.id),
                    ]);

                    // Check if the project is saved
                    const isProjectSaved = savedProjects.some(
                        (savedProject: SavedProject) => savedProject.projectName === project?.projectName
                    );
                    setIsSaved(isProjectSaved);

                    // Check if the project is liked
                    const isProjectLiked = likedProjects.some(
                        (likedProject: LikedProject) => likedProject.projectName === project?.projectName
                    );
                    setIsLiked(isProjectLiked);
                }
                
                // Set loading to false after all data is fetched
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false); // Ensure loading is set to false even if there's an error
            }
        };

        fetchData();
    }, [dispatch, decodedTitle]);

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

    const saveButtonClass = isSaved ? "saved" : "save";
    const likeButtonClass = isLiked ? "liked" : "like";

    // Render loading indicator if still loading
    if (loading) {
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
            <Navbar />
            <div className="details-main-container">
                <div className="grid-container">
                    <div>
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
                        <DiscussionBoard comments={comments} />
                    </div>
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
