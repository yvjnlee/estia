/* eslint-disable camelcase */
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate
import Groq from "groq-sdk"; // Import the Groq SDK
import { Navbar } from "../components/navbar/Navbar";
import { PreferenceLinks } from "../components/navbar/PreferenceLinks";

const PreferencePage: React.FC = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setInput(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true);
        setOutput(null);

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
                        content: `Given the following submission, recommend the languages, frameworks, and 
            technologies that the user should learn. Categorize them into relevant themes such as:
- Front end
- Back end
- Data science
- Mobile development
- DevOps
- Machine Learning
- Cloud computing
- Database management
- Security
- UI/UX design
- Blockchain
- AR/VR development
- Microservices architecture
- E-commerce
- Game development


Provide the recommendations in a JSON format, listing each theme with its associated languages and 
frameworks.  Prioritize it so that there is the most relevent key at the top. Also only give themes when they are 
relevent otherwise dont.  Do NOT give any other responses or anything unrelated; just return the JSON in the following format. 
No extra works at all just a JSon file. Whenever something ends with a .js, (like Express.js), replace it with "JS"
(like ExpressJS instead of Express.js) for everything like that (NodeJS, ThreeJS, etc.). Do not
say you are giving a json formatted response just give the json file. Do not repeat stuff in different sections
 Here is example just for formatting:

{
  "Front end": {
    "Languages": ["JavaScript", "HTML", "CSS"],
    "Frameworks": ["React", "Redux", "React Router"],
    "Libraries": ["Material-UI", "Ember"]
  },
  "Back end": {
    "Languages": ["NodeJS", "Java", "Python"],
    "Frameworks": ["Express.js", "Spring Boot", "Django"],
    "Libraries": ["GraphQL", "RESTful APIs"]
  },
  "Data science": {
    "Languages": ["Python", "R", "SQL"],
    "Frameworks": ["Pandas", "NumPy", "Matplotlib"],
    "Libraries": ["Scikit-learn", "TensorFlow"]
  },
  "Mobile development": {
    "Languages": ["Java", "Kotlin", "Swift", "React Native"],
    "Frameworks": ["React Native", "Flutter", "Ionic"],
    "Libraries": ["React Native Navigation", "React Native Maps"]
  },
  Here is the submission" "${input}".`,
                    },
                ],
                model: "llama3-8b-8192",
                temperature: 0.05,
                max_tokens: 1024,
                top_p: 1,
                stream: false,
                response_format: {
                    type: "json_object",
                },
            });

            setOutput(response.choices[0].message.content);
        } catch (error) {
            console.error("Error fetching data from Groq:", error);
            setOutput("Error processing your request. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const formatOutput = (jsonString: string) => {
        try {
            const parsedOutput = JSON.parse(jsonString);

            return Object.entries(parsedOutput).map(([theme, categories]) => {
                const { Languages, Frameworks, Libraries } = categories as {
                    Languages: string[];
                    Frameworks: string[];
                    Libraries: string[];
                };

                if (!Languages?.length && !Frameworks?.length && !Libraries?.length) {
                    return null;
                }

                return (
                    <div key={theme} className="theme-section">
                        <h4 className="theme-heading">{theme}</h4>
                        <div className="lfl-container">
                            {Languages?.length > 0 && (
                                <div className="languages-section">
                                    <h5 className="category-heading">Languages</h5>
                                    <ul className="category-list">
                                        {Languages.map((language: string, index: number) => (
                                            <li
                                                key={index}
                                                className="category-item"
                                                onClick={() => handleCategoryClick(language)} // Add click handler
                                            >
                                                {language}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {Frameworks?.length > 0 && (
                                <div className="frameworks-section">
                                    <h5 className="category-heading">Frameworks</h5>
                                    <ul className="category-list">
                                        {Frameworks.map((framework: string, index: number) => (
                                            <li
                                                key={index}
                                                className="category-item"
                                                onClick={() => handleCategoryClick(framework)} // Add click handler
                                            >
                                                {framework}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {Libraries?.length > 0 && (
                                <div className="libraries-section">
                                    <h5 className="category-heading">Libraries</h5>
                                    <ul className="category-list">
                                        {Libraries.map((library: string, index: number) => (
                                            <li
                                                key={index}
                                                className="category-item"
                                                onClick={() => handleCategoryClick(library)} // Add click handler
                                            >
                                                {library}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                );
            });
        } catch (error) {
            console.error("Error parsing JSON output:", error);
            return <p>Error formatting output.</p>;
        }
    };

    const handleCategoryClick = (category: string) => {
        // Redirect to the main page and pass the category as a search query
        navigate(`/main-page?search=${category}`);
    };

    return (
        <>
            <div className="preference-page">
            <h2 className="page-heading">Alright Estia, find me...</h2>
                <PreferenceLinks/>
                <div className="fade-in-div">
                <div className="page-heading-container">
                    <p className="preference-description">
                        Broadly describe what/why you want to learn coding for, and we&apos;ll
                        recommend the ideal languages and frameworks to support your goals.
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="input-form">
                    <textarea
                        value={input}
                        onChange={handleInputChange}
                        rows={3}
                        placeholder="I want to know more about backend programming..."
                        required
                        className="input-field"
                    />
                    <button type="submit" disabled={loading} className="submit-button">
                        {loading ? "Processing..." : "Submit"}
                    </button>
                </form>

                {output && (
                    <div className="output-section">
                        <h3 className="output-heading">
                            Great idea! Here&apos;s stuff to learn to get started
                        </h3>
                        <div className="outer-lfl-container">{formatOutput(output)}</div>
                    </div>
                )}
                </div>
            </div>
        </>
    );
};

export default PreferencePage;
