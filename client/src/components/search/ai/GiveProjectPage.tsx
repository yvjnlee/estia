/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import Groq from "groq-sdk"; // Import Groq SDK
import { useNavigate, NavLink } from "react-router-dom";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { Project, ProjectDB } from "../../../common/types";
import { fetchProjects } from "../../../store/slices/projectSlice";

import { Session } from "@supabase/supabase-js";
import { getSession } from "../../../api/authAPI";

import { PreferenceLinks } from "../../navbar/PreferenceLinks";
import { fetchAPI } from "../../../utils/fetchAPI";

const GiveProjectPage: React.FC = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [projects, setProjects] = useState<ProjectDB[]>([]);
    const [session, setSession] = useState<Session | null>(null);
    const [showAuth, setShowAuth] = useState<boolean>(false);
    const [projectsMap, setProjectsMap] = useState<Map<string, ProjectDB>>(new Map());

    useEffect(() => {
        getSession().then((session) => {
            setSession(session);
        });
    }, []);

    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                dispatch(fetchProjects())
                    .unwrap()
                    .then((projects) => {
                        console.log("Fetched projects:", projects);
                        setProjects(projects);
                        // Create a map of project names to project objects
                        const projectMap = new Map<string, ProjectDB>(projects.map((p: ProjectDB) => [p.project_name.toLowerCase(), p]));
                        setProjectsMap(projectMap);
                    });
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchAllProjects();
    }, [dispatch]);

    // Helper function to format and parse JSON output
    const formatOutput = (jsonString: string) => {
        try {
            const parsedOutput = JSON.parse(jsonString);

            if (Array.isArray(parsedOutput["Recommended Projects"])) {
                return parsedOutput["Recommended Projects"].map(
                    (projectName: string, index: number) => {
                        const project = projectsMap.get(projectName.toLowerCase());
                        return (
                            <div className="project-theme-section" key={index}>
                                <div className="projects-section">
                                    <div className="projects-div">
                                        <h5
                                            className="projects-heading"
                                            onClick={() =>
                                                navigate(`/project/${project?.project_id || encodeURIComponent(projectName)}`)
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            {projectName}
                                        </h5>
                                    </div>
                                </div>
                            </div>
                        );
                    }
                );
            }

            // Handle the case for a single project recommendation
            if (parsedOutput["Recommended Project"]) {
                const projectName = parsedOutput["Recommended Project"];
                const project = projectsMap.get(projectName.toLowerCase());
                return (
                    <div className="project-theme-section">
                        <div className="projects-section">
                            <div className="projects-div">
                                <h5
                                    className="projects-heading"
                                    onClick={() =>
                                        navigate(`/project/${project?.project_id || encodeURIComponent(projectName)}`)
                                    }
                                    style={{ cursor: "pointer", textDecoration: "underline" }}
                                >
                                    {projectName}
                                </h5>
                            </div>
                        </div>
                    </div>
                );
            }

            return null;
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

        console.log("Current projects state:", projects); // Add this line
        // Get project titles from the context
        const projectTitles = projects?.map((project) => project.project_name).join(", ") || "";
        console.log("Project titles:", projectTitles); // Add this line

        // eslint-disable-next-line no-undef
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
                        content: `Given the user's submission, identify and recommend the most relevant project titles from the database that align semantically with the provided input. Focus on projects that best match the themes and concepts expressed in the user's description.

                        Please consider the following project titles from the database: [${projectTitles}]. 

                        User's submission: "${input}"

                        Your response should be formatted as JSON, following this structure:

                        {
                          "Recommended Projects": [
                               "project name 1",
                                  "project name 2",
                                      ...
                               ]
                            }

If you believe that only one project title fits well, provide just that single recommendation. Try to give an average of at least two projects. Ensure the recommendations are the most relevant based on the user's input.
`, // Change the response format to an array of projects
                    },
                ],
                model: "llama3-8b-8192", // Ensure this is the correct model for your use case
                temperature: 0.3,
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
            <div className="preference-page">
                <h2 className="page-heading">Alright Estia, find me...</h2>
                    <PreferenceLinks />
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
                        <span className="submit-button-text">{loading ? "Processing..." : "Submit"}</span>
                        </button>
                    </form>
                    {output && (
                        <div>
                            <h3>Here are some related results:</h3>
                            <div className="outer-theme-section-div">{formatOutput(output)}</div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default GiveProjectPage;
