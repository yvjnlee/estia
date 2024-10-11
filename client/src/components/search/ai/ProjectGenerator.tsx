/* eslint-disable camelcase */
import React, { useEffect, useState } from "react";
import { Navbar } from "../../navbar/Navbar";
import { useNavigate, NavLink } from "react-router-dom";
import { Project } from "../../../common/types";
import { groq } from "../../../common/clients";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { getProjects } from "../../../api/projectAPI";

const ProjectGenerator: React.FC = () => {
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

    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [projects, setProjects] = useState<Project[]>([]);
    
    useEffect(() => {
        getProjects(dispatch).then((projects) => {
            setProjects(projects);
        });
    }, []);

    // Helper function to format and parse JSON output
    const formatOutput = (jsonString: string) => {
        try {
            const parsedOutput = JSON.parse(jsonString); // Parse the JSON string
    
            // Destructure necessary fields from the parsed output
            const {
                "Project Idea": projectIdea,
                "Tech Stack": techStack,
                "Estimated Time Commitment": timeCommitment,
                "Time Breakdown/Checklist": checklist,
                "Potential Project Names": potentialNames,
                "Project Description": projectDescription
            } = parsedOutput;
    
            return (
                <div className="project-details">
                    <h2 className="project-idea-title">{projectIdea}</h2>
                    <p className="project-idea-description">{projectDescription}</p>
                    <h3 className="project-idea-tech-stack">Tech Stack: {techStack.join(', ')}</h3>
                    <p className="estimated-time">Estimated Time Commitment: {timeCommitment}</p>
                    <h4>Time Breakdown/Checklist:</h4>
                    <ul className="checklist">
                        {Object.entries(checklist).map(([week, task]) => (
                            <li key={week}>{`${week}: ${task}`}</li>
                        ))}
                    </ul>
                    <h4>Potential Project Names:</h4>
                    <ul className="project-idea-potential-names">
                        {potentialNames.map((name: string, index: number) => (
                            <li key={index}>{name}</li>
                        ))}
                    </ul>
                </div>
            );
        } catch (error) {
            console.error("Error parsing JSON output:", error);
            console.log(jsonString)
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

        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `Given the user's input, recommend a personalized project idea, 
                        tech stack, estimated time commitment, and a weekly breakdown/checklist for completing the project. 
                        If the user inputs "Any," provide a random project idea. Also, suggest potential project names and provide a 
                        full description of the project’s features and functionality. Make sure to tailor the recommendation 
                        based on the input provided. Format your response in the following JSON structure:

{
  "Project Idea": "Brief summary of the project",
  "Tech Stack": ["language 1", "framework 2", "tool 3", ...],
  "Estimated Time Commitment": "Estimated number of hours/weeks",
  "Time Breakdown/Checklist": {
    "Week 1": "Tasks for week 1",
    "Week 2": "Tasks for week 2",
    ...
  },
  "Potential Project Names": ["Name 1", "Name 2", "Name 3"],
  "Project Description": "Detailed explanation of the project, its features, and functionality"
}

Here is a sample response: {
  "Project Idea": "Build a task management web app with real-time collaboration features",
  "Tech Stack": ["React", "Node.js", "Socket.io", "MongoDB"],
  "Estimated Time Commitment": "4 weeks, 10-12 hours per week",
  "Time Breakdown/Checklist": {
    "Week 1": "Set up project structure, initialize React and Node.js environment, create basic task CRUD functionality",
    "Week 2": "Implement real-time collaboration with Socket.io, set up MongoDB for storing tasks",
    "Week 3": "Create user authentication and role-based access, design the UI for task management",
    "Week 4": "Testing, optimization, and deployment using Heroku or Vercel"
  },
  "Potential Project Names": ["CollabTask", "RealTimeTasks", "SyncManage"],
  "Project Description": "A task management app where users can create, update, and delete tasks. The app allows real-time collaboration between multiple users, where updates to tasks are instantly synced across users' screens. Features include real-time notifications, user authentication, and role-based permissions for managing tasks."
}


User Input: "${input}"`, // Change the response format to an array of projects
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
                    Provide us with a theme or concept, and we'll expand it into a comprehensive project idea, 
                    complete with recommended technologies and a checklist of tasks to accomplish.
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
                        <div className="project-idea-container">
                            {formatOutput(output)}
                        </div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export default ProjectGenerator;
