import React, { useState } from 'react';
import axios from 'axios';


const PreferencePage: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setOutput(null); // Reset output on new submission
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Access the API key from environment variables

    try {
      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo", // Specify the model to use
        messages: [
          {
            role: "user",
            content: `Given the following paragraph, identify key languages and frameworks and categorize them into themes (front end, back end, full stack, game dev): "${input}"`
          }
        ],
      }, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      const data = response.data;
      setOutput(data.choices[0].message.content.trim());
    } catch (error) {
      console.error('Error fetching data from OpenAI:', error);
      setOutput('Error processing your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>What are you interested in learning?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={handleInputChange}
          rows={5}
          placeholder="Enter a paragraph about your learning interests..."
          required
          style={{ width: '100%', marginBottom: '1rem' }}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Submit'}
        </button>
      </form>

      {output && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Identified Languages, Frameworks, and Themes:</h3>
          <pre>{output}</pre>
        </div>
      )}
    </div>
  );
};

export default PreferencePage;
