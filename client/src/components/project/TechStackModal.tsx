import React, { useEffect } from "react";
import Groq from "groq-sdk"; // Import Groq SDK

interface TechStackModalProps {
    tech: string;
    onClose: () => void;
}

const TechStackModal: React.FC<TechStackModalProps> = ({ tech, onClose }) => {
    const [data, setData] = React.useState<any>(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);

    // Add or remove the 'modal-open' class on the body element
    useEffect(() => {
        document.body.classList.add("modal-open");

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    React.useEffect(() => {
        const fetchTechData = async () => {
            setLoading(true);
            setError(null);
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
                            content: `Provide the following information in JSON format. Based on the language, framework, or library I input, 
                            provide the following information in clear, structured headings. Ensure that the content remains concise, focused on key points, 
                            and presented in a consistent format. Where possible, include real-world applications, pros and cons that relate to 
                            practical usage, and provide learning resources. Keep everything less than 20 words each list item

"what_is": Provide a brief, high-level definition of the language/framework/library, including its primary purpose.
"common_uses": List 5 specific real-world applications and industries where this technology is commonly used. Include both modern and traditional use cases.
"advantages": Provide 3 practical advantages that make it useful in certain scenarios. Focus on performance, scalability, or ecosystem benefits.
"disadvantages": Provide 3 notable disadvantages, with a focus on potential limitations or situations where it may not be suitable.
"resources": Include three links to articles, tutorials, or documentation for deeper learning.
"next_steps": Suggest 2 important actionable steps for a beginner or intermediate user to explore within the language/framework/library.


here is an example:
{
  "what_is": "sample text",
  
  "common_uses": [
    "sample text",
    "sample text",
    "sample text",
  ],
  
  "advantages": [
    "sample text",
    "sample text",
    "sample text",
  ],
  
  "disadvantages": [
    "sample text",
    "sample text",
    "sample text",
    "sample text
  ],
  
  "resources": [
    {
      "title": "official website",
      "link": "https://sample text"
    },
    {
      "title": "video link to crash course",
      "link": "https://sample text"
    },
    {
      "title": "something else",
      "link": "https://sample text"
    }
  ],
  
  "next_steps": [
    "sample text",
    "sample text",
    "sample text",
    "sample text",
    "sample text"
  ]
}

Here is the input
"${tech}".`,
                        },
                    ],
                    model: "llama3-8b-8192",
                    temperature: 0.5,
                    max_tokens: 1024,
                    top_p: 1,
                    stream: false,
                    response_format: {
                        type: "json_object",
                    },
                });

                const jsonResponse = response.choices[0]?.message?.content;
                setData(JSON.parse(jsonResponse as string)); // Parse and set data
            } catch (error) {
                console.error("Error fetching tech data:", error);
                setError("Error fetching tech data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTechData();
    }, [tech]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>X</button>
                {data && (
                    <div>
                        <h2 className="tech-title">{tech}</h2>
                        <h3>What is it?</h3>
                        <p className="what-is-it-content">{data.what_is}</p>
                        <h3>Common Uses</h3>
                        <ul className="common-use-ul">
                            {data.common_uses.map((cu: string, index: number) => (
                                <li className="common-use-li" key={index}>{cu}</li>
                            ))}
                        </ul>
                        <div className="advantage-disadvantage-container">
                            <div className="advantage-container">
                        <h3>Advantages</h3>
                        <ul className="av-dv-ul">
                            {data.advantages.map((adv: string, index: number) => (
                                <li className="common-use-li" key={index}>{adv}</li>
                            ))}
                        </ul>
                        </div>
                        <div className="disadvantage-container">
                        <h3>Disadvantages</h3>
                        <ul className="av-dv-ul">
                            {data.disadvantages.map((dis: string, index: number) => (
                                <li className="common-use-li" key={index}>{dis}</li>
                            ))}
                        </ul>
                        </div>
                        </div>
                        <h3>Resources</h3>
                        {data.resources && data.resources.length > 0 ? (
                            <ul className="resources-ul">
                                {data.resources.map((res: { title: string; link: string }, index: number) => (
                                    <li className="resources-li" key={index}>
                                        <a className="res-link" href={res.link} target="_blank" rel="noopener noreferrer">
                                            {res.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No resources available.</p>
                        )}
                        <h3>Next Steps</h3>
                        <ul className="next-steps-ul">
                            {data.next_steps.map((ns: string, index: number) => (
                                <li className="next-steps-li" key={index}>{ns}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TechStackModal;
