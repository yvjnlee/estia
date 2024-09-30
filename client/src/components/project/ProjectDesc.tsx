import YouTubeEmbed from "./embded/YoutubeEmbed";
import GitHubRepo from "./embded/GithubEmbed";
import { ProjectInfo } from "../../types/project";

const TechStack: React.FC<ProjectInfo> = (project) => {
    return (
        <div >
            <div className="details-heading">
              <h1 className="details-title">{project.title}</h1>
              <p className="details-subtitle">{project.descript}</p>
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
    );
};

export default TechStack;