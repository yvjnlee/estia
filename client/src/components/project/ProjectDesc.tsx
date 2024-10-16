import React from "react";
import YouTubeEmbed from "./embed/YoutubeEmbed";
import GitHubRepo from "./embed/GithubEmbed";
import { Project } from "../../common/types";

const TechStack: React.FC<Project> = (project) => {
    return (
        <div>
            <div className="details-heading">
                <h1 className="details-title">{project.projectName}</h1>
                <p className="details-subtitle">{project.description}</p>
            </div>
            <div className="row embed-container">
                <div className="">
                    <YouTubeEmbed videoId={project.videoId as string} />
                </div>
                <div>
                    <GitHubRepo repoPath={project.repoPath as string} />
                </div>
            </div>
        </div>
    );
};

export default TechStack;
