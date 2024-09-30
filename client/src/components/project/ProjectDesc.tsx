import YouTubeEmbed from "./embded/YoutubeEmbed";
import GitHubRepo from "./embded/GithubEmbed";
import { ProjectInfo } from "../../types/project";

const TechStack: React.FC<ProjectInfo> = (project) => {
    return (
        <div >
            <div className="details-heading">
              <h1 className="details-title">{project.project_name}</h1>
              <p className="details-subtitle">{project.description}</p>
            </div>
            <div className="row embed-container">
                    <div className="">
                        <YouTubeEmbed videoId={project.video_Id as string} />
                    </div>
                    <div>
                        <GitHubRepo repoPath={project.repo_Path as string} />
                    </div>
            </div>
        </div>
    );
};

export default TechStack;