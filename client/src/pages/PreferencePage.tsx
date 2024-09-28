import React, { useState } from 'react';
import Groq from 'groq-sdk'; // Import the Groq SDK

import { Navbar } from '../components/navbar/Navbar';

const PreferencePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setOutput(null); 

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
No extra works at all just a JSon file. Do not
say you are giving a json formatted response jsut give the json file.:

{
  "Front end": {
    "Languages": ["JavaScript", "HTML", "CSS"],
    "Frameworks": ["React", "Redux", "React Router"],
    "Libraries": ["Material-UI", "Ember"]
  },
  "Back end": {
    "Languages": ["Node.js", "Java", "Python"],
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
        temperature: 0.5,
        max_tokens: 1024,
        top_p: 1,
        stream: false,
      });

      setOutput(response.choices[0].message.content);
    } catch (error) {
      console.error('Error fetching data from Groq:', error);
      setOutput('Error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatOutput = (jsonString: string) => {
    try {
      const parsedOutput = JSON.parse(jsonString); // Parse the JSON string

      return Object.entries(parsedOutput).map(([theme, categories]) => {
        const { Languages, Frameworks, Libraries } = categories as any;

        if (!Languages?.length && !Frameworks?.length && !Libraries?.length) {
          return null;
        }

        return (
          <div key={theme} className="theme-section">
            <h4 className="theme-heading">{theme}</h4>
            <div className='lfl-container'>
            {Languages?.length > 0 && (
              <div className="languages-section">
                <h5 className="category-heading">Languages</h5>
                <ul className="category-list">
                  {Languages.map((language: string, index: number) => (
                    <li key={index} className="category-item">{language}</li>
                  ))}
                </ul>
              </div>
            )}
            {Frameworks?.length > 0 && (
              <div className="frameworks-section">
                <h5 className="category-heading">Frameworks</h5>
                <ul className="category-list">
                  {Frameworks.map((framework: string, index: number) => (
                    <li key={index} className="category-item">{framework}</li>
                  ))}
                </ul>
              </div>
            )}
            {Libraries?.length > 0 && (
              <div className="libraries-section">
                <h5 className="category-heading">Libraries</h5>
                <ul className="category-list">
                  {Libraries.map((library: string, index: number) => (
                    <li key={index} className="category-item">{library}</li>
                  ))}
                </ul>
              </div>
            )}
            </div>
          </div>
        );
      });
    } catch (error) {
      console.error('Error parsing JSON output:', error);
      return <p>Error formatting output.</p>;
    }
  };


  

  return (
    <>
    <Navbar />

    <div className="preference-page">
      <h2 className="page-heading">What are you interested in learning?</h2>
      <form onSubmit={handleSubmit} className="input-form">
        <textarea
          value={input}
          onChange={handleInputChange}
          rows={5}
          placeholder="Enter a paragraph about your learning interests..."
          required
          className="input-field"
        />
        <button type="submit" disabled={loading} className="submit-button">
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {output && (
        <div className="output-section">
          <h3 className="output-heading">Identified Languages, Frameworks, and Themes:</h3>
          <div>{formatOutput(output)}</div>
        </div>
      )}
    </div>
    </>
  );
};

export default PreferencePage;
