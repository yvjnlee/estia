/* eslint-disable camelcase */
/* eslint-disable no-undef */
import React, { useState } from "react";
import { useProject } from "../../../context/ProjectContext";
import Groq from "groq-sdk"; // Import Groq SDK
import { Navbar } from "../../navbar/Navbar";
import { useNavigate, NavLink } from "react-router-dom";

const GiveProjectPage: React.FC = () => {
    const containerStyle: React.CSSProperties = {
        //backgroundColor: colour,
        backgroundColor: "",
        cursor: "pointer",
        border: "1px solid #383838",
        height: "5rem",
        width: "32rem",
        borderRadius: "4px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        transition: "transform 0.3s ease, filter 0.3s ease",
        // border: "2px solid grey",
    };

    const { projects } = useProject(); // Access project data from context
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    // Helper function to format and parse JSON output
    const formatOutput = (jsonString: string) => {
        try {
            const parsedOutput = JSON.parse(jsonString); // Parse the JSON string

            // Check if the parsed output is an array of projects
            if (Array.isArray(parsedOutput["Recommended Projects"])) {
                return parsedOutput["Recommended Projects"].map(
                    (project: string, index: number) => (
                            <h2 className="project-title"
                                onClick={() =>
                                    navigate(`/project/${encodeURIComponent(project)}`)
                                } // Navigate to project details page
                                style={{ cursor: "pointer" }}
                            >
                                {project}
                            </h2>
                    )
                );
            }

            // Handle the case for a single project recommendation
            if (parsedOutput["Recommended Project"]) {
                const project = parsedOutput["Recommended Project"];
                return (
                    <h2 className="project-title"
                        onClick={() =>
                            navigate(`/project/${encodeURIComponent(project)}`)
                        } // Navigate to project details page
                        style={{ cursor: "pointer", textDecoration: "underline" }}
                    >
                        {project}
                    </h2>
                );
            }

            return null; // Return null if no recommendations are found
        } catch (error) {
            console.error("Error parsing JSON output:", error);
            return <p>Error parsing the response</p>;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setOutput(null);

        // Get project titles from the context
        const projectTitles = projects?.map((project) => project.projectName).join(", ") || "";

        const apiKey = process.env.REACT_APP_GROQ_API_KEY;
        // console.log("API Key:", apiKey);
        const groq = new Groq({
            apiKey,
            dangerouslyAllowBrowser: true,
        });

        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `Given the following submission, recommend the most relevant project titles from the database. 
                        Please provide the project names that are most relevant to the input. You can
                        give one if you think only one fits the description. The database project titles are: [${projectTitles}]. 
                        Here is the user's submission: "${input}". Format your response as JSON, 
                        and provide the result in the format:
                        {
                          "Recommended Projects": ["project name 1", "project name 2", ...]
                        }.`, // Change the response format to an array of projects
                    },
                ],
                model: "llama3-8b-8192", // Ensure this is the correct model for your use case
                temperature: 0.5,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                response_format: {
                    type: "json_object",
                },
            });

            // Handle the response and parse it into JSON
            const jsonResponse = response.choices[0]?.message?.content;
            console.log(jsonResponse);

            if (jsonResponse) {
                setOutput(jsonResponse); // Set the output directly without stringifying
            }
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            setOutput("Error fetching project recommendation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="preference-page">
            <h2 className="page-heading">Hey Estia, find me...</h2>
                <div className="navigation-links">
                <NavLink
                        to="/preference"
                        className={({ isActive }) => (isActive ? "active-nav-link" : "nav-link")}
                        end
                    >
                        Programming languages/frameworks to learn
                    </NavLink>
                    <NavLink
                        to="/preference/give-project"
                        className={({ isActive }) => (isActive ? "active-nav-link" : "nav-link")}
                    >
                        A project within your collection
                    </NavLink>
                    <NavLink
                        to="/preference/project-idea"
                        className={({ isActive }) => (isActive ? "active-nav-link" : "nav-link")}
                    >
                        A fresh new project idea
                    </NavLink>
                </div>
                <div className="fade-in-div">
                <div className="page-heading-container">
                    <p className="preference-description">
                        Let us know what you are interested in making. We find projects on Estia based on your input and 
                        connect you with the right hands-on experiences.
                    </p>
                </div>
                <form className="input-form" onSubmit={handleSubmit}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={3}
                        placeholder="Describe what you're interested in building..."
                        className="input-field"
                    />
                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </form>
                {output && (
                    <div>
                        <h3 className="related-results">Related results:</h3>
                        <div className="project-container" style={containerStyle}>        
                            {formatOutput(output)}
                        </div>
                    </div>
                )}
            </div>
            </div>
        </>
    );
};

export default GiveProjectPage;
