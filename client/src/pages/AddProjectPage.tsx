/* eslint-disable camelcase */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/navbar/Navbar";
import { supabase } from "../common/clients/supabaseClient";

// Expanded dictionary of languages and frameworks
const techStackOptions = [
    "Android",
    "Angular",
    "ASP.NET",
    "BackboneJS",
    "Bootstrap",
    "C",
    "C++",
    "C#",
    "Cassandra",
    "CodeIgniter",
    "CSS",
    "Dart",
    "Deno",
    "Django",
    "Ember.js",
    "Express",
    "Flask",
    "Framer Motion",
    "Gatsby",
    "Go",
    "GraphQL",
    "Haskell",
    "HTML",
    "Java",
    "JavaScript",
    "jQuery",
    "Kotlin",
    "Laravel",
    "Materialize",
    "MERN",
    "MongoDB",
    "MySQL",
    "NestJS",
    "NextJS",
    "Node.js",
    "Oracle",
    "Pandas",
    "PHP",
    "PostgreSQL",
    "Python",
    "Rails",
    "React",
    "React Native",
    "Redis",
    "Redux",
    "Ruby",
    "Ruby on Rails",
    "Rust",
    "SCSS",
    "Spring",
    "Svelte",
    "TailwindCSS",
    "TensorFlow",
    "TypeScript",
    "VueJS",
];

const themeOptions = [
    "Blockchain",
    "Game Development",
    "Full Stack",
    "Portfolio",
    "Full Stack Clone App",
    "Frontend Clone App",
    "Frontend",
    "Backend",
    "Machine Learning",
    "Simple",
    "Web Development",
    "Webscraping",
]

const difficultyOptions = [
    "Beginner",
    "Intermediate",
    "Advanced",
]

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Validate project name
        if (!isValidProjectName(projectName)) {
            setError("Project name cannot contain slashes (/) or backslashes (\\) and must be less than 26 characters.");
            return;
        }
    
        // Validate required fields
        if (!projectName || !tech1 || !description || !theme || !difficulty) {
            setError("Please fill out all fields except for the background color.");
            return;
        }
    
        setError(""); // Reset error message if valid
    
        try {
            const { data, error } = await supabase.from("estia_projects").insert([
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
            ]);
            if (error) {
                console.error("Error adding project:", error);
                return;
            }
            navigate(`/project/${encodeURIComponent(projectName)}`);
        } catch (error) {
            console.error("Error during submission:", error);
        }
    };
    
    
    const isValidProjectName = (name: string) => {
        // Check for slashes and length
        const hasInvalidChars = /[\/\\]/.test(name);
        const isTooLong = name.length >= 26;
        return !hasInvalidChars && !isTooLong;
    };

    const colors = [
        { hex: "#8A0303", label: "Red" },
        { hex: "#000B6F", label: "Blue" },
        { hex: "#007562", label: "Teal" },
        { hex: "#6F0050", label: "Pink" },
        { hex: "#45006F", label: "Purple" },
    ];

    return (
        <>
            <Navbar />
            <div className="add-project-form">
                <h2>Add New Project</h2>
                <p className="subtitle">
                    Do you want to contribute to our growing collection? Submit a project and we
                    will take a look and then publish your creation.
                </p>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Project Name:</label>
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
                        <label>Tech Stacks:</label>
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
                        <label>Main Area of Focus:</label>
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
                        <label>Difficulty Level</label>
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
                        <label>Description:</label>
                        <textarea
                            placeholder="Small blurb describing key concepts..."
                            className="description-input"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </div>
                    <div className="colours-container">
                        <label>Choose a background color:</label>
                        <div className="colour-picker">
                            {colors.map((col) => (
                                <button
                                    key={col.hex}
                                    type="button"
                                    className={`colour-button ${color === col.hex ? "active" : ""}`}
                                    style={{ backgroundColor: col.hex }}
                                    onClick={() => setColor(col.hex)}
                                ></button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <label>Link to Youtube</label>
                        <div className="link-split-container">
                            <label className="link-split-font">
                                https://www.youtube.com/watch?v=
                            </label>
                            <input
                                placeholder="video id"
                                className="link-split-input"
                                type="text"
                                value={videoId}
                                onChange={(e) => setVideoId(e.target.value)}
                            />
                        </div>
                    </div>
                    <div>
                        <label>Link to Github</label>
                        <div className="link-split-container">
                            <label className="link-split-font">https://github.com/</label>
                            <input
                                placeholder="username/repo"
                                className="link-split-input"
                                type="text"
                                value={repoPath}
                                onChange={(e) => setRepoPath(e.target.value)}
                            />
                        </div>
                    </div>
                    <button type="submit" className="submit-button">
                        Add Project
                    </button>
                    {error && <p style={{ color: 'red', fontSize: '2rem' }}>{error}</p>} {/* Display error message */}
                </form>
            </div>
        </>
    );
};

export default AddProject;