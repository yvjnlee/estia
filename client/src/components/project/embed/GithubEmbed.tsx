import React, { useEffect, useState } from "react";
import GithubLogo from "../../../img/githublogo.webp";

interface GitHubRepoProps {
    repoPath: string; // Explicitly type the repoPath as a string
}

interface RepoData {
    full_name: string;
    description: string;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
}

const GitHubRepo: React.FC<GitHubRepoProps> = ({ repoPath }) => {
    const [repoData, setRepoData] = useState<RepoData | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepoData = async () => {
            try {
                console.log(`Fetching data for: ${repoPath}`);
                const response = await fetch(`https://api.github.com/repos/${repoPath}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data: RepoData = await response.json();
                console.log('Fetched data:', data);
                setRepoData(data);
            } catch (err) {
                console.error('Fetch error:', err);
                setError((err as Error).message);
            }
        };
    
        fetchRepoData();
    }, [repoPath]);
    

    if (error) {
        return <p>{error}</p>;
    }

    if (!repoData) {
        return <p>Loading...</p>;
    }

    return (
        <a
            href={`https://github.com/${repoPath}`}
            target="_blank"
            rel="noopener noreferrer"
            className="github-container"
        >
            <div>
                <div>
                <img className="github-logo" src={GithubLogo} alt="GitHub Logo" />
                <h1>Github Repo</h1>
                </div>
                <h2 className="github-name">{repoData.full_name}</h2>
                <p className="github-description">
                    {repoData.description
                        ? repoData.description
                        : "No description, website, or topics provided."}
                </p>
                <div className="github-additional-information">
                    <p className="github-additional-information-stars">
                        ⭐ Stars: {repoData.stargazers_count}
                    </p>
                    <p className="github-additional-information-forks">
                        🍴 Forks: {repoData.forks_count}
                    </p>
                    <p className="github-additional-information-open-issues">
                        🐛 Open Issues: {repoData.open_issues_count}
                    </p>
                </div>
                <div className="tooltip">Open link on GitHub</div>
            </div>
        </a>
    );
};

export default GitHubRepo;
