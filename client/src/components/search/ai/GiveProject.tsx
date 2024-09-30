import React, { useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import Groq from 'groq-sdk'; // Import Groq SDK
import { Navbar } from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";


const GiveProject: React.FC = () => {
    const { projects } = useProject(); // Access project data from context
    const [input, setInput] = useState('');
    const [output, setOutput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();


    // Helper function to format and parse JSON output
    const formatOutput = (jsonString: string) => {
        try {
            const parsedOutput = JSON.parse(jsonString); // Parse the JSON string

            // Check if the parsed output is an array of projects
            if (Array.isArray(parsedOutput["Recommended Projects"])) {
                return parsedOutput["Recommended Projects"].map((project: string, index: number) => (
                    <div className="project-theme-section" key={index}>
                        <div className='projects-section'>
                            <div className='projects-div'>
                                <h5 className='projects-heading'>{project}</h5>
                            </div>
                        </div>
                    </div>
                ));
            }

            // Handle the case for a single project recommendation
            if (parsedOutput["Recommended Project"]) {
                return (
                    <div className="theme-section">
                        <div className='projects-section'>
                            <div className='projects-div'>
                                <h5 className='projects-heading'>{parsedOutput["Recommended Project"]}</h5>
                            </div>
                        </div>
                    </div>
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
        const projectTitles = projects?.map(project => project.project_name).join(', ') || '';

        const apiKey = process.env.REACT_APP_GROQ_API_KEY;
        console.log("API Key:", apiKey);
        const groq = new Groq({
            apiKey,
            dangerouslyAllowBrowser: true
        });

        try {
            const response = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: `Given the following submission, recommend the most relevant project titles from the database. 
                        The database project titles are: [${projectTitles}]. Here is the user's submission: "${input}". 
                        Please provide the project names that are most relevant to the input. Format your response as JSON, 
                        and provide the result in the format: 
                        {
                          "Recommended Projects": ["project name 1", "project name 2", ...]
                        }.` // Change the response format to an array of projects
                    }
                ],
                model: "llama3-8b-8192",  // Ensure this is the correct model for your use case
                temperature: 0.5,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                response_format: {
                    "type": "json_object"
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
            <button onClick={() => navigate(-1)} className="back-button">
        Back
      </button>
            <div className='preference-page'>
                <h2 className='page-heading'>Give Me Something to Make</h2>
                <p>We'll give you a project idea to work on based on your selected skills and interests.</p>
                <form className="input-form" onSubmit={handleSubmit}>
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        rows={5}
                        placeholder="Describe what you're interested in building..."
                        className='input-field'
                    />
                    <button type="submit" className='submit-button' disabled={loading}>
                        {loading ? 'Processing...' : 'Submit'}
                    </button>
                </form>
                {output && (
                    <div>
                        <h3>Project Recommendation:</h3>
                        <div>{formatOutput(output)}</div>
                    </div>
                )}
            </div>
        </>
    );
};

export default GiveProject;
