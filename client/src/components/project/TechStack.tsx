import { ProjectInfo } from '../../types/project';
import YouTubeEmbed from "./embded/YoutubeEmbed";
import GitHubRepo from "./embded/GithubEmbed";

// change the type later
const TechStack: React.FC<any> = ({ tech1, tech2 }) => {
    return (
        <div className="sidebar-container">
            <h1> Tech Stack</h1>
            <p className='tech-stack-detils'>{tech1}</p>
            <p className='tech-stack-detils'>{tech2}</p>
        </div>
    );
};

export default TechStack;