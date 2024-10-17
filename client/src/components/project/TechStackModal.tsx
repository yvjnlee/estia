import React, { useState, useEffect } from "react";
import { groq } from "../../common/clients";

interface TechStackModalProps {
    tech: string;
    onClose: () => void;
}

const TechStackModal: React.FC<TechStackModalProps> = ({ tech, onClose }) => {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // States to control the gradual reveal of each section
    const [showWhatIs, setShowWhatIs] = useState(false);
    const [showCommonUses, setShowCommonUses] = useState(false);
    const [showAdvantages, setShowAdvantages] = useState(false);
    const [showDisadvantages, setShowDisadvantages] = useState(false);
    const [showResources, setShowResources] = useState(false);
    const [showNextSteps, setShowNextSteps] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
        // Check if the click is on the overlay (not the content)
        if ((event.target as Element).classList.contains('modal-overlay')) {
            onClose();
        }
    };

    // Add or remove the 'modal-open' class on the body element
    useEffect(() => {
        document.body.classList.add("modal-open");

        return () => {
            document.body.classList.remove("modal-open");
        };
    }, []);

    // Effect to fetch data and progressively reveal content
    useEffect(() => {
        const fetchTechData = async () => {
            setLoading(true);
            setError(null);

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
"resources": Include three links official documentation links for more learning. Make sure they are active links. Do not be 404 dead links they should be real. 

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
                setData(JSON.parse(jsonResponse as string));

                // Gradually show sections
                setTimeout(() => setShowWhatIs(true), 200);
                setTimeout(() => setShowCommonUses(true), 400);
                setTimeout(() => setShowAdvantages(true), 600);
                setTimeout(() => setShowResources(true), 800);
                setTimeout(() => setShowNextSteps(true), 1000);

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
        <div className={`modal-overlay 
        ${loading ? "" : "modal-open"}`}
            onClick={handleOverlayClick}>
                
            <div className="modal-content">
                <button className="close-button" onClick={onClose}>
                    &times;
                </button>

                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}

                {!loading && data && (
                    <>
                        {showWhatIs && (
                            <div className="growing-modal">
                                <h2 className="modal-main-header">What is {tech}?</h2>
                                <p className="what-is-it-content">{data.what_is}</p>
                            </div>
                        )}

                        {showCommonUses && (
                            <div className="growing-modal">
                                <h2 className="modal-header">Common Uses</h2>
                                <ul className="common-use-ul">
                                    {data.common_uses.map((use: string, index: number) => (
                                        <li key={index} className="common-use-li">{use}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <div className="advantage-disadvantage-container">
                            {showAdvantages && (
                                <>
                                    <div className="advantage-container">
                                        <h2 className="modal-header">Advantages</h2>
                                        <ul className="av-dv-ul">
                                            {data.advantages.map((adv: string, index: number) => (
                                                <li className="common-use-li" key={index}>{adv}</li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="disadvantage-container">
                                        <h2 className="modal-header">Disadvantages</h2>
                                        <ul className="av-dv-ul">
                                            {data.disadvantages.map((dis: string, index: number) => (
                                                <li className="common-use-li" key={index}>{dis}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </>
                            )}
                        </div>

                        {showResources && (
                            <>
                                <div className="growing-modal">
                                    <h2 className="modal-header">Resources</h2>
                                    <ul className="resources-ul">
                                        {data.resources.map((res: { title: string; link: string }, index: number) => (
                                            <li key={index}>
                                                <a href={res.link} target="_blank" rel="noopener noreferrer">
                                                    {res.title}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default TechStackModal;