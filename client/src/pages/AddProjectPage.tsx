/* eslint-disable camelcase */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../common/clients/supabaseClient";
import Groq from "groq-sdk"; // Import the Groq SDK

import { FaInfoCircle } from 'react-icons/fa'; // Import an info icon

import { techStackOptions, themeOptions, difficultyOptions } from "../storage/option";

const AddProject: React.FC = () => {
    const navigate = useNavigate();

    const [projectName, setProjectName] = useState("");
    const [tech1, setTech1] = useState("");
    const [tech2, setTech2] = useState("");
    const [description, setDescription] = useState("");
    const [videoId, setVideoId] = useState("");
    const [repoPath, setRepoPath] = useState("");
    const [color, setColor] = useState("#6E00FF");
    const [theme, setTheme] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(""); // Added state for error handling
    const [loading, setLoading] = useState(false); // Loading state for AI summary
    const [summarizedDescription, setSummarizedDescription] = useState(""); // State for summarized description
    const [showText, setShowText] = useState(false);

    const toggleText = () => setShowText(!showText);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validate project name
        if (!isValidProjectName(projectName)) {
            setError("Project name cannot contain slashes (/) or backslashes (\\) and must be less than 32 characters.");
            return;
        }

        // Validate required fields
        if (!projectName || !tech1 || !description || !theme || !difficulty) {
            setError("Please fill out all fields except for the background color.");
            return;
        }

        setError(""); // Reset error message if valid

        try {
            const { data, error } = await supabase
                .from("estia_projects")
                .insert([
                    {
                        project_name: projectName,
                        tech1,
                        tech2,
                        description,
                        video_Id: videoId,
                        repo_Path: repoPath,
                        colour: color, // Optional, so it can be any value (even the default)
                        theme,
                        difficulty,
                    },
                ])
                .select()
                .single();
            if (error) {
                console.error("Error adding project:", error);
                return;
            }

            navigate(`/project/${encodeURIComponent(data.project_id)}`);
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };

    const isValidProjectName = (name: string) => {
        // Check for slashes and length
        const hasInvalidChars = /[\/\\]/.test(name);
        const isTooLong = name.length >= 32;
        return !hasInvalidChars && !isTooLong;
    };

    const extractVideoId = (input: string) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = input.match(regex);
        return match ? match[1] : input; // Return video ID or input if no match
    };

    const handleVideoIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setVideoId(extractVideoId(input)); // Extract and set video ID
    };

    const extractRepoPath = (input: string) => {
        // Regex to match the GitHub URL pattern and extract the username/repo part
        const regex = /https:\/\/github\.com\/([^\/]+\/[^\/]+)/;
        const match = input.match(regex);
        return match ? match[1] : input; // Return the extracted path or the original input if no match is found
    };

    const handleRepoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setRepoPath(extractRepoPath(input)); // Extract and set video ID
    };


    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value);
    };

    const summarizeDescription = async () => {
        if (loading) return;

        setLoading(true);
        setSummarizedDescription(""); // Reset summarized description

        const apiKey = process.env.REACT_APP_GROQ_API_KEY;
        const groq = new Groq({
            apiKey,
            dangerouslyAllowBrowser: true,
        });

        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `I am creating project descriptions intended as introductory overviews for individuals eager to start coding projects. Your task is to carefully analyze the provided information and generate a concise paragraph summarizing the key concepts and skills the project will teach. Make it a brief one short paragraph of highlights. Please focus on the following guidelines:
                        Relevance: Highlight only the essential knowledge and skills relevant to the learner. Consider different learning styles and backgrounds, ensuring that the description is accessible to beginners.
                        Clarity: Use clear and straightforward language. Avoid jargon or complex terminology that might confuse novice learners. If technical terms are necessary, provide a brief explanation.
                        Omissions: Exclude any promotional content, subscription requests, links, or unrelated information. The focus should solely be on the educational value of the project.
                        Give it in a JSON format. I want it to be under a key called "description" and then a one paragraph description.
                        Here is the submission: "${description}".`,
                    },
                ],
                model: "llama3-8b-8192",
                temperature: 0.2,
                max_tokens: 150,
                top_p: 1,
                stream: false,
                response_format: {
                    type: "json_object",
                },
            });

            if (response.choices[0].message.content) {
                const jsonResponse = JSON.parse(response.choices[0].message.content);
                const descriptionText = extractDescription(jsonResponse);
                setSummarizedDescription(descriptionText);
                setDescription(descriptionText); // Automatically set the summarized description as the new input
            }
        } catch (error) {
            console.error("Error fetching data from Groq:", error);
            setSummarizedDescription("Error summarizing description. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Helper function to extract the description from the JSON response
    const extractDescription = (jsonResponse: { description?: string }): string => {
        return jsonResponse.description || "Description not available.";
    };

    return (
        <>
            <div className="add-project-form">
                <h2>Add New Project</h2>
                <p className="subtitle">
                    Do you want to contribute to our growing collection? Submit a project and we
                    will take a look and then publish your creation.
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label className="heading-label">Project Name</label>
                        <input
                            placeholder="Give it a short name..."
                            className="name-input"
                            type="text"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="tech-stack">
                        <label className="heading-label">Tech Stacks</label>
                        <div className="tech-inputs-container">
                            <select
                                className="tech-select"
                                value={tech1}
                                onChange={(e) => setTech1(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    1st language/framework...
                                </option>
                                {techStackOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                            <select
                                className="tech-select"
                                value={tech2}
                                onChange={(e) => setTech2(e.target.value)}
                            >
                                <option value="" disabled>
                                    2nd language/framework...
                                </option>
                                {techStackOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="tech-stack">
                        <label className="heading-label">Main Area of Focus</label>
                        <div className="tech-inputs-container">
                            <select
                                className="tech-select"
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Choose Theme...
                                </option>
                                {themeOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="tech-stack">
                        <label className="heading-label">Difficulty Level</label>
                        <div className="tech-inputs-container">
                            <select
                                className="tech-select"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                required
                            >
                                <option value="" disabled>
                                    Choose Difficulty...
                                </option>
                                {difficultyOptions.map((option, index) => (
                                    <option key={index} value={option}>
                                        {option}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <label className="heading-label">Description</label>
                            <button type="button" onClick={toggleText} className="info-icon">
                                <FaInfoCircle style={{ fontSize: '24px' }} />
                            </button>
                            {showText && <span className="info-icon-info">"AI summarize" automatically rewords Youtube descriptions</span>}
                        </div>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            rows={3}
                            placeholder="Enter project description..."
                            required
                            className="add-project-input-field"
                        />
                        <button
                            type="button"
                            onClick={summarizeDescription}
                            disabled={loading}
                            className="ai-button">
                            {loading ? "Summarizing..." : "AI Summarize"}
                        </button>
                    </div>
                    <div>
                        <label className="heading-label">GitHub Repo URL</label>
                        <input
                            placeholder="Paste entire link it will grab the repo path..."
                            className="link-input"
                            type="text"
                            value={repoPath}
                            onChange={handleRepoChange}
                        />
                    </div>
                    <div>
                        <label className="heading-label">YouTube Video URL</label>
                        <input
                            placeholder="Paste entire link it will grab the video id..."
                            className="link-input"
                            type="text"
                            value={videoId}
                            onChange={handleVideoIdChange}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="submit-button" type="submit">
                        Add Project
                    </button>
                </form>
            </div>
        </>
    );
};

export default AddProject;
